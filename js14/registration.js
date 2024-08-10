document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const errorsDiv = document.getElementById('errors');

    // Check if user data already exists
    if (localStorage.getItem('user') && window.location.pathname.endsWith('registration.html')) {
        window.location.href = 'userinfo.html'; // Redirect to user info page
    }

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        errorsDiv.innerHTML = '';

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        let errors = [];

        // Email validation
        const emailPattern = /^[a-zA-Z0-9._-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            errors.push('Invalid email format.');
        }

        // Password validation
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        if (!passwordPattern.test(password)) {
            errors.push('Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one number.');
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            errors.push('Passwords do not match.');
        }

        // Display errors or save data
        if (errors.length > 0) {
            errors.forEach(error => {
                const errorItem = document.createElement('div');
                errorItem.textContent = error;
                errorsDiv.appendChild(errorItem);
            });
        } else {
            const userData = { email, password };
            localStorage.setItem('user', JSON.stringify(userData));
            window.location.href = 'userinfo.html'; // Redirect to user info page
        }
    });
});
