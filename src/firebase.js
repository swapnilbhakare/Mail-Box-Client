import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAi3Y4j41g88eqWbPm1f0R9JiUrH1R3Y0",
  authDomain: "email-box-client-2ffae.firebaseapp.com",
  projectId: "email-box-client-2ffae",
  storageBucket: "email-box-client-2ffae.appspot.com",
  messagingSenderId: "663137766872",
  appId: "1:663137766872:web:6d181bdf208599768076ad",
  measurementId: "G-C55DDCNMY3",
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const provider = new GoogleAuthProvider();
export { db, auth, provider };
