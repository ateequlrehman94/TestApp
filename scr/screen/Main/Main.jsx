import { useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import Toast from "react-native-toast-message";
import { FloatingAction } from "react-native-floating-action";
import { Loading } from "../../components/loading";
import Swiper from "react-native-swiper";
import { Addstudent } from "../../components/addstudent";

function Main() {
  const [showAddstudent, setShowAddstudent] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <FloatingAction
        color={"red"}
        onPressMain={() => {
          setShowAddstudent(true);
        }}
      />

      <Addstudent
        show={showAddstudent}
        onClose={() => setShowAddstudent(false)}
      />
    </View>
  );
}
export default Main;

const styles = StyleSheet.create({
  wrapper: {},
  // slide1: {
  //   height: slideHight,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#9DD6EB",
  // },
  // slide2: {
  //   height: slideHight,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#97CAE5",
  // },
  // slide3: {
  //   height: slideHight,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#92BBD9",
  // },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
