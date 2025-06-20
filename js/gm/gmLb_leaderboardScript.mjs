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
const LEADERBOARD = document.getElementById('leaderboard');
const LBSELECT = document.getElementById('s_chooseLeaderboard');

/*******************************************************/
// Imports 
/*******************************************************/
import { fb_query } from '../fb/fb_io.mjs';

/*******************************************************/
// Main functionality of page    
/*******************************************************/
// Check which leaderboard to diplay through select option on the page
LBSELECT.addEventListener('change', () => {
    currentLeaderboard = LBSELECT.value;
})

// Fetch relevant leaderboard data
gmLb_fetchLeaderboard(currentLeaderboard);

/*******************************************************/
// gmLb_fetchLeaderboard()
// Fetch leaderboard data  from firebase
// Input: _diff as a string (difficulty of leaderboard to fetch), 
//        _game as a string (game to fetch leaderboard for)
// Returns: N/A
/*******************************************************/
function gmLb_fetchLeaderboard(_game, _diff) {
    const LEADERBOARD_DATA = fb_query(`highscores/games/${_game}/difficulties/${_diff},/scores`, 20);
    // Console log for development purposes
    console.log(LEADERBOARD_DATA);

    // LEADERBOARD_DATA.then((snapshot) => {
    //     gmLb_displayLeaderboard(snapshot);
    // });
}