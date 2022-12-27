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
import { firebase } from "../../services/firebaseConfig";
import { Input } from "../../components/input";
import { StudentProfile } from "../student/studentprofile";
import Student from "../student/Student";

function Search({ navigation }) {
  const [showAddstudent, setShowAddstudent] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [studentData, setstudentData] = useState([]);
  const [studentFilteredData, setstudentFilteredData] = useState();
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
        >
          <View style={styles.row}>
            <Image
              source={{ uri: student.StudentImageUrl }}
              style={styles.pic}
            />
            <View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>{student.studentName}</Text>
              </View>
              <View style={styles.end}>
                <Image
                  style={[
                    styles.icon,
                    { marginLeft: 15, marginRight: 5, width: 14, height: 14 },
                  ]}
                  source={{
                    uri: "https://img.icons8.com/small/14/000000/double-tick.png",
                  }}
                />
                <Text style={styles.time}>{student.fatherName}</Text>
                <Text style={styles.time}>{student.Class}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const onUserInput = (text) => {
    const filteredData = studentData.filter((item) =>
      item.data().studentName?.includes(text)
    );
    console.log(studentData);
    console.log(filteredData);
    if (filteredData.length > 0) {
      setstudentFilteredData(filteredData);
    } else {
    }
  };

  return (
    <View>
      <Input
        txtlabel={"Enter Student Name"}
        placeHold={"Search Student"}
        showIcon={true}
        iconName={"search"}
        onChange={onUserInput}
      />

      <FlatList
        data={studentFilteredData || studentData}
        renderItem={__renderItem}
        ListEmptyComponent={<Text>no Student found </Text>}
        refreshing={showLoading}
        onRefresh={() => fetchstudentFromDB()}
      />
    </View>
  );
}

export { Search };

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#dcdcdc",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 270,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "600",
    color: "#222",
    fontSize: 15,
  },
  mblTxt: {
    fontWeight: "200",
    color: "#777",
    fontSize: 13,
  },
  end: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    fontWeight: "400",
    color: "#666",
    fontSize: 12,
  },
  icon: {
    height: 28,
    width: 28,
  },
});
