import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

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

const sliderTrack = document.getElementById("slider-track");
const categoriesGrid = document.getElementById("categories-grid");

const q = query(collection(db, "prodotti"), orderBy("data", "desc"));

onSnapshot(q, (snapshot) => {
  if (sliderTrack) sliderTrack.innerHTML = "";
  if (categoriesGrid) categoriesGrid.innerHTML = "";

  snapshot.forEach((docSnap) => {
    const p = docSnap.data();
    const nome = p.nome || "Prodotto";
    const img = p.fotoPrincipale || "";
    const cat = p.sezione || "";
    const extra = encodeURIComponent(JSON.stringify(p.extraFoto || []));

    if (!img) return;

    const card = `
      <div class="cat-card">
        <div class="cat-box" 
             style="background-image: url('${img}');"
             onclick="openProduct('${nome.replace(/'/g, "\\'")}', '${img}', '${extra}')">
        </div>
        <div class="product-name">${nome}</div>
        <a href="https://wa.me/393273187853?text=Ciao, vorrei info su: ${nome}" 
           class="wa-cat-btn" target="_blank">SCRIVICI SU WHATSAPP ✅</a>
      </div>
    `;

    // LOGICA FILTRI HOME
    if (cat === "preferiti") {
      if (sliderTrack) sliderTrack.innerHTML += card;
    } else if (cat === "" || cat === "home") {
      // Mostra in "Tutti i prodotti" solo se non ha categoria o è segnato come home
      if (categoriesGrid) categoriesGrid.innerHTML += card;
    }
  });
});
