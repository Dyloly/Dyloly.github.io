document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('evaluationTable');
    const inputs = table.querySelectorAll('.data-input');
    const totalScoreElement = document.getElementById('totalScore');

    function calculateTotalScore() {
        let totalScore = 0;
        inputs.forEach(input => {
            const row = input.closest('tr');
            const pointsCell = row.querySelector('.points');
            
            // Check if the input value is a number or a specific character
            const value = input.value.trim();
            const pointsForThisRow = parseInt(input.getAttribute('data-points'), 10);
            let score = 0;

            if (value !== '') {
                // Here you can add your custom logic to award points based on the input value
                // For a simple version, we'll just check if the input is not empty
                // You can expand this logic for more complex scoring
                
                // Example: If a specific value is entered, assign points
                if (pointsForThisRow > 0) {
                     score = pointsForThisRow;
                } else {
                     // Default to 0 if no specific points are assigned for non-empty value
                     score = 0;
                }

                // A specific logic for P/B Ratio based on the provided image
                if (input.dataset.value === 'P/B Ratio') {
                    const pbValue = parseFloat(value);
                    if (!isNaN(pbValue) && pbValue <= 2.58) {
                        score = 1; // Assuming 1 point for a value <= 2.58 based on the image
                    } else {
                        score = 0;
                    }
                }
                
                // Add more complex logic here for other rows if needed, e.g.:
                // if (input.dataset.value === 'ROE') { ... }
                // if (input.dataset.value === 'Revenue Growth') { ... }

            }

            pointsCell.textContent = score;
            totalScore += score;
        });

        totalScoreElement.textContent = totalScore;
    }

    inputs.forEach(input => {
        input.addEventListener('input', calculateTotalScore);
    });

    // Initial calculation on page load
    calculateTotalScore();
});