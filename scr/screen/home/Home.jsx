import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
import React, { Component } from "react";

function Home() {
  const profiledata = [
    {
      name: "ALI",
      Fathername: "AHMAD",
      rollNumber: 1,
      photo: "https://reactnative.dev/img/tiny_logo.png",
    },

    {
      name: "ALI",
      Fathername: "AHMAD",
      rollNumber: 1,
      photo: "https://reactnative.dev/img/tiny_logo.png",
    },

    {
      name: "ALI",
      Fathername: "AHMAD",
      rollNumber: 1,
      photo: "https://reactnative.dev/img/tiny_logo.png",
    },

    {
      name: "ALI",
      Fathername: "AHMAD",
      rollNumber: 1,
      photo: "https://reactnative.dev/img/tiny_logo.png",
    },

    {
      name: "ALI",
      Fathername: "AHMAD",
      rollNumber: 1,
      photo: "https://reactnative.dev/img/tiny_logo.png",
    },

    {
      name: "ALI",
      Fathername: "AHMAD",
      rollNumber: 1,
      photo: "https://reactnative.dev/img/tiny_logo.png",
    },
  ];
  const render_itm = ({ item }) => (
    <View style={{ margin: 10, padding: 10 }}>
      <Text>{item.rollNumber}</Text>
      <Text>{item.name}</Text>
      <Text>{item.Fathername}</Text>
      <Image source={{ uri: item.photo }} style={{ width: 300, height: 150 }} />
    </View>
  );
  return (
    <View>
      <FlatList
        numColumns={"1"}
        data={profiledata}
        renderItem={render_itm}
      ></FlatList>
    </View>
  );
}
export default Home;
