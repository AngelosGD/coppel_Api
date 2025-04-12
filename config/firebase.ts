// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0jvZtNJpNGtMMrLE10PHUc1RT78nIaEg",
  authDomain: "coppel-api.firebaseapp.com",
  projectId: "coppel-api",
  storageBucket: "coppel-api.firebasestorage.app",
  messagingSenderId: "112067618183",
  appId: "1:112067618183:web:7ae9e7fa22eb202e665f22",
  measurementId: "G-50LH4DKCT5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);