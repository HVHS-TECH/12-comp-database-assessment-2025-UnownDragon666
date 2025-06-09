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

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});