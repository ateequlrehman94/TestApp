import * as firebase from "firebase/app";
import "@firebase/firestore";
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC0cIS0rXTRdmwxO3s8F62v1HLfr00PqdA",

  authDomain: "test-backend-d23a8.firebaseapp.com",

  projectId: "test-backend-d23a8",

  storageBucket: "test-backend-d23a8.appspot.com",

  messagingSenderId: "17782173811",

  appId: "1:17782173811:web:4ece344db7fd6506203a06",

  measurementId: "G-5FXK79P89Q",
};
if (firebase.apps.length > 0 === false) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
