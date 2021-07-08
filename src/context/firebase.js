import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD2EEXljYRg9GtLhqDQ21ZS5Bg76sZLAqI",
  authDomain: "linkedin-clone-246e7.firebaseapp.com",
  projectId: "linkedin-clone-246e7",
  storageBucket: "linkedin-clone-246e7.appspot.com",
  messagingSenderId: "908805068969",
  appId: "1:908805068969:web:2d3f2ee95a471b06cc71b8",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
