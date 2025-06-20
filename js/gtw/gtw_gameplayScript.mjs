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
let highScore = 0;
let coins;
let gameState = 'play';
let retryButton;
let loseState = false;

const COINTIMEOUT = 5000;
const MOVEMENTSPEED = 9;
const COINSIZE = 20;

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
    highScoreDisplay();
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
    if (random(0, 5000) < 30) {
        console.log("coin created")
        createCoin();
    }

    // Check if coin should be removed based on how long it has been alive
    for (let i = 0; i < coins.length; i++) {
        if (checkCoinTime(coins[i])) {
            console.log('Game lost')
            coins[i].remove();
            gameState = 'lose';
        }
    }
}

/*******************************************************/
// loseScreen()
// Changes gamescreen to lose screen
// Called in draw loop when a coin times out
// Input: N/A 
// Output: N/A
/*******************************************************/
function loseScreen() {
    player.remove();
    coins.remove();
    background('red');
    fill('white');
    text('YOU LOSE', width / 2, height / 2);
    text('SCORE: ' + score, width / 2, height / 2 - 100);

    if (loseState == false) {
        // Button to restart game
        retryButton = createButton('RETRY', 'button');
        retryButton.position(width / 2, height / 2 + 100);
        retryButton.mousePressed(restartGame);
        loseState = true;
    }

}

/*******************************************************/
// restartGame()
// Changes gamescreen back to runGame()
// Called on loseScreen, restarts game
// Input: N/A 
// Output: N/A
/*******************************************************/
function restartGame() {
    score = 0;
    gameState = 'play';
    loseState = false;
    retryButton.remove();
    setup();
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
    if (kb.pressing('w')) {
        player.vel.y = -1 * MOVEMENTSPEED;
    } else if (kb.pressing('s')) {
        player.vel.y = MOVEMENTSPEED;
    }

    if (kb.released('w') || kb.released('s')) {
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
// highScoreDisplay()
// Displays highest score achieved by player.
// Called in draw loop
// Input: N/A 
// Output: N/A
/*******************************************************/
function highScoreDisplay() {
    if (score >= highScore) {
        highScore = score;
    }
    text("High Score: " + highScore, width / 2 - 50, 30);
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
    score++;
    // Delete coin
    _coin.collected = true;
    _coin.remove();
    // Fix player rotation and speed after collision
    player.rotationSpeed = 0;
    player.rotation = 0;
    player.vel.x = 0;
    player.vel.y = 0;
}