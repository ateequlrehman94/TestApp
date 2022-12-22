import { View, Text, Button } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { clearUserSession } from "../../services/storageService";
import Loginn from "../login/Loginn";
function Setting({ navigation }) {
  const logoutbutton = () => {
    clearUserSession();
    navigation.navigate("Loginn");
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title={"Log out"} onPress={logoutbutton}></Button>
    </View>
  );
}

export { Setting };
