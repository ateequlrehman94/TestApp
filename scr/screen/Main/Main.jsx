import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
} from "react-native";
import Toast from "react-native-toast-message";
import { FloatingAction } from "react-native-floating-action";
import { Loading } from "../../components/loading";
import Swiper from "react-native-swiper";
import { Addstudent } from "../../components/addstudent";
import { firebase } from "../../services/firebaseConfig";

function Main() {
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
  const __renderItem = ({ item }) => {
    const student = item.data();
    return (
      <View>
        <ImageBackground
          style={{ width: 100, height: 100, margin: 5 }}
          source={{ uri: student.StudentImageUrl }}
        ></ImageBackground>
        <Text>{student.studentName}</Text>
        <Text>{student.fatherName}</Text>
        <Text>{student.Address}</Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={studentData}
        horizontal={true}
        renderItem={__renderItem}
        ListEmptyComponent={<Text>no recipies found </Text>}
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
