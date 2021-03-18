import firebase from "firebase/app";
import "firebase/firestore";

const database = firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
});

export const db = database.firestore();
