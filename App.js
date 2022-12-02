import React from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./scr/screen/login/Login";
import register from "./scr/screen/register/register";
import Forgetpassword from "./scr/screen/forgetpassword/Forgetpassword";
import Resetpassword from "./scr/screen/Resetpassword/Resetpassword";
import Home from "./scr/screen/home/Home";
const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Forgetpassword" component={Forgetpassword} />
        <Stack.Screen name="Resetpassword" component={Resetpassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
