import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
function StudentProfile({ navigation, route }) {
  const [incomingstudent, setincomingstudent] = useState(route.params.stu);
  // const { stu } = route.params;
  // const { id } = route.params;
  return (
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
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.name}>Father Name</Text>
            <Text style={styles.count}>{incomingstudent.fatherName}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.name}>Father CNIC</Text>
            <Text style={styles.count}>{incomingstudent.fatherNIC}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.name}>Class</Text>
            <Text style={styles.count}>
              {incomingstudent.Class}:{incomingstudent.classSection}
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.name}>Monthly Fee</Text>
            <Text style={styles.count}>{incomingstudent.Monthlyfee}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.name}>Address</Text>
            <Text style={styles.count}>{incomingstudent.Address}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
export { StudentProfile };

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
