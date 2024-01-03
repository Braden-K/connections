// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXT0NhLIulp6_v1vfyz5mqPBPfOGvo9AE",
  authDomain: "connections-01.firebaseapp.com",
  projectId: "connections-01",
  storageBucket: "connections-01.appspot.com",
  messagingSenderId: "738820093930",
  appId: "1:738820093930:web:6f222892df3d91a3682493",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
