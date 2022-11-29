import { TouchableOpacity, Text } from "react-native";

function cusbutton({
  bgColor = "red",
  text = "No text supplied",
  textColor = "white",
  textSize = 12,
  width = 200,
  height = 50,
  onBottomPress,
}) {
  return (
    <TouchableOpacity
      style={{
        width: width,
        height: height,
        padding: 10,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: bgColor,
      }}
      onPress={onBottomPress}
    >
      <Text style={{ color: textColor, fontSize: textSize }}></Text>
    </TouchableOpacity>
  );
}

export { cusbutton };
