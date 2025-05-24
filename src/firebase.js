// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYSckdTirWyGj3ov7Dt2RI_yYghkjpBkY",
  authDomain: "projet-etude-sdv.firebaseapp.com",
  projectId: "projet-etude-sdv",
  storageBucket: "projet-etude-sdv.firebasestorage.app",
  messagingSenderId: "143785997352",
  appId: "1:143785997352:web:83d219245b7e06fd7ef11d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore
const db = getFirestore(app);

export { auth, db };