import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

function MediaPicker({
  show,
  onClose,
  onCameraPressed,
  onImagePickerSelected,
}) {
  return (
    <View>
      <Modal
        style={{ flex: 1, justifyContent: "flex-end" }}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        animationOutTiming={1500}
        isVisible={true}
      >
        <View
          style={{
            height: "20%",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            justifyContent: "center",
          }}
        >
          <View justifyContent={"flex-end"}>
            <TouchableOpacity>
              <Ionicons
                name={"close"}
                size={30}
                color={"black"}
                onPress={onClose}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <TouchableOpacity
              style={styles.circleView}
              // onPress={onCameraPressed}
            >
              <Ionicons name={"camera-sharp"} size={40} color={"white"} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.circleView}
              //   onPress={pickImageFromGallery}
            >
              <Ionicons name={"images-sharp"} size={40} color={"white"} />
            </TouchableOpacity>
          </View>

          {/* <View style={{ marginTop: 10 }}>
            <Button title={"cancel"} onPress={onClose} />
          </View> */}
        </View>
      </Modal>
    </View>
  );
}
export { MediaPicker };
const styles = StyleSheet.create({
  circleView: {
    backgroundColor: "orange",
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
