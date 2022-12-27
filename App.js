import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import register from "./scr/screen/register/register";
import Forgetpassword from "./scr/screen/forgetpassword/Forgetpassword";
import Resetpassword from "./scr/screen/Resetpassword/Resetpassword";
import Home from "./scr/screen/home/Home";
import Loginn from "./scr/screen/login/Loginn";
import { Splash } from "./scr/screen/Splash/Splash";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "./scr/screen/Main/Main";
import { Setting } from "./scr/screen/setting/Setting";
import Ionicons from "@expo/vector-icons/Ionicons";
import Teacher from "./scr/screen/Teacher/Teacher";
import { StudentProfile } from "./scr/screen/student/studentprofile";
import { TeacherProfile } from "./scr/screen/Teacher/TacherProfile";
import { Attandance } from "./scr/screen/Attandance/Attandance";
import { TeacherAttandance } from "./scr/screen/Attandance/Teacherattandance";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Search } from "./scr/screen/Search/Search";
import Student from "./scr/screen/student/Student";
import { MapArea } from "./scr/components/MapArea";
function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();
  const iconSize = 18;

  const Home = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={
              route.name === "Main"
                ? "home"
                : "Search"
                ? "search"
                : "settings-outline"
            }
            color={focused ? "red" : "grey"}
            size={iconSize}
          />
        ),
      })}
    >
      <Tab.Screen name={"Main"} component={Main} />
      <Tab.Screen name={"Search"} component={Search} />
      <Tab.Screen name={"Setting"} component={Setting} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: "Home",
            headerTitleAlign: "center",
            headerBackVisible: false,
            // headerTitleStyle: { color: "white" },
            // headerStyle: { backgroundColor: "blue" },
          }}
        />
        <Stack.Screen
          name="Loginn"
          component={Loginn}
          options={{ headerTitle: "Log In", headerBackVisible: false }}
        />
        <Stack.Screen
          name="Register"
          component={register}
          options={{
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="StudentProfile"
          component={StudentProfile}
          options={{
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="TeacherProfile"
          component={TeacherProfile}
          options={{
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Forgetpassword"
          component={Forgetpassword}
          options={{
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Resetpassword"
          component={Resetpassword}
          options={{
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Student"
          component={Student}
          options={{
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Teacher"
          component={Teacher}
          options={{
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="TeacherAttandance"
          component={TeacherAttandance}
          options={{
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Attandance"
          component={Attandance}
          options={{
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="MapArea"
          component={MapArea}
          options={{
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
