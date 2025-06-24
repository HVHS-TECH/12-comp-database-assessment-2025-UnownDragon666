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
    fb_initialise, fb_profileAuthState, fb_updateLoginStatus, fb_updateRec, getAuth, fb_deleteRec,
    fb_readRec
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
    let name = _user.name;
    if (name === null) {
        name = 'Anonymous';
    }
    profileContainer.innerHTML = `
    <img id="img_profilePic" src="${_user.photoURL}" alt="Profile Picture">
        <div id=d_info">
            <h1 id="h_userName">${name}</h1>
            <p id="p_userEmail">${_user.email} ${_user.pronouns}</p>  
        </div>
    `;

    // Display high scores
    const auth = getAuth();
    // Novice
    fb_readRec(`highscores/games/cts/difficulties/novice/scores/${auth.currentUser.uid}`).then((score) => {
        if (score === null) {
            console.log(score)
            document.getElementById("td_noviceScore").innerHTML = "No score submitted";
        } else {
            document.getElementById("td_noviceScore").innerHTML = score.score;
        }
    });

    // Apprentice
    fb_readRec(`highscores/games/cts/difficulties/apprentice/scores/${auth.currentUser.uid}`).then((score) => {
        if (score === null) {
            console.log(score)
            document.getElementById("td_apprenticeScore").innerHTML = "No score submitted";
        } else {
            document.getElementById("td_apprenticeScore").innerHTML = score.score;
        }
    });

    // Expert
    fb_readRec(`highscores/games/cts/difficulties/expert/scores/${auth.currentUser.uid}`).then((score) => {
        if (score === null) {
            console.log(score)
            document.getElementById("td_expertScore").innerHTML = "No score submitted";
        } else {
            document.getElementById("td_expertScore").innerHTML = score.score;
        }
    });

    // Master
    fb_readRec(`highscores/games/cts/difficulties/master/scores/${auth.currentUser.uid}`).then((score) => {
        if (score === null) {
            console.log(score)
            document.getElementById("td_masterScore").innerHTML = "No score submitted";
        } else {
            document.getElementById("td_masterScore").innerHTML = score.score;
        }
    });

    // Divine
    fb_readRec(`highscores/games/cts/difficulties/divine/scores/${auth.currentUser.uid}`).then((score) => {
        if (score === null) {
            console.log(score)
            document.getElementById("td_divineScore").innerHTML = "No score submitted";
        } else {
            document.getElementById("td_divineScore").innerHTML = score.score;
        }
    });

    // Game that works
    fb_readRec(`highscores/games/gtw/scores/${auth.currentUser.uid}`).then((score) => {
        if (score === null) {
            console.log(score)
            document.getElementById("td_gtwScore").innerHTML = "No score submitted";
        } else {
            document.getElementById("td_gtwScore").innerHTML = score.score;
        }
    });

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