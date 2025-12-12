// auth.js
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

// Login
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        window.location.href = "../account/index.html";
      })
      .catch(err => alert(err.message));
  });
}

// Register
if (registerForm) {
  registerForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = registerForm.name.value;
    const email = registerForm.email.value;
    const password = registerForm.password.value;

    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        db.collection("users").doc(userCredential.user.uid).set({
          name,
          email,
          createdAt: firebase.firestore.Timestamp.now()
        });
        window.location.href = "../account/index.html";
      })
      .catch(err => alert(err.message));
  });
}
