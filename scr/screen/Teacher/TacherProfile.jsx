import { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
function TeacherProfile({ route, navigation }) {
  const [incomingTeacher, setIncomingTeacher] = useState(route.params.teach);
  const { stu } = route.params;
  return (
    <ScrollView>
      <View>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: incomingTeacher.TeacherImageUrl,
              }}
            />

            <Text style={styles.pname}>{incomingTeacher.TeacherName}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.name}>Teacher CNIC:</Text>
            <Text style={styles.count}> {incomingTeacher.TeacherNIC}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.name}>Sallery:</Text>
            <Text style={styles.count}>{incomingTeacher.Salery}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.name}>Subject:</Text>
            <Text style={styles.count}>{incomingTeacher.Subject}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.name}>Address:</Text>
            <Text style={styles.count}> {incomingTeacher.Address}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export { TeacherProfile };

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
    alignItems: "center",
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
