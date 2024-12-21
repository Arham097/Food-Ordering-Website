// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIL8_yQHyoEACXWNe3Decp1H4wbwcVssU",
  authDomain: "hasanbites-45033.firebaseapp.com",
  projectId: "hasanbites-45033",
  storageBucket: "hasanbites-45033.firebasestorage.app",
  messagingSenderId: "982992051245",
  appId: "1:982992051245:web:549ebd71778c2994866ca4",
  measurementId: "G-26VCDFBJQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);