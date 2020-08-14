import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDC_M_2d6fIbJKNnBuNn4PbFJ5bwuvJQl8",
  authDomain: "instagram-clone-rs.firebaseapp.com",
  databaseURL: "https://instagram-clone-rs.firebaseio.com",
  projectId: "instagram-clone-rs",
  storageBucket: "instagram-clone-rs.appspot.com",
  messagingSenderId: "775784749889",
  appId: "1:775784749889:web:eedc4240b31c9fc822dfc0",
  measurementId: "G-8P9X3YZCZW",
});

const db = firebaseApp.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

export { db, auth, storage };
