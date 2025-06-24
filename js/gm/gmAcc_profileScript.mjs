/*******************************************************/
// gm_Acc_profileScript.mjs
// Profile page script
// Written by Idrees Munshi
/*******************************************************/
console.log('%cgmAcc_profileScript running', 'color: blue; background-color: white;');

/*******************************************************/
// Variables
/*******************************************************/

/*******************************************************/
// Constants
/*******************************************************/
const sidebar = document.getElementById('s_sidebar');
const sidebarToggle = document.getElementById('b_sidebarToggle');

/*******************************************************/
// Imports 
/*******************************************************/
import {
    fb_initialise, fb_profileAuthState, fb_updateLoginStatus, fb_updateRec, getAuth, fb_deleteRec
} from '../fb/fb_io.mjs';

/*******************************************************/
// Main functionality of page
/*******************************************************/
// Toggle sidebar
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

window.setup = () => {
    console.log('setup() run');

    fb_initialise();
    fb_profileAuthState();
    fb_updateLoginStatus();
}

function gmAcc_displayProfile(_user) {
    console.log('gmAcc_displayProfile() run');
    const profileContainer = document.getElementById('d_headerContainer');
    profileContainer.innerHTML = `
    <img id="img_profilePic" src="${_user.photoURL}" alt="Profile Picture">
        <div id=d_info">
            <h1 id="h_userName">${_user.name}</h1>
            <p id="p_userEmail">${_user.email} ${_user.pronouns}</p>  
        </div>
    `;
    document.getElementById("b_editName").disabled = false;
    document.getElementById("b_deleteAccount").disabled = false;
}

function gmAcc_displayLoginMessage() {
    const profileContainer = document.getElementById('d_headerContainer');
    profileContainer.innerHTML = `
    <h1>Please log in to see profile</h1>
  `;
    document.getElementById("b_editName").disabled = true;
    document.getElementById("b_deleteAccount").disabled = true;
}

window.editName = () => {
    let name = prompt('Enter new name');
    if (name !== null && name.trim() !== '' && name !== undefined) {
        fb_updateRec('accounts/' + getAuth().currentUser.uid, { name: name });
        fb_profileAuthState();
    } else {
        alert('Please enter a valid name');
    }
}

window.deleteAccount = () => {
    if (confirm('Are you sure you want to delete your account?')) {
        fb_deleteRec('accounts/' + getAuth().currentUser.uid);
        fb_logout();
    }
}

window.gmAcc_displayProfile = gmAcc_displayProfile;
window.gmAcc_displayLoginMessage = gmAcc_displayLoginMessage;