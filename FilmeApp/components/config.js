// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAg90KoiFNjyWEq8v3TsS_DtdIXI0yaj1Y",
  authDomain: "filme-4277e.firebaseapp.com",
  projectId: "filme-4277e",
  storageBucket: "filme-4277e.appspot.com",
  messagingSenderId: "89922647715",
  appId: "1:89922647715:web:a9d3c299d65f9bafa8f116",
  measurementId: "G-YG8BEYHXJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;
const analytics = getAnalytics(app);