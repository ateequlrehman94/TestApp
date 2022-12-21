import { ActivityIndicator, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

function Loading() {
  return (
    <View style={styles.mainCon}>
      <ActivityIndicator size={"large"} color={"blue"} />
      <LottieView
        source={require("../../assets/Loading_animat/Education Lottie.json")}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainCon: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    position: "absolute",
  },
});

export { Loading };
