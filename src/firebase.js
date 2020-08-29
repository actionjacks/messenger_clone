import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBa-e13x7ZFaYrxKZU-qRD2LFe8UnV2ejU",
  authDomain: "jackmessenger-e9aff.firebaseapp.com",
  databaseURL: "https://jackmessenger-e9aff.firebaseio.com",
  projectId: "jackmessenger-e9aff",
  storageBucket: "jackmessenger-e9aff.appspot.com",
  messagingSenderId: "308423447401",
  appId: "1:308423447401:web:22f0b3716d11f1da79a3f8",
  measurementId: "G-7H5RBBC0R6",
});

const db = firebaseApp.firestore();

export default db;
