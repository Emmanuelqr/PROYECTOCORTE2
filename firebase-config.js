import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyAhH_DOPKnkDIbwRpRQUQPssTsiaGq4PK4",
    authDomain: "login-543ba.firebaseapp.com",
    projectId: "login-543ba",
    storageBucket: "login-543ba.firebasestorage.app",
    messagingSenderId: "1028458134630",
    appId: "1:1028458134630:web:e62058a92968c29680c1a7",
    measurementId: "G-D3D2H9XPQ7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
