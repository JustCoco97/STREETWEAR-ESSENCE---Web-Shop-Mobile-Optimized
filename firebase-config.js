import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBv9ZAOqlydjw41DTuxNacxzqegXEvn94",
  authDomain: "streetwearessence2026.firebaseapp.com",
  projectId: "streetwearessence2026",
  storageBucket: "streetwearessence2026.firebasestorage.app",
  messagingSenderId: "926228477709",
  appId: "1:926228477709:web:8a15d11ac26022f1fee244",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Esportiamo tutto quello che serve per il database e per l'admin
export {
  db,
  auth,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
};
