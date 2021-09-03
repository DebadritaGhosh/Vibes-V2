import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBHcjb04kjyR2aIxUWFV09bJZcHgan2Xpw",
    authDomain: "vibes-643b9.firebaseapp.com",
    projectId: "vibes-643b9",
    storageBucket: "vibes-643b9.appspot.com",
    messagingSenderId: "183394632704",
    appId: "1:183394632704:web:9a08add77de3e902e3c4e5",
    measurementId: "G-WCBP93H2NR"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleProvider };
export default db;