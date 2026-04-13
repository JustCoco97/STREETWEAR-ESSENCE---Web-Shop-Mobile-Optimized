// databasestreet.js
import { db, collection, onSnapshot } from "./firebase-config.js";

const sliderTrack = document.getElementById("slider-track");
const categoriesGrid = document.getElementById("categories-grid");

onSnapshot(collection(db, "prodotti"), (snapshot) => {
  sliderTrack.innerHTML = "";
  categoriesGrid.innerHTML = "";

  snapshot.forEach((docSnap) => {
    const p = docSnap.data();
    const nome = p.nome || "Prodotto";
    const img = p.fotoPrincipale || "";
    const cat = p.sezione || "";
    const extra = encodeURIComponent(JSON.stringify(p.fotoExtra || []));

    if (!img) return;

    const card = `
      <div class="cat-card">
        <div class="cat-box" 
             style="background-image: url('${img}'); background-size:cover; background-position:center; aspect-ratio:1/1;"
             onclick="openProduct('${nome.replace(/'/g, "\\'")}', '${img}', '${extra}')">
        </div>
        <div class="product-name">${nome}</div>
        <a href="https://wa.me/393273187853?text=Ciao, vorrei info su: ${nome}" 
           class="wa-cat-btn" target="_blank">SCRIVICI SU WHATSAPP ✅</a>
      </div>
    `;

    if (cat === "preferiti") {
      sliderTrack.innerHTML += card;
    } else {
      categoriesGrid.innerHTML += card;
    }
  });
});
