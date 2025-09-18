import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWXCJ063NzB0YsppsbbPQSe2BnZYszxo4",
  authDomain: "cmsc-6f731.firebaseapp.com",
  projectId: "cmsc-6f731",
  storageBucket: "cmsc-6f731.firebasestorage.app",
  messagingSenderId: "370337725385",
  appId: "1:370337725385:web:3c743f51ed94e30348c618",
  measurementId: "G-4ZF7LBWN01"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };