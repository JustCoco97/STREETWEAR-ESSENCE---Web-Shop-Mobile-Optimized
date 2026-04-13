import {
  db,
  auth,
  collection,
  onSnapshot,
  addDoc,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "./firebase-config.js";

const sliderTrack = document.getElementById("slider-track");
const categoriesGrid = document.getElementById("categories-grid");

// 1. VISUALIZZAZIONE PRODOTTI (Quello che avevi, potenziato)
onSnapshot(collection(db, "prodotti"), (snapshot) => {
  sliderTrack.innerHTML = "";
  categoriesGrid.innerHTML = "";

  snapshot.forEach((doc) => {
    const p = doc.data();
    const nome = p.nome || "Prodotto";
    const img = p.fotoPrincipale || "";
    const cat = p.sezione || "";
    const extra = encodeURIComponent(JSON.stringify(p.fotoExtra || []));

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

    if (cat === "preferiti") {
      sliderTrack.innerHTML += productHTML;
    } else {
      categoriesGrid.innerHTML += productHTML;
    }
  });
});

// 2. LOGICA LOGIN ADMIN
window.loginAdmin = () => {
  const email = document.getElementById("admin-email").value;
  const pass = document.getElementById("admin-password").value;

  signInWithEmailAndPassword(auth, email, pass)
    .then(() => {
      document.getElementById("login-modal").style.display = "none";
    })
    .catch((err) => alert("Accesso Negato: Controlla email e password"));
};

// 3. CONTROLLO STATO LOGIN (Mostra/Nascondi Pannello)
onAuthStateChanged(auth, (user) => {
  const adminPanel = document.getElementById("admin-panel");
  const logoutBtn = document.getElementById("logout-btn");
  const loginBtn = document.getElementById("login-btn");

  if (user && user.email === "manuel23lb@gmail.com") {
    adminPanel.style.display = "block";
    logoutBtn.style.display = "block";
    loginBtn.style.display = "none";
  } else {
    adminPanel.style.display = "none";
    logoutBtn.style.display = "none";
    loginBtn.style.display = "block";
  }
});

// 4. LOGOUT
document.getElementById("logout-btn").onclick = () => signOut(auth);

// 5. AGGIUNGI PRODOTTO AL DATABASE
document.getElementById("add-btn").onclick = async () => {
  const nome = document.getElementById("p-nome").value;
  const img = document.getElementById("p-img").value;
  const sezione = document.getElementById("p-sezione").value;
  const extraRaw = document.getElementById("p-extra").value;

  // Converte la stringa di link (separati da virgola) in un vero array
  const fotoExtra = extraRaw
    ? extraRaw.split(",").map((url) => url.trim())
    : [];

  if (nome && img) {
    try {
      await addDoc(collection(db, "prodotti"), {
        nome: nome,
        fotoPrincipale: img,
        sezione: sezione,
        fotoExtra: fotoExtra,
        data: new Date(),
      });
      alert("Articolo pubblicato! 🔥");
      // Pulisce i campi
      document.getElementById("p-nome").value = "";
      document.getElementById("p-img").value = "";
      document.getElementById("p-extra").value = "";
    } catch (e) {
      alert("Errore nel caricamento: " + e.message);
    }
  } else {
    alert("Metti almeno nome e foto principale!");
  }
};
