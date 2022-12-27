import "react-native-gesture-handler";

import * as React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Cusbutton } from "../../components/cus_button";
function Search() {
  return (
    <View style={{ flex: 1 }}>
      <Cusbutton bgColor={"#ff0000"} onBottomPress={""} text="Log out" />
    </View>
  );
}
export { Search };
