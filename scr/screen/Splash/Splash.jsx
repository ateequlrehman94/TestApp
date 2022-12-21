import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { SplashLoading } from "../../components/splashloading";
import { showToast } from "../../utils/toast";

function Splash({ navigation }) {
  const loadAfterTime = () => {
    showToast("success", "WELCOME");
    navigation.navigate("Login");
  };

  /***
   * this will run when screen turns on
   */
  useEffect(() => {
    // to wait for  atime we use power of timeout
    setTimeout(loadAfterTime, 3000);
  }, []);

  return (
    <View style={styles.mainCon}>
      <SplashLoading />
    </View>
  );
}

const styles = StyleSheet.create({
  mainCon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
});

export { Splash };
