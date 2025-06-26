/*******************************************************/
// gmReg_registerScript.mjs
// Written by Idrees Munshi
// Term 2 2025
/*******************************************************/
console.log('%cgmReg_registerScript.mjs running', 'color: blue; background-color: white;');

/*******************************************************/
// Variables
/*******************************************************/

/*******************************************************/
// Constants
/*******************************************************/

// Imports
import {
    fb_authenticate, fb_initialise, fb_readRec,
    fb_updateLoginStatus, fb_writeRec, getAuth,
    fb_updateRec
} from '../fb/fb_io.mjs';

/*******************************************************/
// Main functionality of page
/*******************************************************/
window.setup = () => {
    fb_initialise();
    fb_updateLoginStatus().then((userBoolean) => {
        if (userBoolean === true) {
            fb_readRec('accounts/' + getAuth().currentUser.uid).then((data) => {
                console.log(data);
                if (data !== undefined) {
                    document.getElementById('p_error').innerHTML = 'You are logged in as ' + data.name + '.';
                }
            })
        } else {
            document.getElementById('b_googleLogin').style.display = 'block';
            document.getElementById('b_googleLogin').disabled = false;
        }
    })

}

window.signup = () => {
    fb_authenticate().then(() => {
        // Wait for user to chose Google account
        fb_readRec('accounts/' + getAuth().currentUser.uid).then((data) => {
            // Check if user already has an account
            if (data !== null) {
                document.getElementById('p_error').innerHTML = 'You are logged in as ' + data.name + '.';
                setTimeout(() => {
                    window.location.href = './gmAcc_profile.html';
                }, 3000);
            } else if (data === null || data.termsAndConditions === false) {
                // Run form function
                gmReg_expandForm();
                const auth = getAuth();

                // Default values incase registration is cancelled
                fb_writeRec('accounts/' + auth.currentUser.uid, {
                    email: auth.currentUser.email,
                    name: auth.currentUser.displayName,
                    photoURL: auth.currentUser.photoURL,
                    providerId: auth.currentUser.providerId,
                    metadata: auth.currentUser.metadata,
                    providerData: auth.currentUser.providerData,
                    name: "anonymous",
                    pronouns: "",
                    birthdate: "",
                    password: "",
                    confirmPassword: "",
                    termsAndConditions: false
                })
            }
        })
    })
}

/*******************************************************/
// gmReg_expandForm()
// Called by button on page gmReg_register.html
// Expands form for additional information
// Input: N/A
// Returns: N/A
/*******************************************************/
function gmReg_expandForm() {
    // Hide sign up button and container
    document.getElementById('b_googleLogin').style.display = 'none';
    document.getElementById('s_googleAuthContainer').style.display = 'none';

    // Show form container
    document.getElementById('s_regFormContainer').style.display = 'block';

    // Edit HTML to show the form for additional information
    const formSec = document.getElementById('s_regFormContainer');
    // Create form elements, and append them to the form section
    let form = document.createElement('form');

    // Ask for display name, birthdate, pronouns, password and confirm password and terms and conditions

    // Name
    let nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.id = 'i_name';
    nameInput.required = true;
    nameInput.placeholder = 'Enter your name';
    let nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'i_name');
    nameLabel.innerHTML = 'What would you like to be called?';

    // Birthdate 
    let birthdateInput = document.createElement('input');
    birthdateInput.type = 'date';
    birthdateInput.name = 'birthdate';
    birthdateInput.id = 'i_birthdate';
    birthdateInput.required = true;
    let birthdateLabel = document.createElement('label');
    birthdateLabel.setAttribute('for', 'i_birthdate');
    birthdateLabel.innerHTML = 'When were you born?';

    // Pronouns
    let pronounInput = document.createElement('input');
    pronounInput.type = 'text';
    pronounInput.name = 'pronouns';
    pronounInput.id = 'i_pronouns';
    pronounInput.placeholder = 'Enter your pronouns (not required)';
    let pronounLabel = document.createElement('label');
    pronounLabel.setAttribute('for', 'i_pronouns');
    pronounLabel.innerHTML = 'What pronouns do you identify with?';

    // Password
    let passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordInput.id = 'i_password';
    passwordInput.required = true;
    passwordInput.placeholder = 'Enter your password';
    let passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('for', 'i_password');
    passwordLabel.innerHTML = 'Create a password';

    // Confirm Password
    let confirmPasswordInput = document.createElement('input');
    confirmPasswordInput.type = 'password';
    confirmPasswordInput.name = 'confirmPassword';
    confirmPasswordInput.id = 'i_confirmPassword';
    confirmPasswordInput.required = true;
    confirmPasswordInput.placeholder = 'Confirm your password';
    let confirmPasswordLabel = document.createElement('label');
    confirmPasswordLabel.setAttribute('for', 'i_confirmPassword');
    confirmPasswordLabel.innerHTML = 'Confirm your password';

    // Terms and conditions
    let termsInput = document.createElement('input');
    termsInput.type = 'checkbox';
    termsInput.name = 'terms';
    termsInput.id = 'i_terms';
    let termsLabel = document.createElement('label');
    termsLabel.setAttribute('for', 'i_terms');
    termsLabel.innerHTML = 'I agree to the terms and conditions';
    termsLabel.id = 'tandc';

    // Submit button
    let submitButton = document.createElement('button');
    submitButton.innerHTML = "Let's go!";
    submitButton.id = 'b_submit';
    submitButton.onclick = (event) => {
        event.preventDefault();
        gmReg_submitForm();
    };

    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(birthdateLabel);
    form.appendChild(birthdateInput);
    form.appendChild(pronounLabel);
    form.appendChild(pronounInput);
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    form.appendChild(confirmPasswordLabel);
    form.appendChild(confirmPasswordInput);
    form.appendChild(termsLabel);
    form.appendChild(termsInput);
    form.appendChild(submitButton);
    formSec.appendChild(form);
}

//*******************************************************/
// gmReg_submitForm()
// Called by button on page gmReg_register.html
// Submits form and creates account
// Input: N/A
// Returns: N/A
/*******************************************************/
function gmReg_submitForm() {
    // Get form values
    const name = document.getElementById('i_name').value;
    const birthdate = document.getElementById('i_birthdate').value;
    const pronouns = document.getElementById('i_pronouns').value;
    const password = document.getElementById('i_password').value;
    const confirmPassword = document.getElementById('i_confirmPassword').value;
    const terms = document.getElementById('i_terms').checked;

    // Check if username is blank
    if (name.trim() === '' || name === undefined || name === null) {
        alert('Please enter a name');
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Check if terms and conditions are checked
    if (!terms) {
        alert('You must agree to the terms and conditions');
        return;
    }

    // In future, may use createUserWithEmailAndPassword to create a new user
    // and store their information using the Firebase Authentication API
    // For now, we will store their information using the Firebase Realtime Database API
    const auth = getAuth();
    fb_writeRec('accounts/' + auth.currentUser.uid, {
        email: auth.currentUser.email,
        name: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
        providerId: auth.currentUser.providerId,
        metadata: auth.currentUser.metadata,
        providerData: auth.currentUser.providerData
    })

    fb_updateRec('accounts/' + auth.currentUser.uid, {
        name: name,
        birthdate: birthdate,
        pronouns: pronouns,
        password: password
    })
    window.location.href = './gmAcc_profile.html';
}