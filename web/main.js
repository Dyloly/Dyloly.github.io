document.addEventListener('DOMContentLoaded', function() {
    const calculateLink = document.querySelector('.feature-card .btn-secondary');
    if (calculateLink) {
        calculateLink.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = 'calculator.html';
        });
    }
});