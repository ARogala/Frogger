//random number between (min and max] (number of images) used to start and stop on different pages
//The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
const enemies = ['images/enemies/enemy-bug.png','images/enemies/SwampMonster.png',
'images/enemies/spr_classiccar_0.png', 'images/enemies/car-full.png'];
const enemyBugYPos = [37, 87, 137];
const enemySwampYPos = [235, 285];
const enemyCar1YPos = [380, 430];
const enemyCar2YPos = [490, 540, 590];
const enemySpeed = [150, 200, 250, 300, 350];
const playerSpeed = 300;
// Enemies our player must avoid
let Enemy = function(enemyType) {
    // The image/sprite for our enemies
    //enemyTypes are as follows:
    this.enemyType = enemyType;
    if(enemyType === 'bug') {
        console.log(enemyType);
        this.enemySprite = enemies[0];
        this.x = -100;
        this.y = enemyBugYPos[getRandomInt(0,3)];
        this.speed = enemySpeed[getRandomInt(0,5)];
    }
    else if(enemyType === 'swamp') {
        console.log(enemyType);
        this.enemySprite = enemies[1];
        this.x = 610;
        this.y = enemySwampYPos[getRandomInt(0,2)];
        this.speed = enemySpeed[getRandomInt(0,5)];
    }
    else if(enemyType === 'car1') {
        console.log(enemyType);
        this.enemySprite = enemies[2];
        this.x = 610;
        this.y = enemyCar1YPos[getRandomInt(0,2)];
        this.speed = enemySpeed[getRandomInt(0,5)];
    }
    else if(enemyType === 'car2') {
        console.log(enemyType);
        this.enemySprite = enemies[3];
        this.x = -100;
        this.y = enemyCar2YPos[getRandomInt(0,3)];
        this.speed = enemySpeed[getRandomInt(0,5)];
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.enemyType === 'bug') {
        this.x = this.x + (this.speed * dt);
    }
    else if(this.enemyType === 'swamp') {
        this.x = this.x - (this.speed * dt);
    }
    else if(this.enemyType === 'car1') {
        this.x = this.x - (this.speed * dt)
    }
    else if(this.enemyType === 'car2') {
        this.x = this.x + (this.speed * dt);
    }

    //once the enemy runs off screen set position back to initial
    //place the enemy in a new random lane and change enemy speed
    if(this.enemyType === 'bug' && this.x > 610) {
        this.x = -100;
        this.y = enemyBugYPos[getRandomInt(0,3)];
        this.speed = enemySpeed[getRandomInt(0,5)];
    }
    else if(this.enemyType === 'swamp' && this.x < -40) {
        this.x = 610;
        this.y = enemySwampYPos[getRandomInt(0,2)];
        this.speed = enemySpeed[getRandomInt(0,5)];
    }
    else if(this.enemyType === 'car1' && this.x < -90) {
        this.x = 610;
        this.y = enemyCar1YPos[getRandomInt(0,2)];
        this.speed = enemySpeed[getRandomInt(0,5)];
    }
    else if(this.enemyType === 'car2' && this.x > 610) {
        this.x = -100;
        this.y = enemyCar2YPos[getRandomInt(0,3)];
        this.speed = enemySpeed[getRandomInt(0,5)];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if(this.enemySprite === 'images/enemies/SwampMonster.png') {
        ctx.drawImage(Resources.get(this.enemySprite), this.x, this.y, 50, 40);
    }
    else if(this.enemySprite === 'images/enemies/enemy-bug.png') {
        ctx.drawImage(Resources.get(this.enemySprite), this.x, this.y, 60, 103);
    }
    //render the cars
    else {
        ctx.drawImage(Resources.get(this.enemySprite), this.x, this.y, 86, 32);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
    this.playerSprite = 'images/char-boy.png';
    this.x = 100;
    this.y = 300;
    this.speed = playerSpeed;
};

Player.prototype.update = function(dt) {
    if(this.key === 'upKeyDown') {
        console.log(this.speed);
        this.y = this.y - this.speed*dt;
    }
    // else if(this.key === 'upKeyUp') {
    //     //this.key = undefined;
    // }
    else if(this.key === 'downKeyDown') {
        console.log(this.speed);
        this.y = this.y + this.speed*dt;
    }
    // else if(this.key === 'downKeyUp') {
    //     //this.key = undefined;
    // }
    else if(this.key === 'leftKeyDown') {
        console.log(this.speed);
        this.x = this.x - this.speed*dt;
    }
    // else if(this.key === 'leftKeyUp') {
    //     //this.key = undefined;
    // }
    else if(this.key === 'rightKeyDown') {
        console.log(this.speed);
        this.x = this.x + this.speed*dt;
    }
    // else if(this.key === 'rightKeyUp') {
    //     //this.key = undefined;
    // }
    //this.key = undefined;
};

Player.prototype.handleInput = function(keys) {
    this.key = keys;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.playerSprite), this.x, this.y, 75, 130);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//first 8 enemies are of type bug
let enemy1 = new Enemy('bug');
let enemy2 = new Enemy('bug');
let enemy3 = new Enemy('bug');
let enemy4 = new Enemy('bug');
let enemy5 = new Enemy('bug');
let enemy6 = new Enemy('bug');
let enemy7 = new Enemy('bug');
let enemy8 = new Enemy('bug');
//next 5 are of type SwampMonster
let enemy9  = new Enemy('swamp');
let enemy10 = new Enemy('swamp');
let enemy11 = new Enemy('swamp');
let enemy12 = new Enemy('swamp');
let enemy13 = new Enemy('swamp');
//the next 5 are of type car1
let enemy14 = new Enemy('car1');
let enemy15 = new Enemy('car1');
let enemy16 = new Enemy('car1');
let enemy17 = new Enemy('car1');
let enemy18 = new Enemy('car1');
//the next 8 are of thpe car2
let enemy19 = new Enemy('car2');
let enemy20 = new Enemy('car2');
let enemy21 = new Enemy('car2');
let enemy22 = new Enemy('car2');
let enemy23 = new Enemy('car2');
let enemy24 = new Enemy('car2');
let enemy25 = new Enemy('car2');
let enemy26 = new Enemy('car2');


let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10,
enemy11, enemy12, enemy13, enemy14, enemy15, enemy16, enemy17, enemy18, enemy19, enemy20, enemy21,
enemy22, enemy23, enemy24, enemy25, enemy26];

