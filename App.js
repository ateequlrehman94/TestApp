import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./scr/screen/login/Login";
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

function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const iconSize = 18;

  const Home = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={route.name === "Main" ? "home" : "person"}
            color={focused ? "red" : "grey"}
            size={iconSize}
          />
        ),
      })}
    >
      <Tab.Screen name={"Main"} component={Main} />
      <Tab.Screen name={"Setting"} component={Setting} />
    </Tab.Navigator>
  );
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Loginn} />
        <Stack.Screen name="Register" component={register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Forgetpassword" component={Forgetpassword} />
        <Stack.Screen name="Resetpassword" component={Resetpassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
