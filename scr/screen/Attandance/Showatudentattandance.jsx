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
import { Cusbutton } from "../../components/cus_button";
import { LinearGradient } from "expo-linear-gradient";

var genderoption = ["Male", "Female", "Others"];

function Showatudentattandance({ navigation, route, onClose, show }) {
  // const [incomingteacher, setincomingteacher] = useState(route.params.stu);
  // const [incomingteacherid, setincomingteacherid] = useState(route.params.Sid);
  const [showLoading, setShowLoading] = useState(false);
  const onSubmit = () => {
    setShowLoading(true);
  };
  // console.log(Sid);
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
            <Cusbutton
              onBottomPress={onSubmit}
              bgColor={"green"}
              textColor={"black"}
              text={"Add Student"}
            />
          </View>

          {showLoading && <Loading />}
          <Toast />
        </LinearGradient>
      </ScrollView>
    </Modal>
  );
}

export { Showatudentattandance };

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
