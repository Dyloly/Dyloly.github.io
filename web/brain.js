document.addEventListener('DOMContentLoaded', function() {
    let history = [];
    const MAX_HISTORY_ITEMS = 10;

    // Funkcija, kuri įkelia istoriją iš sesijos saugyklos (sessionStorage)
    function loadHistory() {
        const storedHistory = sessionStorage.getItem('calculationHistory');
        if (storedHistory) {
            try {
                history = JSON.parse(storedHistory);
            } catch (e) {
                console.error("Failed to parse history from sessionStorage", e);
                history = [];
            }
        }
        displayHistory();
    }

    // Funkcija, kuri atnaujina įvertinimo tekstą ir spalvą
    function updateRating(totalScore) {
        const ratingElement = document.getElementById('ratingText');
        if (!ratingElement) return '';

        let ratingText = '';
        let color = '';

        if (totalScore >= 35) {
            ratingText = "Strong Buy (Excellent fundamentals, undervalued)";
            color = "#28a745";
        } else if (totalScore >= 25) {
            ratingText = "Moderate Buy (Good but check risks)";
            color = "#ffc107";
        } else if (totalScore >= 15) {
            ratingText = "Neutral/Hold (Average, needs monitoring)";
            color = "#6c757d";
        } else {
            ratingText = "Avoid/Sell (Weak fundamentals or overvalued)";
            color = "#dc3545";
        }

        ratingElement.textContent = `Total Score: ${totalScore}. ${ratingText}`;
        ratingElement.style.color = color;
        return ratingText;
    }

    // Funkcija, kuri atvaizduoja istoriją lentelėje
    function displayHistory() {
        const historyBody = document.querySelector('#history-table tbody');
        if (!historyBody) return;

        historyBody.innerHTML = '';

        const recentHistory = history.slice(-MAX_HISTORY_ITEMS);
        
        recentHistory.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.score}</td>
                <td>${item.result}</td>
            `;
            historyBody.appendChild(row);
        });
    }

    // Funkcija, kuri išsaugo istoriją į sesijos saugyklą
    function saveHistory() {
        sessionStorage.setItem('calculationHistory', JSON.stringify(history));
    }

    // Pagrindinė skaičiavimo funkcija, kuri iškviečiama paspaudus mygtuką
    window.calculate = function() {
        let total = 0;

        const getScore = (id, scoreFunction, type = 'number') => {
            const inputElement = document.getElementById(id);
            if (!inputElement) return 0;

            let value;
            if (type === 'number') {
                value = parseFloat(inputElement.value);
                if (isNaN(value)) return 0;
            } else { // Ši dalis dabar apdoroja ir 'input' tipo 'text' laukelius, ir 'select' laukelius
                value = inputElement.value.trim().toLowerCase();
                if (value === "") return 0;
            }

            return scoreFunction(value);
        };

        total += getScore("roe", (val) => (val >= 15 ? 2 : (val >= 10 ? 1 : 0)));
        total += getScore("roic", (val) => (val >= 12 ? 2 : (val >= 8 ? 1 : 0)));
        total += getScore("npm", (val) => (val.includes("above") ? 2 : (val.includes("equal") ? 1 : 0)), 'text');
        total += getScore("omt", (val) => (val.includes("increasing") ? 2 : (val.includes("stable") ? 1 : 0)), 'text');
        total += getScore("pe", (val) => (val.includes("below") ? 2 : (val.includes("equal") ? 1 : 0)), 'text');
        total += getScore("pb", (val) => (val < 1.5 ? 2 : (val >= 1.5 && val <= 3 ? 1 : 0)));
        total += getScore("ev", (val) => (val.includes("below") ? 2 : (val.includes("equal") ? 1 : 0)), 'text');
        total += getScore("fcfy", (val) => (val >= 5 ? 2 : (val >= 3 ? 1 : 0)));
        total += getScore("de", (val) => (val < 0.5 ? 2 : (val >= 0.5 && val <= 1 ? 1 : 0)));
        total += getScore("cr", (val) => (val >= 1.5 ? 2 : (val >= 1 ? 1 : 0)));
        total += getScore("icr", (val) => (val >= 5 ? 2 : (val >= 3 ? 1 : 0)));
        total += getScore("rev", (val) => (val >= 10 ? 2 : (val >= 5 ? 1 : 0)));
        total += getScore("eps", (val) => (val >= 10 ? 2 : (val >= 5 ? 1 : 0)));
        total += getScore("fcfg", (val) => (val.includes("positive") ? 2 : 0), 'text');
        total += getScore("ato", (val) => (val.includes("above") ? 2 : (val.includes("equal") ? 1 : 0)), 'text');
        total += getScore("rw", (val) => (val.includes("yes") ? 2 : 0), 'text');
        total += getScore("buybacks", (val) => (val.includes("consistent") ? 2 : 0), 'text');
        total += getScore("dy", (val) => (val.includes("above") ? 2 : (val.includes("equal") ? 1 : 0)), 'text');
        total += getScore("pr", (val) => (val < 60 ? 2 : (val >= 60 && val <= 80 ? 1 : 0)));

        document.getElementById("totalPoints").textContent = total;
        const ratingText = updateRating(total);

        const companyNameInput = document.getElementById('company-name-input');
        const companyName = companyNameInput ? companyNameInput.value || 'Unnamed Company' : 'Unnamed Company';
        
        const newEntry = {
            name: companyName,
            score: total,
            result: ratingText
        };

        history.push(newEntry);
        
        if (history.length > MAX_HISTORY_ITEMS) {
            history.shift();
        }
        
        displayHistory();
        saveHistory();
    };

    // Funkcija, kuri atnaujina individualius taškus realiuoju laiku
    function updateIndividualPoints() {
        const processScoreRealtime = (id, scoreFunction, type = 'number') => {
            const inputElement = document.getElementById(id);
            const pointsElement = document.getElementById(id + "Points");
            if (!inputElement || !pointsElement) return;

            let value;
            if (type === 'number') {
                value = parseFloat(inputElement.value);
                if (isNaN(value)) value = null;
            } else {
                value = inputElement.value.trim().toLowerCase();
                if (value === "") value = null;
            }

            const points = (value !== null) ? scoreFunction(value) : 0;
            pointsElement.textContent = points;
        };

        processScoreRealtime("roe", (val) => (val >= 15 ? 2 : (val >= 10 ? 1 : 0)));
        processScoreRealtime("roic", (val) => (val >= 12 ? 2 : (val >= 8 ? 1 : 0)));
        processScoreRealtime("npm", (val) => (val.includes("above") ? 2 : (val.includes("equal") ? 1 : 0)), 'text');
        processScoreRealtime("omt", (val) => (val.includes("increasing") ? 2 : (val.includes("stable") ? 1 : 0)), 'text');
        processScoreRealtime("pe", (val) => (val.includes("below") ? 2 : (val.includes("equal") ? 1 : 0)), 'text');
        processScoreRealtime("pb", (val) => (val < 1.5 ? 2 : (val >= 1.5 && val <= 3 ? 1 : 0)));
        processScoreRealtime("ev", (val) => (val.includes("below") ? 2 : (val.includes("equal") ? 1 : 0)), 'text');
        processScoreRealtime("fcfy", (val) => (val >= 5 ? 2 : (val >= 3 ? 1 : 0)));
        processScoreRealtime("de", (val) => (val < 0.5 ? 2 : (val >= 0.5 && val <= 1 ? 1 : 0)));
        processScoreRealtime("cr", (val) => (val >= 1.5 ? 2 : (val >= 1 ? 1 : 0)));
        processScoreRealtime("icr", (val) => (val >= 5 ? 2 : (val >= 3 ? 1 : 0)));
        processScoreRealtime("rev", (val) => (val >= 10 ? 2 : (val >= 5 ? 1 : 0)));
        processScoreRealtime("eps", (val) => (val >= 10 ? 2 : (val >= 5 ? 1 : 0)));
        processScoreRealtime("fcfg", (val) => (val.includes("positive") ? 2 : 0), 'text');
        processScoreRealtime("ato", (val) => (val.includes("above") ? 2 : (val.includes("equal") ? 1 : 0)), 'text');
        processScoreRealtime("rw", (val) => (val.includes("yes") ? 2 : 0), 'text');
        processScoreRealtime("buybacks", (val) => (val.includes("consistent") ? 2 : 0), 'text');
        processScoreRealtime("dy", (val) => (val.includes("above") ? 2 : (val.includes("equal") ? 1 : 0)), 'text');
        processScoreRealtime("pr", (val) => (val < 60 ? 2 : (val >= 60 && val <= 80 ? 1 : 0)));
    }

    // Įvykių klausymasis 'input' ir 'select' elementams, atnaujinantis balus realiuoju laiku
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', updateIndividualPoints);
    });
    
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.addEventListener('change', updateIndividualPoints);
    });

    const calculateButton = document.querySelector('#scoreForm button');
    if (calculateButton) {
        calculateButton.addEventListener('click', calculate);
    }
    
    // Nustatymai, kurie paleidžiami įkėlus puslapį
    updateIndividualPoints();
    document.getElementById("totalPoints").textContent = 0;
    document.getElementById("ratingText").textContent = '';

    // Įkeliame istoriją iš sesijos saugyklos
    loadHistory();
});