import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Keyboard,
  ScrollView,
  ImageBackground,
} from "react-native";
import Checkbox from "expo-checkbox";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { Component } from "react";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Body } from "cannon";
const Loginschema = yup.object().shape({
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

function Login({ navigation }) {
  const [showpassowrd, setshowpassowrd] = useState();
  const [rememberme, setrememberme] = useState(false);
  const image = {
    uri: "https://i.pinimg.com/564x/4b/5f/b6/4b5fb68f3a3f425344f265f970db6ec4.jpg",
  };
  const gotoregister = () => {
    navigation.navigate("Register");
  };
  const gotoforgetpas = () => {
    navigation.navigate("Forgetpassword");
  };
  handleShowPassword = () => {
    if (showpassowrd === true) {
      setshowpassowrd(false);
    }
    elseif(showpassowrd === false);
    {
      setshowpassowrd(true);
    }
  };
  return (
    <ScrollView>
      <View>
        <Formik
          initialValues={{ email: "", password: "" }}
          validateOnMount={true}
          onSubmit={(values) => {
            navigation.navigate("Home");
          }}
          validationSchema={Loginschema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            isValid,
            console,
            errors,
          }) => (
            <View>
              <ImageBackground source={image} style={styles.image}>
                <View style={styles.internalimage}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Welcome to Log In
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
                <Text
                  style={{
                    fontWeight: "bold",
                    paddingLeft: 20,
                    paddingTop: 10,
                  }}
                >
                  Email
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
                    paddingTop: 10,
                    color: "#00000",
                  }}
                >
                  Password
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
                <View style={styles.textBtnCon}>
                  <Text onPress={gotoforgetpas}>
                    Forget Password ?
                    <Ionicons
                      name={"arrow-forward"}
                      size={24}
                      color={"#ff4931"}
                    />
                  </Text>
                </View>
                <View style={styles.fixToText}>
                  <Button
                    rounded
                    disabled={!isValid}
                    style={[
                      styles.loginbtn,
                      {
                        shadoColor: "#00acee",
                        backgroundColor: isValid ? "#4632A1" : "#CACFD2",
                        borderColor: "#00000",
                      },
                    ]}
                    title={"Sign In"}
                    onPress={handleSubmit}
                  ></Button>
                </View>
                <Text style={{ textAlign: "center" }}>
                  By continuing, you agree our's
                  <Text style={{ fontWeight: "bold" }}>Terms of Service ;</Text>
                  Opens a new tab and acknowledge you've read our Privacy Policy
                </Text>
                <Text style={{ textAlign: "center" }} onPress={gotoregister}>
                  Donot have a account yet signup !
                  <Ionicons
                    name={"arrow-forward"}
                    size={24}
                    color={"#ff4931"}
                  />
                </Text>
              </ImageBackground>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}
export default Login;
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
  },
  internalimage: {
    //   allignSelf: "justify",
    marginTop: 40,
    marginBottom: 20,
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
    paddingHorizontal: 20,
    height: 50,
    // backgroundColor: "rgba(255,255,255,0.8)",
    marginHorizontal: 10,
    borderRadius: 20,
    marginVertical: 10,
    // padding: 5,
    //margin: 5,
    // flexDirection: "row",
    // justifyContent: "space-around",
  },
  loginbtn: {
    alignSelf: "center",
    // width: Dimensions.get("window").width / 2,
    justifyContent: "center",
  },
  errors: {
    fontSize: 14,
    color: "#FF0000",
    fontWeight: "bold",
    marginLeft: 20,
  },
});
