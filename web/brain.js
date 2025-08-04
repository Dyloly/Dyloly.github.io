document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('evaluationTable');
    const inputs = table.querySelectorAll('.data-input');
    const totalScoreElement = document.getElementById('totalScore');
    const finalRatingElement = document.getElementById('finalRating');
    const calculateButton = document.getElementById('calculateButton');

    function calculateScore(value, rules) {
        // Handle text-based rules first
        const lowerValue = String(value).toLowerCase().trim();
        for (const rule of rules) {
            if (rule.text && rule.text.toLowerCase().trim() === lowerValue) {
                return rule.points;
            }
        }

        // If not a text rule, try to parse as a number
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            return 0;
        }

        // Handle numerical rules
        for (const rule of rules) {
            if (rule.min !== undefined && rule.max !== undefined) {
                if (numValue >= rule.min && numValue <= rule.max) {
                    return rule.points;
                }
            } else if (rule.min !== undefined) {
                if (numValue >= rule.min) {
                    return rule.points;
                }
            } else if (rule.max !== undefined) {
                if (numValue < rule.max) {
                    return rule.points;
                }
            }
        }
        return 0;
    }

    const scoringRules = {
        'ROE': [
            { min: 15, points: 2 },
            { min: 10, max: 15, points: 1 },
            { max: 10, points: 0 }
        ],
        'ROIC': [
            { min: 12, points: 2 },
            { min: 8, max: 12, points: 1 },
            { max: 8, points: 0 }
        ],
        'Net Profit Margin': [
            { text: 'above industry', points: 2 },
            { text: 'equal to industry', points: 1 },
            { text: 'below industry', points: 0 }
        ],
        'Operating Margin Trend': [
            { text: 'increasing', points: 2 },
            { text: 'stable', points: 1 },
            { text: 'declining', points: 0 }
        ],
        'P/E Ratio': [
            { text: 'below industry', points: 2 },
            { text: 'equal to industry', points: 1 },
            { text: 'above industry', points: 0 }
        ],
        'P/B Ratio': [
            { max: 1.5, points: 2 },
            { min: 1.5, max: 3, points: 1 },
            { min: 3, points: 0 }
        ],
        'EV/EBITDA': [
            { text: 'below industry', points: 2 },
            { text: 'equal to industry', points: 1 },
            { text: 'above industry', points: 0 }
        ],
        'Free Cash Flow Yield': [
            { min: 5, points: 2 },
            { min: 3, max: 5, points: 1 },
            { max: 3, points: 0 }
        ],
        'Debt-to-Equity': [
            { max: 0.5, points: 2 },
            { min: 0.5, max: 1, points: 1 },
            { min: 1, points: 0 }
        ],
        'Current Ratio': [
            { min: 1.5, points: 2 },
            { min: 1, max: 1.5, points: 1 },
            { max: 1, points: 0 }
        ],
        'Interest Coverage Ratio': [
            { min: 5, points: 2 },
            { min: 3, max: 5, points: 1 },
            { max: 3, points: 0 }
        ],
        'Revenue Growth': [
            { min: 10, points: 2 },
            { min: 5, max: 10, points: 1 },
            { max: 5, points: 0 }
        ],
        'EPS Growth': [
            { min: 10, points: 2 },
            { min: 5, max: 10, points: 1 },
            { max: 5, points: 0 }
        ],
        'FCF Growth': [
            { text: 'positive', points: 2 },
            { text: 'flat/negative', points: 0 }
        ],
        'Asset Turnover Ratio': [
            { text: 'above industry', points: 2 },
            { text: 'equal to industry', points: 1 },
            { text: 'below industry', points: 0 }
        ],
        'ROIC > WACC': [
            { text: 'yes', points: 2 },
            { text: 'no', points: 0 }
        ],
        'Share Buybacks': [
            { text: 'consistent buybacks', points: 2 },
            { text: 'no buybacks/dilution', points: 0 }
        ],
        'Dividend Yield': [
            { text: 'above industry', points: 2 },
            { text: 'equal to industry', points: 1 },
            { text: 'below industry', points: 0 }
        ],
        'Payout Ratio': [
            { max: 60, points: 2 },
            { min: 60, max: 80, points: 1 },
            { min: 80, points: 0 }
        ]
    };

    function getFinalRating(score) {
        if (score >= 35) return 'Stiprus pirkimas (Puikūs pagrindai, neįvertinta)';
        if (score >= 25) return 'Vidutinis pirkimas (Geri, bet patikrinkite rizikas)';
        if (score >= 15) return 'Neutralu/Laikyti (Vidutinis, reikia stebėti)';
        return 'Vengti/Parduoti (Silpni pagrindai arba pervertinta)';
    }

    function updateTable() {
        let totalScore = 0;
        inputs.forEach(input => {
            const row = input.closest('tr');
            const pointsCell = row.querySelector('.points');
            const criteria = input.getAttribute('data-value');
            const rules = scoringRules[criteria];
            let score = 0;

            if (rules) {
                // Remove '%' sign from input value if it exists for numerical calculations
                const inputValue = input.value.replace('%', '').trim();
                score = calculateScore(inputValue, rules);
            }

            pointsCell.textContent = score;
            totalScore += score;
        });

        totalScoreElement.textContent = totalScore;
        finalRatingElement.textContent = getFinalRating(totalScore);
    }

    // Attach the event listener to the button
    calculateButton.addEventListener('click', updateTable);
});