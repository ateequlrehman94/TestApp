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
import { useState } from "react";
import Toast from "react-native-toast-message";
import * as yup from "yup";
import { firebase } from "../../services/firebaseConfig";
import { Loading } from "../../components/loading";
import { showToast } from "../../utils/toast";
import {
  getUserId,
  storeUserSession,
  getUserLoggedInStatus,
} from "../../services/storageService";

function Loginn({ navigation }) {
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
  const loggedIn = getUserLoggedInStatus();
  const UID = getUserId();

  const [showpassowrd, setshowpassowrd] = useState();

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/564x/4b/5f/b6/4b5fb68f3a3f425344f265f970db6ec4.jpg",
      }}
      style={styles.image}
    >
      <ScrollView>
        <View>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validateOnMount={true}
            onSubmit={(values) => {
              console.log(values);
              setShowLoading(true);

              firebase
                .auth()
                .signInWithEmailAndPassword(values.email, values.password)
                .then((authResponse) => {
                  setShowLoading(false);

                  const userUid = authResponse.user.uid;

                  storeUserSession(userUid, "true");

                  navigation.navigate("Home");
                  showToast(
                    "success",
                    "you are the authentic useer CONGO",
                    "top"
                  );
                  //  now we need a session of user and also take him to goToHome()
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
                <View style={styles.internalimage}>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    Create New Account
                  </Text>
                </View>
                <TouchableOpacity>
                  <View style={{ alignItems: "center" }}>
                    <View style={styles.tinyLogo}>
                      <Image
                        source={{
                          uri: "https://reactnative.dev/img/tiny_logo.png",
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <View>
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
                </View>
              </View>
            )}
          </Formik>
        </View>
        {showLoading && <Loading />}
        <Toast />
      </ScrollView>
    </ImageBackground>
  );
}
export default Loginn;
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
