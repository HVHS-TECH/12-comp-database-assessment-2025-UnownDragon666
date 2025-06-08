/*******************************************************/
// main.mjs
// Main script for firebase in use
// Written by Idrees Munshi
// Term 2 2025
/*******************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%cmain.mjs',
    'color: blue; background-color: white;');

// Variables

// Imports
import {
    fb_initialise, fb_authenticate, fb_readRec, fb_writeRec,
    fb_logout, fb_updateLoginStatus
} from './fb_io.mjs';

// Display relevant functions to the window
window.fb_writeRec = fb_writeRec;
window.init = fb_initialise;
window.fb_readRec = fb_readRec;
window.fb_authenticate = fb_authenticate.then(
    // Check if the user exists in the database

    // If not, create a new user and ask them for the required information
    // username, password, confirm password, age, gender, agree to Terms and Conditions 
    // Welcome new user to the site, allow them to 
);
window.fb_logout = fb_logout;
window.main_indexSetup = main_indexSetup;

/*******************************************************/
// main_indexSetup()
// Firebase setup for index.html
// Called by index.html
// Input: N/A
// Returns: N/A
/*******************************************************/
function main_indexSetup() {
    fb_initialise();
    fb_updateLoginStatus();
}