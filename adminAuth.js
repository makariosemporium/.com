// adminAuth.js
import { auth, db, onAuthStateChanged, doc, getDoc } from "../firebase.js";

export function adminAuthCheck() {
  onAuthStateChanged(auth, async user => {
    if (!user) {
      // Not logged in → redirect
      window.location.href = "../auth/login.html";
      return;
    }

    // Check if user is admin
    const adminDoc = await getDoc(doc(db, "admins", user.uid));
    if (!adminDoc.exists()) {
      alert("Access denied. Admins only.");
      auth.signOut();
      window.location.href = "../auth/login.html";
    }
  });
}
