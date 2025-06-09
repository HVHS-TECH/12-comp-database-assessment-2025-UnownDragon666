/*******************************************************/
// gmAcc_authScript.mjs
// Written by Idrees Munshi
// Term 2 2025
//
// gmAcc_auth.html script
/*******************************************************/
console.log('%cgmAcc_authScript.mjs running', 'color: blue; background-color: white;');

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