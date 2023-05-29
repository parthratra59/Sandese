
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBVeYqcPUnenQufJhhemqtzSY9nv4nzYX4",
  authDomain: "sandese-app-4dde9.firebaseapp.com",
  projectId: "sandese-app-4dde9",
  storageBucket: "sandese-app-4dde9.appspot.com",
  messagingSenderId: "996227410823",
  appId: "1:996227410823:web:76ce253f63bf6861624122",
  measurementId: "G-5NMKSKFLTZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth =getAuth();
export const storage = getStorage();
export const  db =getFirestore();