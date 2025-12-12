import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, setDoc, doc } from "../firebase.js";

// Login
const loginForm = document.querySelector("#loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => window.location.href = "../account/index.html")
      .catch(err => alert(err.message));
  });
}

// Register
const registerForm = document.querySelector("#registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = registerForm.name.value;
    const email = registerForm.email.value;
    const password = registerForm.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setDoc(doc(db, "users", userCredential.user.uid), { name, email, createdAt: new Date() });
        window.location.href = "../account/index.html";
      })
      .catch(err => alert(err.message));
  });
}
