// Importuojame reikalingas funkcijas iš Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Jūsų Firebase projekto konfigūracija
const firebaseConfig = {
    apiKey: "AIzaSyBZOcT0FIzPaYCiWYFnzq8EZMIK4yXWZeI",
    authDomain: "website-4f8c9.firebaseapp.com",
    projectId: "website-4f8c9",
    storageBucket: "website-4f8c9.firebasestorage.app",
    messagingSenderId: "61834251472",
    appId: "1:61834251472:web:7432973223a9415feda2d5",
    measurementId: "G-7F0ZSRLP7E"
};

// Inicializuojame Firebase aplikaciją
const app = initializeApp(firebaseConfig);

// Eksportuojame autentifikavimo modulį
export const auth = getAuth(app);