let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
// add wasd key
/*
document.addEventListener('keyup', function(e) {
    e.preventDefault();
    var allowedKeys = {
        37:           'leftKeyUp',
        38:           'upKeyUp',
        39:           'rightKeyUp',
        40:           'downKeyUp',
        'ArrowLeft':  'leftKeyUp',
        'ArrowUp':    'upKeyUp',
        'ArrowRight': 'rightKeyUp',
        'ArrowDown':  'downKeyUp',
        65:           'leftKeyUp',
        87:           'upKeyUp',
        68:           'rightKeyUp',
        83:           'downKeyUp',
        'a':          'leftKeyUp',
        'w':          'upKeyUp',
        'd':          'rightKeyUp',
        's':          'downKeyUp'
    };

    //keyCode is being deprecated use key
    if(e.key !== undefined) {
        player.handleInput(allowedKeys[e.key]);
    }
    else if(e.keyCode !== undefined) {
        player.handleInput(allowedKeys[e.keyCode]);
    }

}, false);
*/
// This listens for key presses and disables default scroll actions.
document.addEventListener('keydown', function(e) {
    e.preventDefault();
    var allowedKeys = {
        37:           'leftKeyDown',
        38:           'upKeyDown',
        39:           'rightKeyDown',
        40:           'downKeyDown',
        'ArrowLeft':  'leftKeyDown',
        'ArrowUp':    'upKeyDown',
        'ArrowRight': 'rightKeyDown',
        'ArrowDown':  'downKeyDown',
        65:           'leftKeyDown',
        87:           'upKeyDown',
        68:           'rightKeyDown',
        83:           'downKeyDown',
        'a':          'leftKeyDown',
        'w':          'upKeyDown',
        'd':          'rightKeyDown',
        's':          'downKeyDown'
    };

    //keyCode is being deprecated use key
    if(e.key !== undefined) {
        player.handleInput(allowedKeys[e.key]);
    }
    else if(e.keyCode !== undefined) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
}, false);