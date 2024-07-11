import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbB8nKxIf7TN3AGVOPMuHSoLoLtfpE9gI",
  authDomain: "projetoreactproduto.firebaseapp.com",
  projectId: "projetoreactproduto",
  storageBucket: "projetoreactproduto.appspot.com",
  messagingSenderId: "542585396818",
  appId: "1:542585396818:web:f57ad2425c9e8780da098b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
