document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('checkoutForm');
    const steps = Array.from(form.getElementsByClassName('step'));
    const nextButtons = form.getElementsByClassName('next-step');
    const prevButtons = form.getElementsByClassName('prev-step');
    let currentStep = 0;

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
    }

    function validateStep(step) {
        const inputs = step.querySelectorAll('input, select');
        return Array.from(inputs).every(input => input.checkValidity());
    }

    Array.from(nextButtons).forEach(button => {
        button.addEventListener('click', function() {
            if (validateStep(steps[currentStep])) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    Array.from(prevButtons).forEach(button => {
        button.addEventListener('click', function() {
            currentStep--;
            showStep(currentStep);
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateStep(steps[currentStep])) {
            // Simulate form submission
            alert('Checkout successful! Redirecting to success page...');
            window.location.href = 'success.html';
        }
    });

    showStep(currentStep);
});