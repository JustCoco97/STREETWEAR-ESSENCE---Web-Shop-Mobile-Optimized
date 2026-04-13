// firebase-config.js (VERSIONE COMPLETA)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js"; // <--- MANCAVA QUESTO!

const firebaseConfig = {
  apiKey: "AIzaSyBv9ZAOQyljdW41ZDTuxNacXzqegXEvn94",
  authDomain: "streetwearessence2026.firebaseapp.com",
  projectId: "streetwearessence2026",
  storageBucket: "streetwearessence2026.firebasestorage.app",
  messagingSenderId: "926228477709",
  appId: "1:926228477709:web:8a15d11ac26022f1fee244",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // <--- MANCAVA QUESTO!

export {
  db,
  storage,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  ref,
  uploadBytes,
  getDownloadURL,
};
