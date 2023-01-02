import { useState } from "react";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";

import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  Text,
} from "react-native";

import { Loading } from "../../components/loading";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { firebase } from "../../services/firebaseConfig";
import { MediaPicker } from "../../components/mediapickermodel";
import { CustomCamera } from "../../components/customCamera";
import { makeBlob } from "../../services/uploadImageFirebase";
import { showToast } from "../../utils/toast";
import { Ionicons } from "@expo/vector-icons";
import {
  getARandomTeacherImageName,
  getARandomTeacherName,
} from "./RandomTeacherName";
import { Cusbutton } from "../../components/cus_button";

function AddTeacher({ onClose, show }) {
  const [TeacherName, setTeacherName] = useState(" ");
  const [TeacherNIC, setTeacherNIC] = useState(" ");
  const [Salery, setSalery] = useState("");
  const [DOB, setDOB] = useState("");
  const [Gender, setGender] = useState("");
  const [Subject, setSubject] = useState("");
  const [Address, setAddress] = useState(" ");

  const [isPickerShown, setIsPickerShown] = useState(false);
  const [isCameraShown, setIsCameraShown] = useState(false);
  const [imageFromPicker, setImageFromPicker] = useState("");
  const [imageFromCamera, setImageFromCamera] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const onSubmit = () => {
    setShowLoading(true);
    uploadImage();
  };

  const onImageCameFromGallery = (image) => {
    setImageFromPicker(image.uri);
    setIsPickerShown(false);
  };

  const onImagePressed = () => {
    if (isPickerShown === true) {
      setIsPickerShown(false);
    } else if (isPickerShown === false) {
      setIsPickerShown(true);
    }
  };

  function uploadImage() {
    const imageUri = imageFromCamera || imageFromPicker;

    makeBlob(imageUri)
      .then((imageBlob) => {
        const userStorageRef = firebase.storage().ref("Teacher/");
        const imageName = getARandomTeacherImageName();
        userStorageRef
          .child(imageName)
          .put(imageBlob)
          .then((uploadResponse) => {
            // will fetch uploaded image url for us
            firebase
              .storage()
              .ref("Teacher/" + imageName)
              .getDownloadURL()
              .then((downloadRes) => {
                const imageUrlOnServer = downloadRes;

                // passing the UID and url to add data to firestore function
                saveTeacherData(imageUrlOnServer);
              })
              .catch((downlaodErr) => {
                showToast("error", downlaodErr.message);
                setShowLoading(false);
              });

            // get the url from response and then add it with the data to firebase with uid
          })
          .catch((uploadError) => {
            showToast("error", uploadError.message);
            setShowLoading(false);
          });
      })
      .catch((blobError) => {
        setShowLoading(false);
      });
  }
  const saveTeacherData = (imageUrl) => {
    const randomName = getARandomTeacherName();

    firebase
      .firestore()
      .collection("Teacher")
      .doc(randomName)
      .set({
        TeacherImageUrl: imageUrl,
        TeacherName,
        TeacherNIC,
        Address,
        Subject,
        Salery,
      })
      .then((response) => {
        setShowLoading(false);
        showToast("success", "Teacher Record uploaded", "top");
        onClose();
      })
      .catch((error) => {
        showToast("error", error.message, "top");
        setShowLoading(false);
      });
  };
  return (
    <Modal
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      isVisible={show}
      style={{ justifyContent: "flex-end", flex: 1, backgroundColor: "white" }}
    >
      <ScrollView Style={{ flex: 1 }}>
        <View>
          <Header title={"Add New Teacher"} onIconPress={onClose} />
        </View>

        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={onImagePressed}
        >
          <View style={styles.pickImgCircle}>
            <Image
              source={{ uri: imageFromPicker || imageFromCamera }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
              resizeMode={"contain"}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.formCon}>
          <Input
            txtlabel={"Teacher Name"}
            placeHold={"Teacher Name"}
            showIcon={true}
            iconName={"pencil"}
            onChange={setTeacherName}
          />
          <Input
            txtlabel={"Teacher CNIC"}
            placeHold={"Teacher CNIC"}
            showIcon={true}
            iconName={"pencil"}
            onChange={setTeacherNIC}
            inputtype={"numeric"}
          />
          <Input
            txtlabel={"Address"}
            placeHold={"Address"}
            showIcon={true}
            iconName={"pencil"}
            onChange={setAddress}
          />
          <Input
            txtlabel={"Subject"}
            placeHold={"Subject"}
            showIcon={true}
            iconName={"pencil"}
            onChange={setSubject}
          />
          <Input
            txtlabel={"Salery"}
            placeHold={"Salery"}
            showIcon={true}
            iconName={"pencil"}
            onChange={setSalery}
            inputtype={"numeric"}
          />
          {/* <Input
              txtlabel={"Date Of Birth"}
              placeHold={"Date Of Birth"}
              showIcon={true}
              iconName={"pencil"}
              onChange={setDOB}
            /> */}

          <Cusbutton
            onBottomPress={onSubmit}
            bgColor={"#ff0000"}
            textColor={"black"}
            text={"Add Student"}
          />

          <MediaPicker
            show={isPickerShown}
            onClose={onImagePressed}
            onImagePickerSelected={(imageSelcted) => {
              onImageCameFromGallery(imageSelcted);
            }}
            onCameraPressed={() => {
              setIsCameraShown(!isCameraShown);
            }}
          />

          <CustomCamera
            show={isCameraShown}
            onClose={() => setIsCameraShown(false)}
            onPictureTaken={(response) => {
              setIsCameraShown(false);
              setIsPickerShown(false);
              // if image came it will add the uri in our state
              setImageFromCamera(response.uri);
            }}
          />
          {showLoading && <Loading />}
          <Toast />
        </View>
      </ScrollView>
    </Modal>
  );
}

export { AddTeacher };

const styles = StyleSheet.create({
  formCon: {
    height: "100%",
    // justifyContent: "center",
    paddingHorizontal: 10,
    borderColor: "black",
  },

  pickImgCircle: {
    backgroundColor: "orange",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
});
