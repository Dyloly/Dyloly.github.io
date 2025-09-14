import { auth } from 'firebase.js';

const registrationForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');

// Vartotojo registracijos logika
if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = registrationForm['reg-email'].value;
        const password = registrationForm['reg-password'].value;

        // Patikrinimas, ar slaptažodis ilgesnis nei 6 simboliai
        if (password.length < 6) {
            alert('Slaptažodis turi būti bent 6 simbolių ilgio.');
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then((cred) => {
                // Vartotojas sėkmingai užsiregistravo
                console.log('Vartotojas sėkmingai užsiregistravo:', cred.user);
                alert('Jūsų paskyra sėkmingai sukurta! Galite prisijungti.');
                registrationForm.reset();
                window.location.href = 'login.html';
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

        auth.signInWithEmailAndPassword(email, password)
            .then((cred) => {
                // Vartotojas sėkmingai prisijungė
                console.log('Vartotojas sėkmingai prisijungė:', cred.user);
                alert('Prisijungimas sėkmingas!');
                loginForm.reset();
                // Nukreipiame vartotoją į skaičiuoklės puslapį po prisijungimo
                window.location.href = 'calculator.html'; 
            })
            .catch((err) => {
                console.error('Prisijungimo klaida:', err.message);
                alert('Prisijungimo klaida: ' + err.message);
            });
    });
}