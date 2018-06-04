//random number between (min and max] (number of images) used to start and stop on different pages
//The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const enemyYPos = [60, 140, 225];
const enemySpeed = [100, 150, 200, 250];

// Enemies our player must avoid
let Enemy = function() {

    // The image/sprite for our enemies
    this.enemySprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = enemyYPos[getRandomInt(0,3)];
    this.speed = enemySpeed[getRandomInt(0,4)];


};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    //once the enemy runs off screen set position back to initial
    //place the enemy in a new random lane and change enemy speed
    if(this.x > 505) {
        this.x = -100;
        this.y = enemyYPos[getRandomInt(0,3)];
        this.speed = enemySpeed[getRandomInt(0,4)];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.enemySprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
    this.playerSprite = 'images/char-boy.png';
    this.x = 100;
    this.y = 300;
};

Player.prototype.update = function(dt) {


};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.playerSprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemy1 = new Enemy();
let enemy2 = new Enemy();
let enemy3 = new Enemy();
let enemy4 = new Enemy();

let allEnemies = [enemy1, enemy2, enemy3, enemy4];

let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

