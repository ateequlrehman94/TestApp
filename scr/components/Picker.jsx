import { StyleSheet, View, TextInput, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

function Pickervalue({ txtlabel, Selectval, onvluchg, onvluchgopt }) {
  return (
    <View>
      <View>
        <Text style={styles.inputtxtlabel}> {txtlabel}</Text>
      </View>
      <Picker
        style={styles.pickercon}
        selectedValue={Selectval}
        onValueChange={(itemValue) => onvluchg(itemValue)}
      >
        {{ onvluchgopt }.map((item, index) => {
          return <Picker.Item label={item} value={index} key={index} />;
        })}
      </Picker>
    </View>
  );
}
export { Pickervalue };
const styles = StyleSheet.create({
  pickercon: {
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
