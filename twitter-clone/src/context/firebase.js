import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyC1UsxjORHhL9LfqNkl_wsTJ2rV3eDSvy0",
    authDomain: "twitter-clone-eb901.firebaseapp.com",
    projectId: "twitter-clone-eb901",
    storageBucket: "twitter-clone-eb901.appspot.com",
    messagingSenderId: "434624553161",
    appId: "1:434624553161:web:25fea1e9cf538e6ad8ad18"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };