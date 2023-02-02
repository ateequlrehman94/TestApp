import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { Cusbutton } from "../../components/cus_button";
import { clearUserSession } from "../../services/storageService";
import Loginn from "../login/Loginn";
import { DrawerHeader } from "../Navigation/drawerHeader";
function Setting({ navigation }) {
  const logoutbutton = () => {
    clearUserSession();
    navigation.navigate("Loginn");
  };

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            // source={{
            //   uri: incomingstudent.StudentImageUrl,
            // }}
          />

          <Text style={styles.pname}>Ateeq ul rehman</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Cusbutton
          bgColor={"#ff0000"}
          onBottomPress={logoutbutton}
          text="Log out"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
});

export { Setting };
