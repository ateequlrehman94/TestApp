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
import { Addstudent } from "../student/addstudent";
import { firebase } from "../../services/firebaseConfig";
import { StudentProfile } from "../student/studentprofile";
import { Cusbutton } from "../../components/cus_button";
import Student from "../student/Student";
import { TeacherAttandance } from "../Attandance/Teacherattandance";
function Main({ navigation }) {
  const profiledata = [
    {
      name: "You",
      color: "#FF4500",
      image: "https://img.icons8.com/color/70/000000/profile.png",
      screenname: "Student",
    },

    {
      name: "Search",
      color: "#87CEEB",
      photo: "https://img.icons8.com/color/70/000000/search.png",
      screenname: "Search",
    },
    {
      name: "Student",
      color: "#4682B4",
      photo: "https://img.icons8.com/color/70/000000/groups.png",
      screenname: "Student",
    },
    {
      name: "Student Attandance",
      color: "#6A5ACD",
      photo: "https://img.icons8.com/dusk/70/000000/checklist.png",
      screenname: "Attandance",
    },
    {
      name: "Teacher",
      color: "#FF69B4",
      photo: "https://img.icons8.com/color/70/000000/classroom.png",
      screenname: "Teacher",
    },
    {
      name: "Teacher attandance",
      color: "#00BFFF",
      photo: "https://img.icons8.com/dusk/70/000000/checklist.png",
      screenname: "TeacherAttandance",
    },
    {
      name: "Map",
      color: "#20B2AA",
      photo: "https://img.icons8.com/dusk/70/000000/globe-earth.png",
      screenname: "MapArea",
    },
    {
      name: "Log Out",
      color: "#20B2AA",
      photo: "https://img.icons8.com/color/70/000000/to-do.png",
      screenname: "",
    },
  ];

  const render_itm = ({ item }) => (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={[styles.card, { backgroundColor: item.color }]}
        onPress={() => navigation.navigate(item.screenname)}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <Image style={styles.cardImage} source={{ uri: item.photo }} />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        verticall={true}
        numColumns={"2"}
        data={profiledata}
        renderItem={render_itm}
      />
    </View>
  );
}
export default Main;
const styles = StyleSheet.create({
  list: {
    //paddingHorizontal: 5,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: "center",
  },
  /******** card **************/
  card: {
    marginHorizontal: 2,
    marginVertical: 2,
    flexBasis: "48%",
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 70,
    width: 70,
    alignSelf: "center",
  },
  title: {
    fontSize: 16,
    flex: 1,
    color: "#FFFFFF",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
