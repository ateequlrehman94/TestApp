import { View, Text, Button } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { Cusbutton } from "../../components/cus_button";
import { clearUserSession } from "../../services/storageService";
import Loginn from "../login/Loginn";
function Setting({ navigation }) {
  const logoutbutton = () => {
    clearUserSession();
    navigation.navigate("Loginn");
  };

  return (
    <View style={{ flex: 1 }}>
      <Cusbutton
        bgColor={"#ff0000"}
        onBottomPress={logoutbutton}
        text="Log out"
      />
    </View>
  );
}

export { Setting };
