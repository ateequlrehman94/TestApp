import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Keyboard,
  ScrollView,
  Dimensions,
} from "react-native";
import Checkbox from "expo-checkbox";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { Component } from "react";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
const Loginschema = yup.object().shape({
  password: yup
    .string()
    .min(8, ({ min }) => "Password Must be at least ${min} characters")
    .required("Password Address is Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});
function Resetpassword({ navigation }) {
  const [New_Password, setnewPassword] = useState();
  const [Confirm_Password, setconfirmPassword] = useState();

  const [showpassowrd, setshowpassowrd] = useState(false);
  const [rememberme, setrememberme] = useState(false);

  const gotologinpage = () => {
    navigation.navigate("Login");
    if (New_Password !== Confirm_Password) {
      alert("Password does not match");
      return;
    }
    if (New_Password === Confirm_Password) {
      navigation.navigate("Login");
    }
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Formik
          initialValues={{ email: "" }}
          validateOnMount={true}
          onSubmit={(values) => {
            navigation.navigate("Resetpassword");
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
              <View style={styles.internalimage}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Forget Password
                </Text>
              </View>
              <View>
                <Text style={{ marginVertical: 8, margin: 15 }}>
                  Please enter your Email so we can help you recover your
                  password.
                </Text>
              </View>
              <View>
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
                  style={{ fontSize: 24, color: "#4632A1" }}
                  name={showpassowrd ? "eye-outline" : "eye-off-outline"}
                />
                {errors.password && touched.password && (
                  <Text style={styles.errors}>{errors.password}</Text>
                )}
              </View>
              <View style={styles.container}>
                <View style={styles.fixToText}>
                  <Button
                    rounded
                    disabled={!isValid}
                    style={[
                      styles.loginbtn,
                      styles.shadowbtn,
                      {
                        shadoColor: "@00acee",
                        backgroundColor: isValid ? "#4632A1" : "#CACFD2",
                      },
                    ]}
                    title={"CONTINUE"}
                    onPress={handleSubmit}
                  ></Button>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

export default Resetpassword;
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff6f4",
    allignSelf: "center",
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
  inputContainer: {
    borderColor: "#e9e8e4",
    padding: 10,
    borderRadius: 30,
    borderWidth: 2,
    margin: 10,
  },
  checkbox: {
    flexDirection: "row",
    margin: 10,
  },
  container: {},
  fixToText: {
    padding: 5,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  loginbtn: {
    alignSelf: "center",
    width: Dimensions.get("window").width / 2,
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
  },

  forgrtpass: { marginLeft: 230, marginTop: 10, marginBottom: 10 },
});
