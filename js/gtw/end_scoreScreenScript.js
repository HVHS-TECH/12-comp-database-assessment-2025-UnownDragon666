/*******************************************************/
// end_scoreScreenScript.mjs
// Written by Idrees Munshi
// Term 2 2025
//
// GTW end script
/*******************************************************/
console.log('%cend_scoreScreenScript.mjs running', 'color: blue; background-color: white;');

/*******************************************************/
// Variables
/*******************************************************/
let auth
/*******************************************************/
// Constants
/*******************************************************/
const SCORE = parseInt(sessionStorage.getItem("game_playerScore"));


// Imports
import {
    fb_initialise, fb_writeRec, getAuth,
    fb_readRec, serverTimestamp
} from '../fb/fb_io.mjs';

/*******************************************************/
// Functions
/*******************************************************/
window.setup = () => {
    fb_initialise();
    auth = getAuth();
    // Display score on screen
    document.getElementById('sp_score').innerHTML = SCORE;
}

window.replay = () => {
    const result = confirm('Are you sure you want to replay?');
    if (result == true) {
        window.location.href = './gtw_gameplay.html';
    }
}

window.submit = () => {
    // Upload score to database
    const timestamp = serverTimestamp();
    const highScoreData = {
        score: SCORE,
        timestamp: timestamp
    };

    const PATH = `highscores/games/gtw/scores/${auth.currentUser.uid}`;

    auth != null ? fb_writeRec(`gtw/scores/${auth.currentUser.uid}`, highScoreData) : fb_authenticate();

    // Check if user's new score is higher than their highscore
    fb_readRec(PATH).then((data) => {
        if (data === null || SCORE > data.score) {
            fb_writeRec(PATH, highScoreData);
            console.log("New high score submitted!");
        } else {
            console.log("No new high score submitted.");
        }
    });

    document.getElementById('h_gameTitle').innerHTML = "Score submitted!";
    document.getElementById('b_submitScoreButton').disabled = true;
}

window.home = () => {
    window.location.href = '../../index.html';
}