// adminAuth.js
import { auth, db, onAuthStateChanged, doc, getDoc } from "../firebase.js";

const ADMIN_UID = "0lRoMun3CXTwhfUp5W0PmC0j7Cz2"; // Your admin UID

onAuthStateChanged(auth, async user => {
  if (!user) {
    // Not logged in → redirect
    window.location.href = "../auth/login.html";
    return;
  }

  // Check if the logged-in user's UID matches the admin UID
  if (user.uid !== ADMIN_UID) {
    alert("Access denied. Admins only.");
    auth.signOut();
    window.location.href = "../auth/login.html";
  }
});
