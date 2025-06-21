// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkicrmTdQHQZ9O1W5HXB8L8OoIaRh-WG4",
  authDomain: "fir-course-9a576.firebaseapp.com",
  projectId: "fir-course-9a576",
  storageBucket: "fir-course-9a576.firebasestorage.app",
  messagingSenderId: "20067518682",
  appId: "1:20067518682:web:8577938e548bdf04ec7de3",
  measurementId: "G-M2LLR9DHR6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const google = new GoogleAuthProvider();
export const db = getFirestore(app);
