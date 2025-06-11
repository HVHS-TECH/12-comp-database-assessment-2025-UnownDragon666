/*******************************************************/
// gm_main.mjs
// Written by Idrees Munshi
// Term 2 2025
//
// Main script for game manager pages
/*******************************************************/
console.log('%cgm_main.mjs running', 'color: green; background-color: white;');

/*******************************************************/
// Variables
/*******************************************************/

/*******************************************************/
// Constants
/*******************************************************/
const sidebar = document.getElementById('s_sidebar');
const sidebarToggle = document.getElementById('b_sidebarToggle');

// Imports
import { fb_initialise, fb_updateLoginStatus, fb_authenticate } from "../fb/fb_io.mjs";

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

addEventListener('DOMContentLoaded', () => {
    fb_initialise();
    fb_updateLoginStatus();
});

window.authWithGoogle = () => {
    fb_authenticate().then((user) => {
        // Check if user exists in database
        fb_readRec('accounts/' + user.uid).then((data) => {
            if (data !== null) {
                window.location.href = './gmAcc_profile.html';
            } else {
                window.location.href = './gmReg_register.html';
            }
        })
    })
}