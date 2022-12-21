import Toast from "react-native-toast-message";

function showToast(toastType, toastMessage, toastPosition = "bottom") {
  Toast.show({
    type: toastType,
    text1: "Hi",
    text2: toastMessage,
    position: toastPosition,
    duration: 3000,
  });
}

export { showToast };
