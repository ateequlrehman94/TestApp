import { StyleSheet, View, TextInput, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-number-input";

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
  inputtype,
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
          keyboardType={inputtype}
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
    // borderRadius: 20,
    marginVertical: 10,
    flexDirection: "row",
  },

  input: {
    width: "95%",
  },
  inputtxtlabel: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    alignSelf: "center",
  },
});
