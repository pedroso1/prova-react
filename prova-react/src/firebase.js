import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAQWjsV4b9ONIu_kX_l0VPaed1mrWzSZ7o",
    authDomain: "prova-react-eb5dc.firebaseapp.com",
    projectId: "prova-react-eb5dc",
    storageBucket: "prova-react-eb5dc.firebasestorage.app",
    messagingSenderId: "104170348531",
    appId: "1:104170348531:web:60706c01a86304a78bfc86"
  };

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)