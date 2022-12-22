import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../utils/toast";
async function storeUserSession(uid, sessionState) {
  try {
    await AsyncStorage.setItem("user_uid", uid);
    await AsyncStorage.setItem("user_is_logged_in", sessionState);
  } catch (error) {
    showToast("error", error.message);
  }
}

function getUserId() {
  return AsyncStorage.getItem("user_uid");
}

function getUserLoggedInStatus() {
  return AsyncStorage.getItem("user_is_logged_in");
}
async function clearUserSession() {
  try {
    await AsyncStorage.setItem("user_uid", "");
    await AsyncStorage.setItem("user_is_logged_in", "false");
  } catch (error) {
    showToast("error", error.message);
  }
}
export { storeUserSession, getUserLoggedInStatus, getUserId, clearUserSession };
