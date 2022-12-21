import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Main from "../Main/Main";
function Home() {
  //   function Main({ navigation }) {
  //     return (
  //       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
  //         <Button
  //           onPress={() => navigation.navigate("<Main>")}
  //           title="Go to notifications"
  //         />
  //       </View>
  //     );
  //   }

  // const Drawer = createDrawerNavigator();

  return (
    <View>
      <text>aaaaa</text>
    </View>
    // <NavigationContainer>
    //   <Drawer.Navigator initialRouteName="Main">
    //     <Drawer.Screen name="Main" component={Main} />
    //   </Drawer.Navigator>
    // </NavigationContainer>
  );
}

export { Home };

// import * as React from "react";
// import { View, Text, TouchableOpacity, Image } from "react-native";

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { Setting } from "../setting/Setting";
// // import Main from "./Main/Main";
// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// const NavigationDrawerStructure = (props) => {
//   //Structure for the navigatin Drawer
//   const toggleDrawer = () => {
//     //Props to open/close the drawer
//     props.navigationProps.toggleDrawer();
//   };

//   return (
//     <View style={{ flexDirection: "row" }}>
//       <TouchableOpacity onPress={toggleDrawer}>
//         {/*Donute Button Image */}
//         <Image
//           source={{
//             uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png",
//           }}
//           style={{ width: 25, height: 25, marginLeft: 5 }}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };
// function firstScreenStack({ navigation }) {
//   return (
//     <Stack.Navigator initialRouteName="Setting">
//       <Stack.Screen
//         name="Setting"
//         component={Main}
//         options={{
//           title: "Setting", //Set Header Title
//           headerLeft: () => (
//             <NavigationDrawerStructure navigationProps={navigation} />
//           ),
//           headerStyle: {
//             backgroundColor: "#f4511e", //Set Header color
//           },
//           headerTintColor: "#fff", //Set Header text color
//           headerTitleStyle: {
//             fontWeight: "bold", //Set Header text style
//           },
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

// function Home() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator
//         drawerContentOptions={{
//           activeTintColor: "#e91e63",
//           itemStyle: { marginVertical: 5 },
//         }}
//         drawerContent={(props) => <CustomSidebarMenu {...props} />}
//       >
//         <Drawer.Screen
//           name="Main"
//           options={{ drawerLabel: "First page Option" }}
//           component={firstScreenStack}
//         />
//         <Drawer.Screen
//           name="Setting"
//           options={{ drawerLabel: "Second page Option" }}
//           component={secondScreenStack}
//         />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }
// export default Home;
