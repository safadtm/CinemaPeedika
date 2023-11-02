const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}



// Wrap your JavaScript code in a function
function setupSignInValidation() {
    const signInForm = document.getElementById('signIn-form');
    const signInEmail = document.getElementById('signInEmail');
    const signInPassword = document.getElementById('signInPassword');

    if (!signInForm) {
        return; // The sign-in form doesn't exist on this page, so exit the function
    }

    // Rest of your sign-in validation code here
    signInForm.addEventListener('submit', e => {
        e.preventDefault();
        validateSignInInputs();
    });

    // ...
    const validateSignInInputs = () => {
        const signInEmailValue = signInEmail.value.trim();
        // const signUpEmailValue = signUpEmail.value.trim();
        const signInPasswordValue = signInPassword.value.trim();
        // const signUpPasswordValue = signUpPassword.value.trim();

        if (signInEmailValue === '') {
            setError(signInEmail, 'Email is required');
        } else if (!isValidEmail(signInEmailValue)) {
            setError(signInEmail, 'Provide a valid Email address');
        } else {
            setSuccess(signInEmail);
        }

        if (signInPasswordValue === '') {
            setError(signInPassword, 'Password is required');
        } else if (signInPasswordValue.length < 8) {
            setError(signInPassword, 'Password must be at least 8 character.')
        } else {
            setSuccess(signInPassword);
        }


        if (document.querySelectorAll('.success').length === 2) {
            // submit the form
            signInForm.submit();
        }
    };
}




// Call the setup functions when the page loads
document.addEventListener('DOMContentLoaded', function () {
    setupSignInValidation();
});
