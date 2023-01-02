import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Main from "../Main/Main";
import { Setting } from "../setting/Setting";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const iconSize = 18;

function Mytab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={route.name === "Main" ? "home" : "settings-outline"}
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
}
export { Mytab };
