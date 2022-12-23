import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";
import { FloatingAction } from "react-native-floating-action";
import { Loading } from "../../components/loading";
import { AddTeacher } from "./Addteacher";
import { firebase } from "../../services/firebaseConfig";
import { TeacherProfile } from "./TacherProfile";
function Teacher({ navigation }) {
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [TeacherData, setTeacherData] = useState([]);
  useEffect(() => {
    fetchTeacherFromDB();
  }, []);

  const fetchTeacherFromDB = () => {
    setShowLoading(true);
    firebase
      .firestore()
      .collection("Teacher")
      .get()
      .then((response) => {
        setTeacherData(response.docs);
        setShowLoading(false);
      })
      .catch((error) => {
        console.log({ error });
        setShowLoading(false);
      });
  };
  const onTeacherLongPress = (Teacher, TeacherId) => {
    Alert.alert("Do You Want to Delete Teacher", Teacher.TeacherName);
    {
      cancelable: true;
    }
    firebase
      .firestore()
      .collection("Teacher")
      .doc(TeacherId)
      .delete()
      .then((response) => {
        showToast("success", "Selected Teacher deleted");
      })
      .catch((error) => {
        showToast("error", error.message);
      });
  };

  const __renderItem = ({ item }) => {
    const Teacher = item.data();
    const TeacherId = item.id;
    return (
      <View style={styles.Teachertabs}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TeacherProfile", {
              teach: Teacher,
            })
          }
          onLongPress={() => onTeacherLongPress(Teacher, TeacherId)}
        >
          <Image
            style={styles.Teacherimage}
            source={{ uri: Teacher.TeacherImageUrl }}
          ></Image>
        </TouchableOpacity>
        <View style={styles.formCon}>
          <Text>{Teacher.TeacherName}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={TeacherData}
        vertically={true}
        numColumns="3"
        renderItem={__renderItem}
        ListEmptyComponent={<Text>No Teacher found </Text>}
        refreshing={showLoading}
        onRefresh={() => fetchTeacherFromDB()}
      />

      <Toast />
      <FloatingAction
        color={"red"}
        onPressMain={() => {
          setShowAddTeacher(true);
        }}
      />
      <AddTeacher
        show={showAddTeacher}
        onClose={() => setShowAddTeacher(false)}
      />
      {showLoading && <Loading />}
    </View>
  );
}
export default Teacher;

const styles = StyleSheet.create({
  Teachertabs: { Color: "##4a4b4c", alignItems: "center" },

  Teacherimage: {
    allignSelf: "center",
    borderRadius: 50,
    width: 100,
    height: 100,
    margin: 10,
  },
  Teachertext: {
    allignSelf: "center",
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
