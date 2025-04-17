// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Añade esto
import { getFunctions } from "firebase/functions"; // 👈 Añade esto

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Inicializa Firestore
export const functions = getFunctions(app); // 👈 Exporta Functions

export { auth, app, db }; // Exporta db