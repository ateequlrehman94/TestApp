import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "../home/Home";
import Main from "../Main/Main";
import Loginn from "../login/Loginn";
import { Search } from "../Search/Search";
import { MapArea } from "../../components/MapArea";
import Student from "../student/Student";
import { StudentProfile } from "../student/studentprofile";
import Teacher from "../Teacher/Teacher";
import { TeacherProfile } from "../Teacher/TacherProfile";
import { TeacherAttandance } from "../Attandance/Teacherattandance";
import { Attandance } from "../Attandance/Attandance";
import { Setting } from "../setting/Setting";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Student" component={Student} />
      <Drawer.Screen
        name="Attandance"
        component={Attandance}
        options={{ title: "Student Attandance" }}
      />
      <Drawer.Screen name="Teacher" component={Teacher} />
      <Drawer.Screen name="TeacherAttandance" component={TeacherAttandance} />
      <Drawer.Screen name="Search" component={Search} />
      <Drawer.Screen name="MapArea" component={MapArea} />
      <Drawer.Screen name="Setting" component={Setting} />
    </Drawer.Navigator>
  );
}
export { MyDrawer };
