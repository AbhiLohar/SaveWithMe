// 🔥 Import Firebase (latest version)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔑 CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyB2XWlCWMkt1tzWoKzq2roXyxO1MiAw6zU",
  authDomain: "savewithme.firebaseapp.com",
  projectId: "savewithme",
  storageBucket: "savewithme.firebasestorage.app",
  messagingSenderId: "689203158099",
  appId: "1:689203158099:web:d39305c1b05e929718faa6",
  measurementId: "G-5BT48NEY6J"
};

// Initialize
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ SAVE
window.saveCode = async function () {
  const category = document.getElementById("category").value;
  const title = document.getElementById("title").value;
  const code = document.getElementById("code").value;

  await addDoc(collection(db, "codes"), {
    category,
    title,
    code,
    createdAt: new Date()
  });

  alert("Saved!");
  loadCodes();
};

// ✅ LOAD (UPDATED)
async function loadCodes() {
  const querySnapshot = await getDocs(collection(db, "codes"));
  let html = "";

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();

    html += `
      <h3>${data.category}</h3>
      <div class="code-box">
        <b style="cursor:pointer;color:blue;"
           onclick="openEditor('${docSnap.id}')">
           ${data.title}
        </b>

        <button onclick="deleteCode('${docSnap.id}')">Delete</button>
      </div>
    `;
  });

  document.getElementById("output").innerHTML = html;
}

// ✅ OPEN NOTEPAD PAGE
window.openEditor = function (id) {
  window.open(`editor.html?id=${id}`, "_blank");
};

// ✅ DELETE
window.deleteCode = async function (id) {
  await deleteDoc(doc(db, "codes", id));
  alert("Deleted!");
  loadCodes();
};

// Initial load
loadCodes();