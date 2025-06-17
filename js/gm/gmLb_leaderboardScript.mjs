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
// Input: _leaderboard as a string (leaderboard to fetch)
// Returns: N/A
/*******************************************************/
function gmLb_fetchLeaderboard(_leaderboard) {

}