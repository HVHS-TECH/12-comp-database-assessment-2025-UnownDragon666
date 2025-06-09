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
    fb_authenticate, fb_initialise, fb_updateLoginStatus, fb_writeRec, getAuth
} from '../fb/fb_io.mjs';

/*******************************************************/
// Main functionality of page
/*******************************************************/
window.setup = () => {
    fb_initialise();
    fb_updateLoginStatus().then((userBoolean) => {
        if (userBoolean) {
            fb_readRec('users/' + getAuth().currentUser.uid).then((data) => {
                if (data !== null) {
                    document.getElementById('p_error').innerHTML = 'You already have an account! You are logged in as ' + data.name;
                    document.getElementById('b_googleLogin').disabled = true;
                }
            })
        } else {
            document.getElementById('b_googleLogin').style.display = 'block';
            document.getElementById('b_googleLogin').disabled = false;
        }
    })

}

// First, use fb_authenticate to ask user to choose Google account
window.signup = () => {
    fb_authenticate();
}

