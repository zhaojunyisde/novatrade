// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// REPLACE THE OBJECT BELOW WITH YOUR OWN FIREBASE CONFIGURATION
const firebaseConfig = {
    apiKey: "AIzaSyCMozEI4R9xawpEywIc-70yVdq5iz5mPxU",
    authDomain: "novatrade-43f38.firebaseapp.com",
    projectId: "novatrade-43f38",
    storageBucket: "novatrade-43f38.firebasestorage.app",
    messagingSenderId: "385192356736",
    appId: "1:385192356736:web:78b07c28f01ae3461caf65",
    measurementId: "G-33X0201QEV"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
