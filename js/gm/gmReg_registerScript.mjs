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
    fb_authenticate, fb_initialise, fb_readRec, fb_updateLoginStatus, fb_writeRec, getAuth
} from '../fb/fb_io.mjs';

/*******************************************************/
// Main functionality of page
/*******************************************************/
window.setup = () => {
    fb_initialise();
    fb_updateLoginStatus().then((userBoolean) => {
        if (userBoolean) {
            fb_readRec('accounts/' + getAuth().currentUser.uid).then((data) => {
                if (data !== null) {
                    document.getElementById('p_error').innerHTML = 'You already have an account! You are logged in as ' + data.name + '.';
                    document.getElementById('b_googleLogin').disabled = true;
                } else {
                    document.getElementById('b_googleLogin').style.display = 'block';
                    document.getElementById('b_googleLogin').disabled = false;
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
        console.log('User authenticated');
        // Wait for user to chose Google account
        fb_readRec('accounts/' + getAuth().currentUser.uid).then((data) => {
            // Check if user already has an account
            if (data !== null) {
                document.getElementById('p_error').innerHTML = 'You already have an account! You are logged in as ' + data.name + '.';
                setTimeout(() => {
                    Window.location.href = './gmAcc_profile.html';
                }, 3000);
            } else if (data === null) {
                const auth = getAuth();
                // If user doesn't have an account, create one
                fb_writeRec('accounts/' + auth.currentUser.uid, {
                    email: auth.currentUser.email,
                    name: auth.currentUser.displayName,
                    photoURL: auth.currentUser.photoURL,
                    providerId: auth.currentUser.providerId,
                    metadata: auth.currentUser.metadata,
                    providerData: auth.currentUser.providerData
                })
                // Run form function
                gmReg_expandForm();
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

    // Ask for display name, age, pronouns, password and confirm password and terms and conditions

    // Name
    let nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.id = 'i_name';
    nameInput.placeholder = 'Enter your name';
    let nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'i_name');
    nameLabel.innerHTML = 'What would you like to be called?';

    // Age 
    let ageInput = document.createElement('input');
    ageInput.type = 'number';
    ageInput.name = 'age';
    ageInput.id = 'i_age';
    ageInput.placeholder = 'Enter your age';
    let ageLabel = document.createElement('label');
    ageLabel.setAttribute('for', 'i_age');
    ageLabel.innerHTML = 'How old are you?';

    // Pronouns
    let pronounInput = document.createElement('input');
    pronounInput.type = 'text';
    pronounInput.name = 'pronouns';
    pronounInput.id = 'i_pronouns';
    pronounInput.placeholder = 'Enter your pronouns';
    let pronounLabel = document.createElement('label');
    pronounLabel.setAttribute('for', 'i_pronouns');
    pronounLabel.innerHTML = 'What pronouns do you identify with?';

    // Password
    let passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordInput.id = 'i_password';
    passwordInput.placeholder = 'Enter your password';
    let passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('for', 'i_password');
    passwordLabel.innerHTML = 'Create a password';

    // Confirm Password
    let confirmPasswordInput = document.createElement('input');
    confirmPasswordInput.type = 'password';
    confirmPasswordInput.name = 'confirmPassword';
    confirmPasswordInput.id = 'i_confirmPassword';
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
    submitButton.onclick = gmReg_submitForm;

    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(ageLabel);
    form.appendChild(ageInput);
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
function gmReg_submitForm() { }