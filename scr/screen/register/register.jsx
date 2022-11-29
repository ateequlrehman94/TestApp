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
} from "react-native";
import { Formik } from "formik";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { Component } from "react";
import ConfettiCannon from "react-native-confetti-cannon";
import { useState } from "react";
import { Input } from "../../components/input";
import * as yup from "yup";

const teacherimage = require("../register/assets/teacher.png");

function Register({ navigation }) {
  const Logoutschema = yup.object().shape({
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
  const image = {
    uri: "https://i.pinimg.com/564x/4b/5f/b6/4b5fb68f3a3f425344f265f970db6ec4.jpg",
  };
  const [showpassowrd, setshowpassowrd] = useState();
  const gotlogi = () => {
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
          initialValues={{ email: "", password: "" }}
          validateOnMount={true}
          onSubmit={(values) => {
            navigation.navigate("Login");
          }}
          validationSchema={Logoutschema}
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
                <View style={styles.logo}>
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri: "https://reactnative.dev/img/tiny_logo.png",
                    }}
                  />
                </View>
                <View>
                  <Input placeHold={"User Name"} />
                  <Input placeHold="Father Name" />
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
                  <Input
                    placeHold="Contact Number"
                    showIcon={true}
                    iconName={!errors.contact ? "checkmark" : "close"}
                    col={!errors.contact ? "#4632A1" : "red"}
                  />
                  <Input placeHold="Date of Birth" showIcon={true} />
                  <Input placeHold="Gender" showIcon={true} />
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
                    <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
                  ) : null}
                </View>
              </ImageBackground>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}
export default Register;
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
  },
  internalimage: {
    allignSelf: "justify",
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 100,
  },
  tinyLogo: {
    allignSelf: "center",
    borderRadius: 30,
    marginBottom: 20,
    marginLeft: 150,
    width: 70,
    height: 70,
  },
  logo: {},
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
