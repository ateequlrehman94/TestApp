import { StyleSheet, View, TextInput, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
function Input({
  placeHold,
  isSecure,
  showIcon,
  iconName,
  onIconPress,
  col,
  txtlabel,
  onChange,
  beMultiline,
}) {
  return (
    <View>
      <View>
        <Text style={styles.inputtxtlabel}> {txtlabel}</Text>
      </View>
      <View style={styles.inputcon}>
        <TextInput
          style={styles.input}
          placeholder={placeHold}
          onChangeText={onChange}
          secureTextEntry={isSecure}
          multiline={beMultiline}
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
  inputtxtlabel: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
  input: {
    width: "95%",
    borderColor: "#00000",
  },
  icon: {
    alignSelf: "center",
  },
});
