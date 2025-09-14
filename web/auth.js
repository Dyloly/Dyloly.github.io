// Importuojame reikalingas funkcijas iš Firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { auth } from './firebase.js'; // Importuojame iš jūsų firebase.js failo

const registrationForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');

// Vartotojo registracijos logika
if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = registrationForm['reg-email'].value;
        const password = registrationForm['reg-password'].value;

        if (password.length < 6) {
            alert('Slaptažodis turi būti bent 6 simbolių ilgio.');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                console.log('Vartotojas sėkmingai užsiregistravo:', cred.user);
                alert('Jūsų paskyra sėkmingai sukurta! Jūs esate prisijungę.');
                registrationForm.reset();
                window.location.href = 'index.html';
            })
            .catch((err) => {
                console.error('Registracijos klaida:', err.message);
                alert('Registracijos klaida: ' + err.message);
            });
    });
}

// Vartotojo prisijungimo logika
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;

        signInWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                console.log('Vartotojas sėkmingai prisijungė:', cred.user);
                alert('Prisijungimas sėkmingas! Vykstama į paskyrą.');
                loginForm.reset();
                window.location.href = 'calculator.html'; 
            })
            .catch((err) => {
                console.error('Prisijungimo klaida:', err.message);
                alert('Prisijungimo klaida: ' + err.message);
            });
    });
}