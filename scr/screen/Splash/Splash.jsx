import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { SplashLoading } from "../../components/splashloading";
import { showToast } from "../../utils/toast";
import { getUserLoggedInStatus } from "../../services/storageService";
function Splash({ navigation }) {
  useEffect(() => {
    getUserLoggedInStatus()
      .then((response) => {
        if (response === "true") {
          navigation.navigate("Home");
        } else {
          navigation.navigate("Loginn");
        }
      })
      .catch((error) => {
        showToast("error", error.message);
      });
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
