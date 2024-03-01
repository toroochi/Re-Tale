import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDgNQ2tqNZS3CkO80FOpkmIFImXE1v-8dk",
    authDomain: "geek-7a11f.firebaseapp.com",
    databaseURL: "https://geek-7a11f-default-rtdb.firebaseio.com",
    projectId: "geek-7a11f",
    storageBucket: "geek-7a11f.appspot.com",
    messagingSenderId: "781971796878",
    appId: "1:781971796878:web:c88408d7052ca605e1eadf",
    measurementId: "G-HRV24FTLRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export const auth = getAuth(app);
export default db;