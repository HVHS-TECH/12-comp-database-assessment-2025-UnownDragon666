/*******************************************************/
// gmLb_leaderboardScript.mjs
// Profile page script
// Written by Idrees Munshi
/*******************************************************/
console.log('%cgmLb_leaderboardScript running', 'color: blue; background-color: white;');

/*******************************************************/
// Variables
/*******************************************************/
let currentLeaderboard = "novice";
let currentGame = "cts";

/*******************************************************/
// Constants
/*******************************************************/
const LEADERBOARD = document.getElementById('tbody_leaderboard');
const LBSELECT = document.getElementById('s_chooseLeaderboard');

/*******************************************************/
// Imports 
/*******************************************************/
import { fb_initialise, fb_query, fb_readRec, fb_leaderboardAuthState } from '../fb/fb_io.mjs';

/*******************************************************/
// Main functionality of page    
/*******************************************************/
// Check which leaderboard to diplay through select option on the page
LBSELECT.addEventListener('change', () => {
    currentLeaderboard = LBSELECT.value;
    if (currentLeaderboard == "gtw") {
        currentGame = "gtw";
    } else {
        currentGame = "cts";
    }
    gmLb_fetchLeaderboard(currentGame, currentLeaderboard);
})

// Initialise firebase
fb_initialise();

// Fetch relevant leaderboard data if the user is logged in, else display message
fb_leaderboardAuthState(currentGame, currentLeaderboard);
/*******************************************************/
// gmLb_fetchLeaderboard()
// Fetch leaderboard data  from firebase
// Input: _diff as a string (difficulty of leaderboard to fetch), 
//        _game as a string (game to fetch leaderboard for)
// Returns: N/A
/*******************************************************/
function gmLb_fetchLeaderboard(_game, _diff) {
    if (_game == "gtw") {
        fb_query(`highscores/games/${_game}/scores`, 20).then((snapshot) => {
            gmLb_displayLeaderboard(snapshot);
        })
        return;
    }

    fb_query(`highscores/games/${_game}/difficulties/${_diff}/scores`, 20).then((snapshot) => {
        gmLb_displayLeaderboard(snapshot);
    });
}

window.fetchLB = gmLb_fetchLeaderboard;
/*******************************************************/
// gmLb_displayLoginMessage()
// Display message on leaderboard if user is not logged in
// Input: N/A
// Returns: N/A
/*******************************************************/
function gmLb_displayLoginMessage() {
    LEADERBOARD.innerHTML = '<tr><td colspan="3">Login to view leaderboard</td></tr>';
}
window.loginMessage = gmLb_displayLoginMessage;

/*******************************************************/
// gmLb_displayLeaderboard()
// Display leaderboard data on page
// Input: _data as an object (data to display)
// Returns: N/A
/*******************************************************/
async function gmLb_displayLeaderboard(_data) {
    // Clear leaderboard
    LEADERBOARD.innerHTML = '';

    _data = Object.entries(_data).map(([key, value]) => {
        return {
            uid: key,
            scoreObj: value
        }
    });

    _data.sort((a, b) => b.scoreObj.score - a.scoreObj.score);

    // Add data to leaderboard
    for (let i = 0; i < _data.length; i++) {
        // Score is stored in an object
        let score = _data[i].scoreObj.score;
        // Since scores are stored with uids, find the name of the user with their uid
        let name;
        name = await fb_readRec(`accounts/${_data[i].uid}/name`)
        let row = document.createElement('tr');
        row.innerHTML = `<td>${i + 1}</td><td>${name}</td><td>${score}</td>`;
        LEADERBOARD.appendChild(row);
    }
}