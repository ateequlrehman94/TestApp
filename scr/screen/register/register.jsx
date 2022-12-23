import Checkbox from "expo-checkbox";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { Component } from "react";
import ConfettiCannon from "react-native-confetti-cannon";
import { useState } from "react";
import Toast from "react-native-toast-message";
import * as yup from "yup";
import { firebase } from "../../services/firebaseConfig";
import { MediaPicker } from "../../components/mediapickermodel";
import { CustomCamera } from "../../components/customCamera";
import { getARandomImageName } from "../../utils/imageRendomNumber";
import { uploadImage } from "../../services/uploadImageFirebase";
import { makeBlob } from "../../services/uploadImageFirebase";
import { Loading } from "../../components/loading";
import { showToast } from "../../utils/toast";

const teacherimage = require("../register/assets/teacher.png");

function Register({ navigation }) {
  const [isCameraShown, setIsCameraShown] = useState(false);
  const [imageFromPicker, setImageFromPicker] = useState("");
  const [imageFromCamera, setImageFromCamera] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const Logoutvalidationschema = yup.object().shape({
    email: yup
      .string()
      .email("Please Enter Valid Email")
      .required("Email Address is Required"),
    password: yup
      .string()
      .min(6, ({ min }) => "Password Must be at least 6 characters")
      .required("Password is Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "Must Contain 6 Characters, \n One Uppercase, \n One Lowercase, \n One Number\n One Special Case Character"
      ),
  });
  // const img1 = require("../../../assets/pigeon.jpg");
  const img = {
    uri: "https://i.pinimg.com/564x/4b/5f/b6/4b5fb68f3a3f425344f265f970db6ec4.jpg",
  };
  const [isPickerShown, setIsPickerShown] = useState(false);

  const onImagePressed = () => {
    if (isPickerShown === true) {
      setIsPickerShown(false);
    } else if (isPickerShown === false) {
      setIsPickerShown(true);
    }
    // lin51  does the same sa all from 45 to 49
    // setIsPickerShown(!isPickerShown)
  };

  const [showpassowrd, setshowpassowrd] = useState();
  const gotlogi = () => {
    // firebase.firestore.collection("users");
    navigation.navigate("Login");
  };
  const [showConffeti, setShowConffeti] = useState(false);
  const onButtonPre = () => {
    if (showConffeti === true) {
      setShowConffeti(false);
    } else if (showConffeti === false) {
      setShowConffeti(true);
    }
  };
  const onImageCameFromGallery = (image) => {
    setImageFromPicker(image.uri);
    setIsPickerShown(false);
  };
  const gotoalert = () =>
    Alert.alert(
      "Congratulation !",
      "Account Created Successfully",
      [
        {
          text: "Log In",
          onPress: gotlogi,
        },
        { text: "OK", onPress: onButtonPre },
      ],
      { cancelable: true }
    );

  return (
    <ImageBackground source={img} style={styles.image}>
      <ScrollView>
        <View>
          <Formik
            initialValues={{
              name: "",
              IDCard: "",
              email: "",
              password: "",
              phoneNumber: "",
              Gender: "",
            }}
            validateOnMount={true}
            onSubmit={(values) => {
              console.log(values);
              const saveUserDataToFireStore = (uid, imageUrlOnServer) => {
                firebase
                  .firestore()
                  .collection("users")
                  .doc(uid)
                  .set({
                    phoneNumber: values.phoneNumber,
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    IDCard: values.IDCard,
                    Gender: values.Gender,
                    profile_url: imageUrlOnServer,
                  })
                  .then((response) => {
                    setShowLoading(false);
                    navigation.goBack();
                    showToast(
                      "success",
                      "Registered successfully proceed to login",
                      "top"
                    );
                  })
                  .catch((error) => {
                    showToast("error", error.message, "top");
                    setShowLoading(false);
                  });
              };

              function uploadImage(uid) {
                const imageUri = imageFromCamera || imageFromPicker;

                makeBlob(imageUri)
                  .then((imageBlob) => {
                    const userStorageRef = firebase.storage().ref("users/");
                    const imageName = getARandomImageName();
                    userStorageRef
                      .child(imageName)
                      .put(imageBlob)
                      .then((uploadResponse) => {
                        // will fetch uploaded image url for us
                        firebase
                          .storage()
                          .ref("users/" + imageName)
                          .getDownloadURL()
                          .then((downloadRes) => {
                            const imageUrlOnServer = downloadRes;

                            // passing the UID and url to add data to firestore function
                            saveUserDataToFireStore(uid, imageUrlOnServer);
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
              setShowLoading(true);
              firebase
                .auth()
                .createUserWithEmailAndPassword(values.email, values.password)
                .then((authResponse) => {
                  if (authResponse.user.uid) {
                    const uid = authResponse.user.uid;
                    uploadImage(uid);
                    //UPLOAD AN IMAGE PROCESS
                  }
                })
                .catch((authError) => {
                  setShowLoading(false);
                  showToast("error", authError.message, "top");
                });
            }}
            validationSchema={Logoutvalidationschema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <View>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.TitleText}>Create New Account</Text>
                </View>
                <TouchableOpacity onPress={onImagePressed}>
                  <View style={{ alignItems: "center" }}>
                    <Image
                      style={styles.imageprofile}
                      source={{ uri: imageFromPicker || imageFromCamera }}
                      resizeMode={"center"}
                    />
                  </View>
                </TouchableOpacity>
                <View>
                  <View style={styles.inputCon}>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      placeholder={"Name"}
                      value={values.name}
                    />
                  </View>
                  <View style={styles.inputCon}>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange("IDCard")}
                      onBlur={handleBlur("IDCard")}
                      placeholder={"ID Card"}
                      value={values.IDCard}
                    />
                  </View>
                  {/* <Text
                    style={{
                      fontWeight: "bold",
                      paddingLeft: 20,
                      //  paddingTop: 10,
                    }}
                  >
                    Enter your Email Address
                  </Text> */}
                  <View style={styles.inputCon}>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      placeholder={"Email"}
                      value={values.email}
                      keyboardType="email-address"
                    />
                    <Ionicons
                      name={!errors.email ? "checkmark" : "close"}
                      style={{
                        fontSize: 24,
                        alignSelf: "center",
                        color: !errors.email ? "#4632A1" : "red",
                      }}
                    ></Ionicons>
                  </View>
                  {errors.email && touched.email && (
                    <Text style={styles.errors}>{errors.email}</Text>
                  )}
                  {/* <Text
                    style={{
                      fontWeight: "bold",
                      paddingLeft: 20,
                      //  paddingTop: 10,
                    }}
                  >
                    Enter your Password
                  </Text> */}
                  <View style={styles.inputCon}>
                    <TextInput
                      style={styles.input}
                      placeholder={"Password"}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      secureTextEntry={showpassowrd}
                      value={values.password}
                    />
                    <Ionicons
                      onPress={() => setshowpassowrd(!showpassowrd)}
                      style={{
                        alignSelf: "center",
                        fontSize: 24,
                        color: "#4632A1",
                      }}
                      name={showpassowrd ? "eye-off-outline" : "eye-outline"}
                    />
                  </View>
                  {errors.password && touched.password && (
                    <Text style={styles.errors}>{errors.password}</Text>
                  )}
                  <View style={styles.inputCon}>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange("phoneNumber")}
                      onBlur={handleBlur("phoneNumber")}
                      placeholder={"phone Number"}
                      value={values.phoneNumber}
                    />
                  </View>
                  <View style={styles.inputCon}>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange("Gender")}
                      onBlur={handleBlur("Gender")}
                      placeholder={"Gender"}
                      value={values.Gender}
                    />
                  </View>
                </View>
                <View style={styles.checkbox}>
                  <Checkbox value={false} color={"#3aafa9"} />
                  <Text style={{ margin: 5 }}>
                    By creating account you are agree with our Terms of Services
                    and Privacy Policy
                  </Text>
                </View>

                <View style={styles.fixToText}>
                  <Button
                    rounded
                    disabled={!isValid}
                    style={[
                      styles.shadowbtn,
                      {
                        backgroundColor: isValid ? "#4632A1" : "#CACFD2",
                      },
                    ]}
                    title={"Continue"}
                    onPress={handleSubmit}
                  ></Button>

                  {showConffeti === true ? (
                    <ConfettiCannon count={50} origin={{ x: 150, y: 0 }} />
                  ) : null}
                </View>
              </View>
            )}
          </Formik>
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
      </ScrollView>
    </ImageBackground>
  );
}
export default Register;
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  TitleText: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
    color: "blue",
  },
  imageprofile: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  inputCon: {
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
  textBtnCon: {
    padding: 5,
    margin: 5,
    alignItems: "flex-end",
  },
  fixToText: {
    padding: 5,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  loginbtn: {
    alignSelf: "center",
    // width: Dimensions.get("window").width / 2,
    justifyContent: "center",
  },
  shadowbtn: {
    shadowOffset: { width: 1, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 15,
  },
  errors: {
    fontSize: 14,
    color: "#FF0000",
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 20,
  },
});
