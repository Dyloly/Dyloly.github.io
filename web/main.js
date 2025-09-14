import { auth } from './firebase.js';

// Get Started mygtuko logika (priklauso nuo prisijungimo būsenos)
const getStartedBtn = document.getElementById('getStartedBtn');

auth.onAuthStateChanged(user => {
    if (user) {
        // Vartotojas yra prisijungęs. Nukreipiame į skaičiuoklę.
        getStartedBtn.href = './calculator.html';
        getStartedBtn.textContent = 'Go to Calculator';
    } else {
        // Vartotojas neprisijungęs. Nukreipiame į registracijos puslapį.
        getStartedBtn.href = './registration.html';
        getStartedBtn.textContent = 'Get Started';
    }
});

// Apatinio mygtuko logika (nuolat nukreipia į skaičiuoklę)
const calculateLink = document.querySelector('.feature-card .btn-secondary');
if (calculateLink) {
    calculateLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'calculator.html';
    });
}