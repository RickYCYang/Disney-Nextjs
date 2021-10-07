import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD0WRPKP05l0CxZRJAnR-5jKS7ioyIlAkQ",
  authDomain: "disney-nextjs-9a4d6.firebaseapp.com",
  projectId: "disney-nextjs-9a4d6",
  storageBucket: "disney-nextjs-9a4d6.appspot.com",
  messagingSenderId: "1075094465048",
  appId: "1:1075094465048:web:fbcc17841e719c208ff16d",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
