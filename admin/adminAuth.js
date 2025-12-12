// adminAuth.js
import { auth, onAuthStateChanged } from "../firebase.js";

const ADMIN_UID = "0lRoMun3CXTwhfUp5W0PmC0j7Cz2"; // Your admin UID

onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "../auth/login.html";
    return;
  }

  if (user.uid !== ADMIN_UID) {
    alert("Access denied. Admins only.");
    auth.signOut();
    window.location.href = "../auth/login.html";
  }
});
