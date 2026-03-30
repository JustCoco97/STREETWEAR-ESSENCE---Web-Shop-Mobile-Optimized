import { db, collection, onSnapshot } from "./firebase-config.js";

const sliderTrack = document.getElementById("slider-track");
const categoriesGrid = document.getElementById("categories-grid");

onSnapshot(collection(db, "prodotti"), (snapshot) => {
  sliderTrack.innerHTML = "";
  categoriesGrid.innerHTML = "";

  snapshot.forEach((doc) => {
    const p = doc.data();

    // COLLEGO I NOMI ESATTI DELL'ADMIN AL SITO
    const nome = p.nome || "Prodotto";
    const img = p.fotoPrincipale || ""; // Prima era mainImg, ora è corretto
    const cat = p.sezione || ""; // Prima era category, ora è corretto
    const extra = encodeURIComponent(JSON.stringify(p.fotoExtra || []));

    // Se non c'è l'immagine, saltiamo il prodotto (così spariscono i quadrati neri)
    if (!img) return;

    const productHTML = `
            <div class="cat-card">
                <div class="cat-box" style="background-image: url('${img}')" 
                     onclick="openProduct('${nome.replace(/'/g, "\\'")}', '${img}', '${extra}')">
                </div>
                <div class="product-name">${nome}</div>
                <a href="https://wa.me/393273187853?text=Ciao, vorrei info su: ${nome}" 
                   class="wa-cat-btn" target="_blank">SCRIVICI SU WHATSAPP ✅</a>
            </div>
        `;

    // LOGICA SMISTAMENTO (In base ai value del tuo select nell'admin)
    if (cat === "preferiti") {
      sliderTrack.innerHTML += productHTML;
    } else {
      // Tutto il resto (vetrina, felpe, tute, ecc.) va nella griglia principale
      categoriesGrid.innerHTML += productHTML;
    }
  });
});
