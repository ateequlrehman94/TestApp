import { useState } from "react";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";
import PhoneInput from "react-native-phone-number-input";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  Text,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Loading } from "../../components/loading";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { firebase } from "../../services/firebaseConfig";
import { MediaPicker } from "../../components/mediapickermodel";
import { CustomCamera } from "../../components/customCamera";
import { makeBlob } from "../../services/uploadImageFirebase";
import { showToast } from "../../utils/toast";
import { Ionicons } from "@expo/vector-icons";
import { Cusbutton } from "../../components/cus_button";
import { RadioButton } from "react-native-paper";
import { CheckBox, Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import {
  getARandomstudentImageName,
  getARandomstudentName,
} from "../../utils/RandomstudentName";
import { TextInput } from "react-native";
var genderoption = ["Male", "Female", "Others"];
var classoption = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "BS",
  "MS",
  "PHD",
];
var subjectoption = [
  "SCIENC (BIOLOGY) ",
  "SCIENCE (COMPUTER SCIENCE)",
  "INTERMEDIATE (Pre-ENgineering)",
  "INTERMEDIATE (Pre-Medical)",
  "INTERMEDIATE (Computer SCience)",
  "Physics",
  "Chemistry",
  "Computer Science",
  "Information Techonology",
  "Zology",
  "Botony",
  "English",
  "Statictics",
];
function Addstudent({ onClose, show }) {
  const [studentName, setstudentName] = useState(" ");
  const [fatherName, setfatherName] = useState(" ");
  const [fatherNIC, setfatherNIC] = useState(" ");
  const [countryCode, setCountryCode] = useState("+1");
  const [ContactNumber, setContactNumber] = useState(" ");
  const [Monthlyfee, setMonthlyfee] = useState("");
  const [DOB, setDOB] = useState("");
  const [Gender, setGender] = useState("Male");
  const [Class, setClass] = useState("");
  const [classSection, setclassSection] = useState("");
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
        const userStorageRef = firebase.storage().ref("Student/");
        const imageName = getARandomstudentImageName();
        userStorageRef
          .child(imageName)
          .put(imageBlob)
          .then((uploadResponse) => {
            // will fetch uploaded image url for us
            firebase
              .storage()
              .ref("Student/" + imageName)
              .getDownloadURL()
              .then((downloadRes) => {
                const imageUrlOnServer = downloadRes;

                // passing the UID and url to add data to firestore function
                saveStudentData(imageUrlOnServer);
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
  const saveStudentData = (imageUrl) => {
    const randomName = getARandomstudentName();

    firebase
      .firestore()
      .collection("Student")
      .doc(randomName)
      .set({
        StudentImageUrl: imageUrl,
        studentName,
        fatherName,
        ContactNumber,
        fatherNIC,
        Monthlyfee,
        Class,
        Gender,
        DOB,
        classSection,
        Address,
      })
      .then((response) => {
        setShowLoading(false);
        showToast("success", "Student Record uploaded", "top");
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
        <LinearGradient
          Style={{ flex: 1 }}
          colors={["green", "#FFFFFF", "orange"]}
        >
          <View>
            <Header title={"Add New Student"} onIconPress={onClose} />
          </View>
          <View>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={onImagePressed}
            >
              <View style={styles.pickImgCircle}>
                {/* <Ionicons name={"camera-sharp"} size={70} color={"white"} /> */}
                <Image
                  source={{ uri: imageFromPicker || imageFromCamera }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                  resizeMode={"contain"}
                />
              </View>
            </TouchableOpacity>

            <View style={styles.formCon}>
              <Input
                txtlabel={"Student Name"}
                placeHold={"Student Name"}
                showIcon={true}
                iconName={"pencil"}
                onChange={setstudentName}
              />
              <Input
                txtlabel={"Father Name"}
                placeHold={"Father Name"}
                showIcon={true}
                iconName={"pencil"}
                onChange={setfatherName}
              />
              <Input
                txtlabel={"Father NIC"}
                placeHold={"00000-0000000-0"}
                showIcon={true}
                iconName={"pencil"}
                onChange={setfatherNIC}
                inputtype={"numeric"}
              />
              <Text style={styles.inputtxtlabel}>Phone Number:</Text>

              <PhoneInput
                defaultCode="PK"
                layout="first"
                // withShadow
                // autoFocus
                containerStyle={{
                  // paddingHorizontal: 20,
                  height: 50,
                  // marginHorizontal: 10,
                  borderRadius: 20,
                  // marginVertical: 10,
                  flexDirection: "row",
                }}
                placeholder={"300-0000000"}
                // textContainerStyle={{ paddingVertical: 0 }}
                onChangeText={setContactNumber}
              />

              <Input
                txtlabel={"Monthly Fee"}
                placeHold={"Monthly Fee"}
                showIcon={true}
                iconName={"pencil"}
                onChange={setMonthlyfee}
                inputtype={"numeric"}
              />
              {/* <Input
              txtlabel={"Date Of Birth"}
              placeHold={"Date Of Birth"}
              showIcon={true}
              iconName={"pencil"}
              onChange={setDOB}
            /> */}

              <View>
                <View>
                  <Text style={styles.inputtxtlabel}>Select Gender</Text>
                  <Picker
                    style={styles.pickercon}
                    selectedValue={Gender}
                    onValueChange={(itemValue) => setGender(itemValue)}
                  >
                    {genderoption.map((item, index) => {
                      return (
                        <Picker.Item label={item} value={index} key={index} />
                      );
                    })}
                  </Picker>
                </View>
              </View>
              <View>
                <View>
                  <Text style={styles.inputtxtlabel}>Select Class</Text>
                  <Picker
                    style={styles.pickercon}
                    selectedValue={Class}
                    onValueChange={(itemValue) => setClass(itemValue)}
                  >
                    {classoption.map((item, index) => {
                      return (
                        <Picker.Item label={item} value={index} key={index} />
                      );
                    })}
                  </Picker>
                </View>
              </View>
              <View>
                <View>
                  <Text style={styles.inputtxtlabel}>Select Subject</Text>
                  <Picker
                    style={styles.pickercon}
                    selectedValue={classSection}
                    onValueChange={(itemValue) => setclassSection(itemValue)}
                  >
                    {subjectoption.map((item, index) => {
                      return (
                        <Picker.Item label={item} value={index} key={index} />
                      );
                    })}
                  </Picker>
                </View>
              </View>
              <Input
                txtlabel={"Address"}
                placeHold={"Address"}
                showIcon={true}
                iconName={"pencil"}
                onChange={setAddress}
              />

              <Cusbutton
                onBottomPress={onSubmit}
                bgColor={"green"}
                textColor={"black"}
                text={"Add Student"}
              />
            </View>

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
        </LinearGradient>
      </ScrollView>
    </Modal>
  );
}

export { Addstudent };

const styles = StyleSheet.create({
  formCon: {
    height: "100%",
    // justifyContent: "center",
    paddingHorizontal: 10,
    borderColor: "black",
  },
  pickImgCircle: {
    backgroundColor: "black",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 20,
  },
  inputtxtlabel: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 15,
  },
  pickercon: {
    paddingHorizontal: 20,
    height: 50,
    backgroundColor: "rgba(255,255,255,0.8)",
    marginHorizontal: 10,
    borderRadius: 20,
    marginVertical: 10,
    flexDirection: "row",
  },
});
