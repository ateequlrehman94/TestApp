import { TouchableOpacity, Text, View } from "react-native";

function Cusbutton({
  bgColor,
  text = "No text supplied",
  textColor = "white",
  textSize = 18,

  onBottomPress,
}) {
  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        style={{
          width: "80%",
          borderRadius: 25,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15,
          backgroundColor: bgColor,
        }}
        onPress={onBottomPress}
      >
        <Text
          style={{ fontWeight: "bold", color: textColor, fontSize: textSize }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export { Cusbutton };
