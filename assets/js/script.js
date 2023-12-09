
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
let name;

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
            console.log(user);
            // isUserLoggedIn = true;

            // submit the form
            signUpForm.submit();

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

    signInForm.addEventListener('submit', e => {
        e.preventDefault();
        validateSignInInputs();
    });

    // ...
    // const validateSignInInputs = () => {
    //     const signInEmailValue = signInEmail.value.trim();
    //     const signInPasswordValue = signInPassword.value.trim();

    //     if (signInEmailValue === '') {
    //         setError(signInEmail, 'Email is required');
    //     } else if (!isValidEmail(signInEmailValue)) {
    //         setError(signInEmail, 'Provide a valid Email address');
    //     }
    //     if (signInPasswordValue === '') {
    //         setError(signInPassword, 'Password is required');
    //     }

    //     // Fetching data from local storage
    //     const storedUserData = localStorage.getItem("user");
    //     const storedUser = storedUserData ? JSON.parse(storedUserData) : null;

    //     if (!storedUser || !storedUser.email) {
    //         setError(signInEmail, 'No user or email found in storage');
    //     } else if (!storedUser.password) {
    //         setError(signInPassword, 'No password found in storage');
    //     }
        
    //     const email = storedUser.email;
    //     const password = storedUser.password;


    //     if (signInEmailValue != email) {
    //         setError(signInEmail, 'Email doesnt exist!!!!');
    //     } else {
    //         setSuccess(signInEmail);
    //     }
    //     if (signInPasswordValue.length < 8) {
    //         setError(signInPassword, 'Password must be at least 8 character.')
    //     } else if (signInPasswordValue != password) {
    //         setError(signInPassword, 'Incorrect Password')
    //     } else {
    //         setSuccess(signInPassword);
    //     }

    //     if (document.querySelectorAll('.success').length === 2) {

    //         // submit the form
    //         signInForm.submit();
    //     }
    // };

    const validateSignInInputs = () => {
        const signInEmailValue = signInEmail.value.trim();
        const signInPasswordValue = signInPassword.value.trim();
    
        const storedUserData = localStorage.getItem("user");
        const storedUser = storedUserData ? JSON.parse(storedUserData) : null;
    
        if (signInEmailValue === '') {
            setError(signInEmail, 'Email is required');
        } else if (!isValidEmail(signInEmailValue)) {
            setError(signInEmail, 'Provide a valid Email address');
        } else if (storedUser && signInEmailValue !== storedUser.email) {
            setError(signInEmail, 'Email does not exist');
        } else {
            setSuccess(signInEmail);
        }
    
        if (signInPasswordValue === '') {
            setError(signInPassword, 'Password is required');
        } else if (signInPasswordValue.length < 8) {
            setError(signInPassword, 'Password must be at least 8 characters');
        } else if (storedUser && signInPasswordValue !== storedUser.password) {
            setError(signInPassword, 'Incorrect Password');
        } else {
            setSuccess(signInPassword);
        }
    
        if (document.querySelectorAll('.success').length === 2) {
            // User successfully logged in
            // isUserLoggedIn = true;
            signInForm.submit();        }
    };
    
    
    
    
    
    
}




// Call the setup functions when the page loads
document.addEventListener('DOMContentLoaded', function () {
    setupSignUpValidation();
    setupSignInValidation();
});

// User Fetching

// JavaScript for toggling navigation on smaller screens
// const hamburgerMenu = document.querySelector('.hamburger-menu');
// const navLinks = document.querySelector('.nav-links');

// hamburgerMenu.addEventListener('click', () => {
//     navLinks.classList.toggle('nav-active');
//     console.log('click');
// });

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

