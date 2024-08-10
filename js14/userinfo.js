document.addEventListener('DOMContentLoaded', () => {
    const userInfoForm = document.getElementById('userInfoForm');
    const errorsDiv = document.getElementById('errors');
    const exitButton = document.getElementById('exit');

    // Load and display saved data
    const savedUserData = JSON.parse(localStorage.getItem('userInfo') || '{}');
    if (savedUserData) {
        document.getElementById('firstName').value = savedUserData.firstName || '';
        document.getElementById('lastName').value = savedUserData.lastName || '';
        document.getElementById('birthYear').value = savedUserData.birthYear || '';
        document.getElementById('gender').value = savedUserData.gender || '';
        document.getElementById('phone').value = savedUserData.phone || '';
        document.getElementById('skype').value = savedUserData.skype || '';
    }

    userInfoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        errorsDiv.innerHTML = '';

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const birthYear = document.getElementById('birthYear').value;
        const gender = document.getElementById('gender').value;
        const phone = document.getElementById('phone').value.trim();
        const skype = document.getElementById('skype').value.trim();
        let errors = [];

        // Validation for names (both Cyrillic and Latin)
        const namePattern = /^[a-zA-Zа-яА-ЯёЁ]{1,20}$/;

        if (!namePattern.test(firstName)) {
            errors.push('First name must contain only letters (Latin or Cyrillic) and be up to 20 characters long.');
        }

        if (!namePattern.test(lastName)) {
            errors.push('Last name must contain only letters (Latin or Cyrillic) and be up to 20 characters long.');
        }

        // Validation for birth year
        const currentYear = new Date().getFullYear();
        if (birthYear < 1900 || birthYear > currentYear) {
            errors.push('Birth year must be between 1900 and the current year.');
        }

        // Validation for phone number (optional field)
        const phonePattern = /^[\d\s()+-]{10,20}$/;
        if (phone && !phonePattern.test(phone)) {
            errors.push('Phone number must contain 10-12 digits and can include spaces, parentheses, and dashes.');
        }

        // Display errors or save data
        if (errors.length > 0) {
            errors.forEach(error => {
                const errorItem = document.createElement('div');
                errorItem.textContent = error;
                errorsDiv.appendChild(errorItem);
            });
        } else {
            const userInfo = { firstName, lastName, birthYear, gender, phone, skype };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            alert('User information saved successfully.');
        }
    });

    // Exit button functionality
    exitButton.addEventListener('click', () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('user');
        window.location.href = 'registration.html';
    });
});
