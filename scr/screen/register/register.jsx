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
import { Input } from "../../components/input";
import * as yup from "yup";
import { firebase } from "../../utils/firebaseConfig";
import { MediaPicker } from "../../components/mediapickermodel";
import { CustomCamera } from "../../components/customCamera";

const teacherimage = require("../register/assets/teacher.png");

function Register({ navigation }) {
  const [firstname, setuseername] = useState();
  const [lastname, setfathername] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [DOB, setDOB] = useState();
  const [Gender, setGender] = useState();
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
  const image = {
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
    <ScrollView>
      <View>
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            DOB: "",
            Gender: "",
          }}
          validateOnMount={true}
          onSubmit={(values) => {
            console.log(values);
            firebase.firestore().collection("Users").doc("00001").set({
              firstname: values.firstname,
              lastname: values.lastname,
              email: values.email,
              password: values.password,
              DOB: values.DOB,
              Gender: values.Gender,
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
              <ImageBackground source={image} style={styles.image}>
                <View style={styles.internalimage}>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    Create New Account
                  </Text>
                </View>
                <TouchableOpacity onPress={onImagePressed}>
                  <View style={{ alignItems: "center" }}>
                    <View style={styles.tinyLogo}>
                      <Image
                        source={{ uri: imageFromPicker || imageFromCamera }}
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                        resizeMode={"center"}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <View>
                  <View style={styles.inputCon}>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange("firstname")}
                      onBlur={handleBlur("firstname")}
                      placeholder={"First Name"}
                      value={values.firstname}
                    />
                  </View>
                  <View style={styles.inputCon}>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange("lastname")}
                      onBlur={handleBlur("lastname")}
                      placeholder={"Last Name"}
                      value={values.lastname}
                    />
                  </View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      paddingLeft: 20,
                      //  paddingTop: 10,
                    }}
                  >
                    Enter your Email Address
                  </Text>
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
                  <Text
                    style={{
                      fontWeight: "bold",
                      paddingLeft: 20,
                      //  paddingTop: 10,
                    }}
                  >
                    Enter your Password
                  </Text>
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
                      onChangeText={handleChange("DOB")}
                      onBlur={handleBlur("DOB")}
                      placeholder={"Date of Birth"}
                      value={values.DOB}
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
              </ImageBackground>
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
    </ScrollView>
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
  internalimage: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: "center",
  },
  tinyLogo: {
    allignSelf: "center",
    borderRadius: 50,
    width: 100,
    height: 100,
    color: "black",
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
