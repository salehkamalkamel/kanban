// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAkZkcpANR9Y19KIaIHDHGM9IBqS4ND9o",
  authDomain: "kanban-task-management-a-a744c.firebaseapp.com",
  projectId: "kanban-task-management-a-a744c",
  storageBucket: "kanban-task-management-a-a744c.appspot.com",
  messagingSenderId: "1047740654541",
  appId: "1:1047740654541:web:675b3ee4eb6e31e0d25a84",
  measurementId: "G-H8V128C1JK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
signInWithPopup;

export { app, analytics, auth, db, googleProvider, signInWithPopup };
