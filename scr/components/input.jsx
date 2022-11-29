import { StyleSheet, View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
function Input({ placeHold, isSecure, showIcon, iconName, onIconPress, col }) {
  return (
    <View style={styles.inputcon}>
      <TextInput
        style={styles.input}
        placeholder={placeHold}
        secureTextEntry={isSecure}
      />
      {showIcon === true ? (
        <Ionicons
          style={styles.icon}
          name={iconName}
          size={20}
          color={col}
          onPress={onIconPress}
        />
      ) : (
        <View />
      )}
    </View>
  );
}
export { Input };
const styles = StyleSheet.create({
  inputcon: {
    paddingHorizontal: 20,
    height: 50,
    backgroundColor: "rgba(255,255,255,0.8)",
    marginHorizontal: 10,
    borderRadius: 20,
    marginVertical: 10,
    flexDirection: "row",
  },
  input: {
    width: "95%",
    borderColor: "#00000",
  },
  icon: {
    alignSelf: "center",
  },
});
