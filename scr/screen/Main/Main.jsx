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
import { Addstudent } from "../../components/addstudent";
import { firebase } from "../../services/firebaseConfig";
import { StudentProfile } from "../student/studentprofile";
function Main({ navigation }) {
  const [showAddstudent, setShowAddstudent] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [studentData, setstudentData] = useState([]);
  useEffect(() => {
    fetchstudentFromDB();
  }, []);

  const fetchstudentFromDB = () => {
    setShowLoading(true);
    firebase
      .firestore()
      .collection("Student")
      .get()
      .then((response) => {
        setstudentData(response.docs);
        setShowLoading(false);
      })
      .catch((error) => {
        console.log({ error });
        setShowLoading(false);
      });
  };
  const onStudentLongPress = (student, StudentId) => {
    Alert.alert("Do You Want to Delete Teacher", student.studentName);
    {
      cancelable: true;
    }
    firebase
      .firestore()
      .collection("Student")
      .doc(StudentId)
      .delete()
      .then((response) => {
        showToast("success", "Selected Student deleted");
      })
      .catch((error) => {
        showToast("error", error.message);
      });
  };
  const __renderItem = ({ item }) => {
    const student = item.data();
    const StudentId = item.id;
    return (
      <View style={styles.studenttabs}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("StudentProfile", {
              stu: student,
            })
          }
          onLongPress={() => onStudentLongPress(student, StudentId)}
        >
          <Image
            style={styles.studentimage}
            source={{ uri: student.StudentImageUrl }}
          ></Image>
        </TouchableOpacity>
        <View style={styles.formCon}>
          <Text>{student.studentName}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={studentData}
        vertically={true}
        numColumns="3"
        renderItem={__renderItem}
        ListEmptyComponent={<Text>No Student found </Text>}
        refreshing={showLoading}
        onRefresh={() => fetchstudentFromDB()}
      />

      <Toast />
      <FloatingAction
        color={"red"}
        onPressMain={() => {
          setShowAddstudent(true);
        }}
      />
      <Addstudent
        show={showAddstudent}
        onClose={() => setShowAddstudent(false)}
      />
      {showLoading && <Loading />}
    </View>
  );
}
export default Main;

const styles = StyleSheet.create({
  studenttabs: { Color: "##4a4b4c", alignItems: "center" },

  studentimage: {
    allignSelf: "center",
    borderRadius: 50,
    width: 100,
    height: 100,
    margin: 10,
  },
  studenttext: {
    allignSelf: "center",
  },
  wrapper: {},
  // slide1: {
  //   height: slideHight,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#9DD6EB",
  // },
  // slide2: {
  //   height: slideHight,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#97CAE5",
  // },
  // slide3: {
  //   height: slideHight,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#92BBD9",
  // },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
