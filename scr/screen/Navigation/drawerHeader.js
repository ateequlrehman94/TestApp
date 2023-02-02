import * as React from "react";
import {
  Button,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import { ColorPalette } from "./ColorPalette";
import { Avatar, Divider, Icon, Overlay } from "react-native-elements";
function DrawerHeader() {
  <View
    style={styles.container}
    forceInset={{ top: "always", horizontal: "never" }}
  >
    <View style={[styles.containHeader, { backgroundColor: "#e66900" }]}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Avatar
          size="large"
          rounded
          icon={{ name: "user-circle-o", type: "font-awesome", size: 80 }}
        />
        <Text
          style={{
            color: "#f9f9f9",
            marginTop: "3%",
            fontFamily: "sans-serif-condensed",
          }}
        >
          Ateeq Khan
        </Text>
        <Text style={{ color: "#f9f9f9", fontFamily: "sans-serif-condensed" }}>
          Hello.com
        </Text>
      </View>
    </View>

    {/* <DrawerItems {...this.props} /> */}

    <View>
      <View style={{ marginTop: "2%" }}>
        <Divider style={{ backgroundColor: "#777f7c90" }} />
      </View>
      <View style={{ marginTop: "3%" }}>
        <ColorPalette />
      </View>
      <View style={{ marginTop: "5%" }}>
        <Divider style={{ backgroundColor: "#777f7c90" }} />
      </View>
    </View>
  </View>;
}

export { DrawerHeader };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containHeader: {
    paddingTop: "4%",
    paddingBottom: "4%",
  },
  containDrawerOption: {
    paddingLeft: "6%",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "1%",
    paddingBottom: "5%",
    backgroundColor: "#e6e6e6",
  },
  headerText: {
    textAlign: "center",
    fontFamily: "sans-serif-medium",
    fontWeight: "600",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 50,
  },
  actionText: {
    textAlign: "center",
    fontFamily: "sans-serif-medium",
    fontWeight: "600",
    marginRight: "3%",
    marginLeft: "3%",
  },
  closeBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 17,
  },
  closeText: {
    fontFamily: "sans-serif-medium",
    fontWeight: "600",
    marginRight: "3%",
    marginLeft: "3%",
  },
});
