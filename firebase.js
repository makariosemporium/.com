// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, collection, doc, getDocs, setDoc, query, where, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCH4_GL8_zHPNAyLD5Kwtp0Fa6AbsscaHk",
  authDomain: "makariosweb-49873.firebaseapp.com",
  projectId: "makariosweb-49873",
  storageBucket: "makariosweb-49873.appspot.com",
  messagingSenderId: "1068429391288",
  appId: "1:1068429391288:web:40ad7c1e7a3166c1df8b4d",
  measurementId: "G-BKJRNBCEQX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, collection, doc, getDocs, setDoc, query, where, updateDoc, getDoc, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut };
