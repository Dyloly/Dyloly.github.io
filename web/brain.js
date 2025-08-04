document.addEventListener('DOMContentLoaded', function() {
    // This is the function that will be called when the "Calculate Score" button is clicked.
    // It is placed here to be in the correct scope.
    window.calculate = function() {
        let total = 0;

        // Helper function to get value, score it, update the UI, and add to total
        const processScore = (id, scoreFunction, type = 'number') => {
            let value;
            const inputElement = document.getElementById(id);

            if (!inputElement) {
                console.error(`Input element with ID '${id}' not found.`);
                return;
            }

            if (type === 'number') {
                value = parseFloat(inputElement.value);
                if (isNaN(value)) value = null; // Treat non-numbers as null
            } else {
                value = inputElement.value.trim().toLowerCase();
                if (value === "") value = null; // Treat empty strings as null
            }
            
            const points = scoreFunction(value);
            const pointsElement = document.getElementById(id + "Points");
            if (pointsElement) {
                pointsElement.textContent = points;
            }
            total += points;
        };

        // --- PROFITABILITY SCORING ---
        processScore("roe", (val) => {
            if (val === null) return 0;
            if (val >= 15) return 2;
            if (val >= 10) return 1;
            return 0;
        });

        processScore("roic", (val) => {
            if (val === null) return 0;
            if (val >= 12) return 2;
            if (val >= 8) return 1;
            return 0;
        });

        processScore("npm", (val) => {
            if (val === null) return 0;
            if (val.includes("above")) return 2;
            if (val.includes("equal")) return 1;
            return 0;
        }, 'text');

        processScore("omt", (val) => {
            if (val === null) return 0;
            if (val.includes("increasing")) return 2;
            if (val.includes("stable")) return 1;
            return 0;
        }, 'text');

        // --- VALUATION SCORING ---
        processScore("pe", (val) => {
            if (val === null) return 0;
            if (val.includes("below")) return 2;
            if (val.includes("equal")) return 1;
            return 0;
        }, 'text');

        processScore("pb", (val) => {
            if (val === null) return 0;
            if (val < 1.5) return 2;
            if (val >= 1.5 && val <= 3) return 1;
            return 0;
        });

        processScore("ev", (val) => {
            if (val === null) return 0;
            if (val.includes("below")) return 2;
            if (val.includes("equal")) return 1;
            return 0;
        }, 'text');

        processScore("fcfy", (val) => {
            if (val === null) return 0;
            if (val >= 5) return 2;
            if (val >= 3) return 1;
            return 0;
        });

        // --- FINANCIAL HEALTH SCORING ---
        processScore("de", (val) => {
            if (val === null) return 0;
            if (val < 0.5) return 2;
            if (val >= 0.5 && val <= 1) return 1;
            return 0;
        });

        processScore("cr", (val) => {
            if (val === null) return 0;
            if (val >= 1.5) return 2;
            if (val >= 1) return 1;
            return 0;
        });

        processScore("icr", (val) => {
            if (val === null) return 0;
            if (val >= 5) return 2;
            if (val >= 3) return 1;
            return 0;
        });

        // --- GROWTH SCORING ---
        processScore("rev", (val) => {
            if (val === null) return 0;
            if (val >= 10) return 2;
            if (val >= 5) return 1;
            return 0;
        });

        processScore("eps", (val) => {
            if (val === null) return 0;
            if (val >= 10) return 2;
            if (val >= 5) return 1;
            return 0;
        });

        processScore("fcfg", (val) => {
            if (val === null) return 0;
            return val.includes("positive") ? 2 : 0;
        }, 'text');

        // --- EFFICIENCY & MANAGEMENT SCORING ---
        processScore("ato", (val) => {
            if (val === null) return 0;
            if (val.includes("above")) return 2;
            if (val.includes("equal")) return 1;
            return 0;
        }, 'text');

        processScore("rw", (val) => {
            if (val === null) return 0;
            return val.includes("yes") ? 2 : 0;
        }, 'text');

        processScore("buybacks", (val) => {
            if (val === null) return 0;
            return val.includes("consistent") ? 2 : 0;
        }, 'text');

        // --- DIVIDENDS SCORING ---
        processScore("dy", (val) => {
            if (val === null) return 0;
            if (val.includes("above")) return 2;
            if (val.includes("equal")) return 1;
            return 0;
        }, 'text');

        processScore("pr", (val) => {
            if (val === null) return 0;
            if (val < 60) return 2;
            if (val >= 60 && val <= 80) return 1;
            return 0;
        });

        // --- FINAL OUTPUT ---
        document.getElementById("totalPoints").textContent = total;
        updateRating(total);
    };

    // Function to update the final rating text
    function updateRating(totalScore) {
        let ratingText = '';
        let color = '';

        if (totalScore >= 35) {
            ratingText = "Strong Buy (Excellent fundamentals, undervalued)";
            color = "#28a745"; // Green
        } else if (totalScore >= 25) {
            ratingText = "Moderate Buy (Good but check risks)";
            color = "#ffc107"; // Yellow
        } else if (totalScore >= 15) {
            ratingText = "Neutral/Hold (Average, needs monitoring)";
            color = "#6c757d"; // Gray
        } else {
            ratingText = "Avoid/Sell (Weak fundamentals or overvalued)";
            color = "#dc3545"; // Red
        }

        const ratingElement = document.getElementById('ratingText');
        ratingElement.textContent = `Total Score: ${totalScore}. ${ratingText}`;
        ratingElement.style.color = color;
    }

    // Add event listeners to all input fields for real-time scoring
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', calculate);
    });
    calculate();
});