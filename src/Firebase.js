import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1HWP3DwhM-eNhnBku8XXxIU0bTyf51sw",
  authDomain: "slaproyecto.firebaseapp.com",
  projectId: "slaproyecto",
  storageBucket: "slaproyecto.firebasestorage.app",
  messagingSenderId: "434391047294",
  appId: "1:434391047294:web:47633408bbea80364e4c2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

//firestore
const db = getFirestore(app);

export { auth, googleProvider, db, signOut};