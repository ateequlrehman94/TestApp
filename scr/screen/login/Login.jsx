import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  ImageBackground,
} from "react-native";
import Toast from "react-native-toast-message";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Loading } from "../../components/loading";
import { showToast } from "../../utils/toast";
import { Input } from "../../components/input";
import { firebase } from "../../services/firebaseConfig";
// import {
//   getUserId,
//   storeUserSession,
//   getUserLoggedInStatus,
// } from "../../services/storageService";
function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  // const loggedIn = getUserLoggedInStatus();
  // const UID = getUserId();
  // console.log("my_uid", UID);
  // console.log("user_logged", loggedIn);
  const image = {
    uri: "https://i.pinimg.com/564x/4b/5f/b6/4b5fb68f3a3f425344f265f970db6ec4.jpg",
  };
  const onSignin = () => {
    setShowLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((authResponse) => {
        setShowLoading(false);
        showToast("success", "you are the authentic useer CONGO", "top");
        //  now we need a session of user and also take him to goToHome()
      })
      .catch((authError) => {
        setShowLoading(false);
        showToast("error", authError.message, "top");
      });
  };

  const gotoregister = () => {
    navigation.navigate("Register");
  };
  const gotoforgetpas = () => {
    navigation.navigate("Forgetpassword");
  };
  const handleShowPassword = () => {
    if (showPass === true) {
      setShowPass(false);
    } else if (showPass === false) {
      setShowPass(true);
    }
  };
  return (
    <ImageBackground source={image} style={styles.image}>
      <ScrollView>
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
        <View style={styles.inputCon}>
          <Input
            txtlabel={"EMAIL"}
            placeHold={"Email"}
            showIcon={true}
            iconName={"mail-outline"}
            onChange={setEmail}
          />

          <Input
            txtlabel={"Password"}
            placeHold={"Password"}
            isSecure={!showPass}
            showIcon={true}
            onChange={setPassword}
            iconName={showPass === false ? "eye-outline" : "eye-off-outline"}
            onIconPress={handleShowPassword}
          />
        </View>
        <View style={styles.textBtnCon}>
          <Text onPress={gotoforgetpas}>
            Forget Password ?
            <Ionicons name={"arrow-forward"} size={24} color={"#ff4931"} />
          </Text>
        </View>
        <View style={styles.fixToText}>
          <Button
            rounded
            //disabled={!isValid}
            style={[
              styles.loginbtn,
              {
                shadoColor: "#00acee",
                //      backgroundColor: isValid ? "#4632A1" : "#CACFD2",
                borderColor: "#00000",
              },
            ]}
            title={"Sign In"}
            onPress={onSignin}
          ></Button>
        </View>
        <View>
          <Text style={{ textAlign: "center", margin: 15 }}>
            By continuing, you agree our's
            <Text style={{ fontWeight: "bold" }}>Terms of Service ;</Text>
            Opens a new tab and acknowledge you've read our Privacy Policy
          </Text>
          <Text style={{ textAlign: "center" }} onPress={gotoregister}>
            Donot have a account yet{" "}
            <Text style={{ fontWeight: "bold" }}>Sign Up</Text> !
            <Ionicons name={"arrow-forward"} size={24} color={"#ff4931"} />
          </Text>
        </View>
        {showLoading && <Loading />}
        <Toast />
      </ScrollView>
    </ImageBackground>
  );
}
export default Login;
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
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

  // input: {
  //   width: "95%",
  //   borderColor: "#00000",
  // },
  textBtnCon: {
    padding: 5,
    margin: 5,
    alignItems: "flex-end",
  },
  // fixToText: {
  //   paddingHorizontal: 20,
  //   height: 50,
  //   // backgroundColor: "rgba(255,255,255,0.8)",
  //   marginHorizontal: 10,
  //   borderRadius: 20,
  //   marginVertical: 10,
  //   // padding: 5,
  //   //margin: 5,
  //   // flexDirection: "row",
  //   // justifyContent: "space-around",
  // },
  loginbtn: {
    alignSelf: "center",
    // width: Dimensions.get("window").width / 2,
    justifyContent: "center",
  },
  // errors: {
  //   fontSize: 14,
  //   color: "#FF0000",
  //   fontWeight: "bold",
  //   marginLeft: 20,
  // },
});
