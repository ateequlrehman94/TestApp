import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  LogBox,
} from "react-native";
import { firebase } from "../../services/firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { Cusbutton } from "../../components/cus_button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TeacherAttandance } from "./Teacherattandance";
let emailId = "",
  incomingteacherid = "";
let attendanceList = [];
function CallAttandance({ navigation, route }) {
  const [incomingteacher, setincomingteacher] = useState(route.params.Teach);
  const [incomingteacherid, setincomingteacherid] = useState(route.params.Tid);

  // const { stu } = route.params;
  // const { id } = route.params;
  const [checkInEnable, setCheckInEnable] = useState(true);
  const [checkOutEnable, setCheckOutEnable] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    setCurrentDate(
      new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getFullYear()
    );
    getSavedDate();
  }, []);
  const onSubmit = () => {
    navigation.navigate("TeacherAttandance");
  };
  const saveDate = async () => {
    await AsyncStorage.setItem(
      "DATE",
      new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getFullYear()
    );
  };

  const getSavedDate = async () => {
    const date = await AsyncStorage.getItem("DATE");
    const status = await AsyncStorage.getItem("STATUS");
    const TeacherId = await AsyncStorage.getItem("incomingteacherid");
    if (
      date ==
        new Date().getDate() +
          "/" +
          (new Date().getMonth() + 1) +
          "/" +
          new Date().getFullYear() &&
      status == "CIN"
    ) {
      setCheckInEnable(false);
      setCheckOutEnable(true);
    } else if (
      date ==
        new Date().getDate() +
          "/" +
          (new Date().getMonth() + 1) +
          "/" +
          new Date().getFullYear() &&
      status == "COUT"
    ) {
      setCheckInEnable(true);
      setCheckOutEnable(false);
    }
    console.log(date);
    attendanceList = [];
    firebase
      .firestore()
      .collection("Teacher")
      .doc(incomingteacherid)
      .onSnapshot((documentSnapshot) => {
        console.log("User data: ", documentSnapshot.data().attendance);
        if (documentSnapshot.data().attendance !== undefined) {
          documentSnapshot.data().attendance.map((item) => {
            attendanceList.push(item);
          });
        }
      });
  };
  const saveCheckin = async () => {
    await AsyncStorage.setItem("STATUS", "CIN");
  };
  const saveCheckout = async () => {
    await AsyncStorage.setItem("STATUS", "COUT");
  };
  const uploadCheckIn = () => {
    let currentTime = new Date().getHours() + ":" + new Date().getMinutes();
    attendanceList.push({
      checkIn: currentTime,
      checkOut: "",
      date: currentDate,
    });
    firebase
      .firestore()
      .collection("Teacher")
      .doc(incomingteacherid)
      .update({
        attendance: attendanceList,
      })
      .then(() => {
        console.log("User updated!");
      });
    attendanceList = [];
    firebase
      .firestore()
      .collection("Teacher")
      .doc(incomingteacherid)
      .onSnapshot((documentSnapshot) => {
        console.log("User data: ", documentSnapshot.data().attendance);

        if (documentSnapshot.data().attendance !== undefined) {
          documentSnapshot.data().attendance.map((item) => {
            attendanceList.push(item);
          });
        }
      });
  };
  const uploadCheckOut = () => {
    let currentTime = new Date().getHours() + ":" + new Date().getMinutes();
    console.log(attendanceList);
    attendanceList[attendanceList.length - 1].checkIn =
      attendanceList[attendanceList.length - 1].checkIn;
    attendanceList[attendanceList.length - 1].checkOut = currentTime;
    attendanceList[attendanceList.length - 1].date = currentDate;
    firebase
      .firestore()
      .collection("Teacher")
      .doc(incomingteacherid)
      .update({
        attendance: attendanceList,
      })
      .then(() => {
        console.log("User updated!");
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Image
                style={styles.avatar}
                source={{
                  uri: incomingteacher.TeacherImageUrl,
                }}
              />
              <Text style={styles.pname}>{incomingteacherid}</Text>
              <Text style={styles.pname}>{incomingteacher.TeacherName}</Text>
              <Text style={styles.pname}>{incomingteacher.TeacherNIC}</Text>
              <Text style={styles.pname}>
                Subject : {incomingteacher.Subject}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#000",
              marginTop: 20,
              marginLeft: 20,
            }}
          >
            {"Today Date: " + currentDate}
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              height: "10%",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              disabled={!checkInEnable}
              style={[
                styles.checkInOutbtn,
                {
                  backgroundColor: checkInEnable ? "green" : "gray",
                },
              ]}
              onPress={() => {
                saveDate();
                saveCheckin();
                setCheckInEnable(false);
                setCheckOutEnable(true);
                uploadCheckIn();
                onSubmit();
              }}
            >
              <Text style={{ color: "#fff" }}>Check In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!checkOutEnable}
              style={[
                styles.checkInOutbtn,
                {
                  backgroundColor: checkOutEnable ? "green" : "gray",
                },
              ]}
              onPress={() => {
                saveCheckout();
                setCheckInEnable(false);
                setCheckOutEnable(false);
                uploadCheckOut();
                onSubmit();
              }}
            >
              <Text style={{ color: "#fff" }}>Check Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export { CallAttandance };

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  pname: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: "#696969",
  },
  bodyContent: {
    paddingTop: 40,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  info: {
    fontSize: 22,
    color: "#696969",
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },

  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    borderRadius: 30,
  },

  name: {
    fontSize: 18,
    alignSelf: "center",
    color: "#3399ff",
    fontWeight: "bold",
  },
  count: {
    fontSize: 14,
    alignSelf: "center",
    color: "#6666ff",
  },
  checkInOutbtn: {
    width: "40%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 50,
    borderRadius: 10,
  },
});
