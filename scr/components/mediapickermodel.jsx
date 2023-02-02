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
  const pickImageFromGallery = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })
      .then((response) => {
        // when users opens the picker and just comes back and does not select the image
        if (response.cancelled) {
          alert("not selected");
        } else {
          onImagePickerSelected(response);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View>
      <Modal
        style={{ flex: 1, justifyContent: "flex-end" }}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        animationOutTiming={1500}
        isVisible={show}
      >
        <View
          style={{
            height: "30%",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            justifyContent: "center",
            borderStyle: "dotted",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Add Photo</Text>
          </View>
          <View
            style={{ flexDirection: "column", justifyContent: "space-evenly" }}
          >
            <TouchableOpacity
              style={styles.circleView}
              onPress={onCameraPressed}
            >
              <Ionicons name={"camera-sharp"} size={40} color={"black"}>
                <Text style={{ fontSize: 20 }}> Take Photo</Text>
              </Ionicons>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.circleView}
              onPress={pickImageFromGallery}
            >
              <Ionicons name={"images-sharp"} size={40} color={"black"}>
                <Text style={{ fontSize: 20, marginLeft: 10 }}>
                  Chose from Galery
                </Text>
              </Ionicons>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.circleView}>
              {/* <Ionicons name={"close"} size={30} color={"black"}> */}
              <Text style={{ fontSize: 20, textAlign: "center" }}>CANCEL</Text>
              {/* </Ionicons> */}
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
    backgroundColor: "white",
    height: 40,
    width: "100%",
    // margin: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    // borderRadius: 50,
    // alignSelf: "center",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
