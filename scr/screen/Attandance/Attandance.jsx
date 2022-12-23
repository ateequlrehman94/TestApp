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
import { Loading } from "../../components/loading";
import { firebase } from "../../services/firebaseConfig";
function Attandance({ navigation }) {
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
    const StudentId = item.id;
    return (
      <ScrollView>
        {/* <TouchableOpacity style={styles.card}> */}
        <View style={styles.card}>
          <Image
            style={styles.image}
            source={{
              uri: student.StudentImageUrl,
            }}
          />
          <View style={styles.cardContent}>
            <Text style={styles.name}>{student.studentName}</Text>
            <Text style={styles.count}>{student.fatherName}</Text>
            <Text style={styles.count}>{student.ContactNumber}</Text>
          </View>
        </View>
      </ScrollView>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={studentData}
        vertically={true}
        numColumns="1"
        renderItem={__renderItem}
        ListEmptyComponent={<Text>No Student found </Text>}
        refreshing={showLoading}
        onRefresh={() => fetchstudentFromDB()}
      />

      <Toast />

      {showLoading && <Loading />}
    </View>
  );
}

export { Attandance };

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#ebf0f7",
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
    alignItems: "center",
  },

  name: {
    fontSize: 18,
    // alignSelf: "center",
    color: "#3399ff",
    fontWeight: "bold",
  },
  count: {
    fontSize: 14,
    // alignSelf: "center",
    color: "#6666ff",
  },
});
