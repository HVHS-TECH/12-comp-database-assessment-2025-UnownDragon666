/*******************************************************/
// Game That Works
// Written by Idrees Munshi
/*******************************************************/
console.log('script running');

/*******************************************************/
// Variables and constants
/*******************************************************/
let player;
let score = 0;
let coins;
let gameState = 'play';

const COINTIMEOUT = 2000;
const MOVEMENTSPEED = 9;
const COINSIZE = 20;
const COINSPAWNRATE = 2500;
const ENDTIME = 30000; // 30 seconds
const PARTICLESIZE = 5;
const PARTICLESPEED = 10;
const PARTICLELIFETIME = 10;

/*******************************************************/
// setup()
// P5 function
/*******************************************************/
function setup() {
    console.log('setup run')
    cnv = new Canvas(windowWidth, windowHeight);

    // Player 
    player = new Sprite(width / 2, height / 2, 30, 30, 'd');
    player.color = 'white';

    // Coins
    coins = new Group();
    createCoin();
    player.collides(coins, coinCollected);
}

/*******************************************************/
// draw()
// P5 function
/*******************************************************/
function draw() {
    if (gameState == 'play') {
        runGame();
    } else if (gameState == 'lose') {
        // User lost 
        loseScreen();
    }
}

/*******************************************************/
// runGame()
// Changes screen to game screen
// Called in draw loop when game starts
// Input: N/A 
// Output: N/A
/*******************************************************/
function runGame() {
    movePlayer();
    background('black');

    // Score 
    displayScore();

    // Coins
    if (random(0, COINSPAWNRATE) < 50) {
        console.log("coin created")
        createCoin();
    }

    // Check if coin should be removed based on how long it has been alive
    for (let i = 0; i < coins.length; i++) {
        if (checkCoinTime(coins[i])) {
            coins[i].remove();
        }
    }

    showTimer();

    // Check if time to end game
    if (millis() > ENDTIME) {
        endScreen();
    }
}

/*******************************************************/
// endScreen()
// Changes gamescreen to lose screen
// Called in draw loop when a coin times out
// Input: N/A 
// Output: N/A
/*******************************************************/
function endScreen() {
    // Upload score to sessionStorage
    sessionStorage.setItem('game_playerScore', score);
    window.location.href = './end_gameScoreScreen.html';
}

/*******************************************************/
// showTimer()
// Displays timer   
// Called in runGame()
// Input: N/A 
// Output: N/A
/*******************************************************/
function showTimer() {
    fill('white');
    text("Time: " + Math.floor(millis() / 1000), width - 100, 30);
}

/*******************************************************/
// movePlayer()
// Moves player sprite
// Called in runGame()
// Input: N/A 
// Output: N/A
/*******************************************************/
function movePlayer() {
    // Up and down
    if (kb.pressing('w') || kb.pressing('up')) {
        player.vel.y = -1 * MOVEMENTSPEED;
    } else if (kb.pressing('s') || kb.pressing('down')) {
        player.vel.y = MOVEMENTSPEED;
    }

    if (kb.released('w') || kb.released('s') || kb.released('up') || kb.released('down')) {
        player.vel.y = 0;
    }

    // Left and right
    if (kb.pressing('a')) {
        player.vel.x = -1 * MOVEMENTSPEED;
    } else if (kb.pressing('d')) {
        player.vel.x = MOVEMENTSPEED;
    }

    if (kb.released('a') || kb.released('d')) {
        player.vel.x = 0;
    }

    // Loop around canvas
    if (player.x < 0) {
        player.x = width;
    } else if (player.x > width) {
        player.x = 0;
    }

    if (player.y < 0) {
        player.y = height;
    } else if (player.y > height) {
        player.y = 0;
    }
}

/*******************************************************/
// displayScore()
// Displays score
// Called in runGame()
// Input: N/A 
// Output: N/A
/*******************************************************/
function displayScore() {
    fill('white');
    text("Score: " + score, 10, 30);
}

/*******************************************************/
// createCoin()
// Create coins
// Called in runGame()
// Input: N/A 
// Output: N/A
/*******************************************************/
function createCoin() {
    coin = new Sprite(random(10, width - 10), random(10, height - 10), COINSIZE, 'd');
    coin.color = 'yellow';
    coin.spawnTime = millis();
    coin.collected = false;
    coins.add(coin)
}

/*******************************************************/
// checkCoinTime()
// Checks if coins should be timed out
// Called in runGame()
// Input: _coin (an object in the coins array)
// Output: boolean variable
/*******************************************************/

function checkCoinTime(_coin) {
    if (_coin.spawnTime + COINTIMEOUT < millis()) {
        // Coin should be removed
        console.log('checkCoinTime() returned true')
        return true;
    }
    return false;
}

/*******************************************************/
// coinCollected()
// Collect coins
// Called in setup after player collides with a coin
// Input: N/A 
// Output: N/A
/*******************************************************/
function coinCollected(_player, _coin) {
    console.log('coin collected')
    // Increase score
    score = score + 1 + Math.floor(((millis() / 1000) - _coin.spawnTime / 1000) * (Math.PI) ** 2 / (Math.E));
    // Delete coin
    _coin.collected = true;
    _coin.remove();
    // Fix player rotation and speed after collision
    player.rotationSpeed = 0;
    player.rotation = 0;
    player.vel.x = 0;
    player.vel.y = 0;
    // Some particles for visual interest
    for (let i = 0; i < random(8, 20); i++) {
        let particle = createSprite(_coin.x, _coin.y, PARTICLESIZE, PARTICLESIZE, 'n');
        particle.vel.x = random(-PARTICLESPEED, PARTICLESPEED);
        particle.vel.y = random(-PARTICLESPEED, PARTICLESPEED);
        particle.color = 'yellow';
        particle.life = PARTICLELIFETIME;
    }
}