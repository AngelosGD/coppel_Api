// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPuZILhj3Qnwg5gp4dqjiDrvZph2gTKvM",
  authDomain: "coppel-api-db.firebaseapp.com",
  projectId: "coppel-api-db",
  storageBucket: "coppel-api-db.firebasestorage.app",
  messagingSenderId: "749949427581",
  appId: "1:749949427581:web:67cb7ea54dc627adc53614",
  measurementId: "G-DWSB80LWJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);