import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { Component } from "react";
import { Formik } from "formik";
import { Input } from "../../components/input";
import { cusbutton } from "../../components/cus_button";
import * as yup from "yup";
const forgrtschema = yup.object().shape({
  email: yup
    .string()
    .email("Please Enter Valid Email")
    .required("Email Address is Required"),
});

function Forgetpassword({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Formik
          initialValues={{ email: "" }}
          validateOnMount={true}
          onSubmit={(values) => {
            navigation.navigate("Resetpassword");
          }}
          validationSchema={forgrtschema}
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
                  Forget Password
                </Text>
              </View>
              <View>
                <Text style={{ textAlign: "center" }}>
                  Please enter your Email so we can help you to recover your
                  password.
                </Text>
              </View>
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
                  title={"Next"}
                  onPress={handleSubmit}
                ></Button>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}
export default Forgetpassword;
const styles = StyleSheet.create({
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
  icon: {
    alignSelf: "center",
  },
  checkbox: {
    flexDirection: "row",
    margin: 10,
  },
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
});
