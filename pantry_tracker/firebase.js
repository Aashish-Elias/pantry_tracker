// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYxMkrhUNb8FzqAtzJxR5W-hhG7r5-8YI",
  authDomain: "pantry-tracker-da20f.firebaseapp.com",
  projectId: "pantry-tracker-da20f",
  storageBucket: "pantry-tracker-da20f.appspot.com",
  messagingSenderId: "317327897120",
  appId: "1:317327897120:web:b29741b0eb8a58186f4245",
  measurementId: "G-F04EXYES3K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export { firestore };
