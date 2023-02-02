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
import {
  getDocs,
  collection,
  query,
  where,
  addDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { firebase } from "../../services/firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";

function StdAttandancePage({ navigation, route }) {
  const [incomingstudent, setincomingstudent] = useState(route.params.stu);

  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    setCurrentDate(
      new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getFullYear()
    );
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Image
                style={styles.avatar}
                source={{
                  uri: incomingstudent.StudentImageUrl,
                }}
              />
              <Text style={styles.pname}>{incomingstudent.studentName}</Text>
              <Text style={styles.pname}>
                Father Name:{incomingstudent.fatherName}
              </Text>
              <Text style={styles.pname}>
                Gender : {incomingstudent.Gender}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export { StdAttandancePage };

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
});
