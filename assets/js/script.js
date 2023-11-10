
// ----------------- Sign In and Sign Up Validation ----------------------------//

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

// Local Storage
let user;
let isUserLoggedIn = false;

// validation
function setupSignUpValidation() {
    const signUpForm = document.getElementById('signup-form');
    const signUpUsername = document.getElementById('signUpUsername');
    const signUpEmail = document.getElementById('signUpEmail');
    const signUpPassword = document.getElementById('signUpPassword');
    const signUpPassword2 = document.getElementById('signUpPassword2');

    if (!signUpForm) {
        return; // The sign-up form doesn't exist on this page, so exit the function
    }

    // Rest of your sign-up validation code here
    signUpForm.addEventListener('submit', e => {
        e.preventDefault();
        validateSignUpInputs();
    });

    // ...
    const validateSignUpInputs = () => {
        const signUpUsernameValue = signUpUsername.value.trim();
        const signUpEmailValue = signUpEmail.value.trim();
        const signUpPasswordValue = signUpPassword.value.trim();
        const signUpPassword2Value = signUpPassword2.value.trim();

        if (signUpUsernameValue === '') {
            setError(signUpUsername, 'Username is required');
        } else {
            setSuccess(signUpUsername);
        }

        if (signUpEmailValue === '') {
            setError(signUpEmail, 'Email is required');
        } else if (!isValidEmail(signUpEmailValue)) {
            setError(signUpEmail, 'Provide a valid Email address');
        } else {
            setSuccess(signUpEmail);
        }

        if (signUpPasswordValue === '') {
            setError(signUpPassword, 'Password is required');
        } else if (signUpPasswordValue.length < 8) {
            setError(signUpPassword, 'Password must be at least 8 character.')
        } else {
            setSuccess(signUpPassword);
        }

        if (signUpPassword2Value === '') {
            setError(signUpPassword2, 'Please confirm your Password');

        } else if (signUpPassword2Value !== signUpPasswordValue) {
            setError(signUpPassword2, "Passwords doesn't match");
        } else {
            setSuccess(signUpPassword2);
        }

        if (document.querySelectorAll('.success').length === 4) {

            user = {
                email: signUpEmailValue,
                password: signUpPasswordValue,
                username: signUpUsernameValue,
            };
            
            localStorage.setItem("user", JSON.stringify(user));
            isUserLoggedIn = true;
            
            // submit the form
            // signUpForm.submit();

        }
    };
}



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
        const signInPasswordValue = signInPassword.value.trim();

        // Fetching data from local storage
        const storedUserData = localStorage.getItem("user"); // Retrieve the user data as a string from local storage
        const storedUser = JSON.parse(storedUserData); // Parse the string into a JavaScript object
        const username = storedUser.username;
        const email = storedUser.email;
        const password = storedUser.password;

        if (signInEmailValue === '') {
            setError(signInEmail, 'Email is required');
        } else if (!isValidEmail(signInEmailValue)) {
            setError(signInEmail, 'Provide a valid Email address');
        }else if(signInEmailValue!=email){
            setError(signInEmail, 'Email doesnt exist!!!!');
        } else {
            setSuccess(signInEmail);
        }

        if (signInPasswordValue === '') {
            setError(signInPassword, 'Password is required');
        } else if (signInPasswordValue.length < 8) {
            setError(signInPassword, 'Password must be at least 8 character.')
        }else if(signInPasswordValue!=password){
            setError(signInPassword, 'Incorrect Password')
        } else {
            setSuccess(signInPassword);
        }

        if (document.querySelectorAll('.success').length === 2) {
            
            isUserLoggedIn = true;
            // submit the form
            // signInForm.submit();
        }
    };
}




// Call the setup functions when the page loads
document.addEventListener('DOMContentLoaded', function () {
    setupSignUpValidation();
    setupSignInValidation();
    if (isUserLoggedIn) {
        // The user is logged in
        console.log('User is logged in');
        // You can perform actions for a logged-in user here.
    } else {
        // The user is not logged in
        console.log('User is not logged in');
        // You can perform actions for a user who is not logged in here.
    }
    
    
});


//  BACK TO TOP ACTION //
window.addEventListener('scroll', function () {
    var button = document.getElementById('backToTopButton');
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        button.style.display = 'block';
    } else {
        button.style.display = 'none';
    }
});

document.getElementById('backToTopButton').addEventListener('click', function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

