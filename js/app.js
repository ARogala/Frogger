//random number between (min and max] (number of images) used to start and stop on different pages
//The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//add sound tracks and sound effects! What game is complete without this?
const soundTracks = ['audio/DarkContemplations.ogg', 'audio/Endgame.ogg', 'audio/field2_Master.ogg',
'audio/gatveVarniu.ogg', 'audio/InnerCore_High.ogg', 'audio/MarchofDetermination.ogg',
'audio/maskedyoshisthemeremastered.ogg', 'audio/RoadTrip.ogg', 'audio/WretchedBlade1.ogg'];

const soundEffects = ['audio/deathe.wav','audio/stepdirt_8.wav'];
let soundTrack = new Audio(soundTracks[getRandomInt(0,9)]);
let stepSound, deathSound;
let playSoundEffects;
document.getElementById('soundBtn').addEventListener('click', playAudio);

function playAudio() {
    soundTrack.volume = 0.5;
    soundTrack.loop = true;
    soundTrack.play();
    deathSound = new Audio(soundEffects[0]);
    deathSound.volume = 1;
    stepSound  = new Audio(soundEffects[1]);
    stepSound.volume = 1;
    playSoundEffects = true;
}

const enemies = ['images/enemies/enemy-bug.png','images/enemies/SwampMonster.png',
'images/enemies/spr_classiccar_0.png', 'images/enemies/car-full.png'];
const gems = ['images/GemGreen.png', 'images/GemOrange.png', 'images/GemBlue.png'];
const enemyBugYPos = [37, 87, 137];
const enemySwampYPos = [235, 285];
const enemyCar1YPos = [380, 430];
const enemyCar2YPos = [490, 540, 590];
const enemySpeed = [150, 200, 250, 300, 350];
// Enemies our player must avoid
let Enemy = function(enemyType) {
    // The image/sprite for our enemies
    this.enemyType = enemyType;
    if(enemyType === 'bug') {
        this.enemySprite = enemies[0];
        this.x = -100;
        this.y = enemyBugYPos[getRandomInt(0,3)];
        this.speed = enemySpeed[getRandomInt(0,5)];
    }
    else if(enemyType === 'swamp') {
        this.enemySprite = enemies[1];
        this.x = 610;
        this.y = enemySwampYPos[getRandomInt(0,2)];
        this.speed = enemySpeed[getRandomInt(0,5)];
    }
    else if(enemyType === 'car1') {
        this.enemySprite = enemies[2];
        this.x = 610;
        this.y = enemyCar1YPos[getRandomInt(0,2)];
        this.speed = enemySpeed[getRandomInt(0,5)];
    }
    else if(enemyType === 'car2') {
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
    this.playerSprite = 'images/Walker.png';
    this.x = 130;
    this.y = 585;
};

Player.prototype.update = function(dt) {

    if(this.key === 'left' && this.x > 8) {
        this.x = this.x - 61;
        if(playSoundEffects === true) {
            stepSound.pause();
            stepSound.currentTime = 0;
            stepSound.play();
        }
    }
    if(this.key === 'up' && this.y > -15) {
        this.y = this.y - 50;
        if(playSoundEffects === true) {
            stepSound.pause();
            stepSound.currentTime = 0;
            stepSound.play();
        }
    }
    if(this.key === 'right' && this.x < 557) {
        this.x = this.x + 61;
        if(playSoundEffects === true) {
            stepSound.pause();
            stepSound.currentTime = 0;
            stepSound.play();
        }
    }
    if(this.key === 'down' && this.y < 585) {
        this.y = this.y + 50;
        if(playSoundEffects === true) {
            stepSound.pause();
            stepSound.currentTime = 0;
            stepSound.play();
        }
    }
    //prevents if statment from beign run multiple times with one btn push
    this.key = undefined;
};

Player.prototype.handleInput = function(keys) {
    this.key = keys;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.playerSprite), this.x, this.y, 65, 78);
};

//reset the player
Player.prototype.playerReset = function() {
    this.playerSprite = 'images/Walker.png';
    this.x = 130;
    this.y = 585;
};

Player.prototype.playerDeath = function() {
    this.playerSprite = 'images/WalkerDead.png';
    if(playSoundEffects === true) {
        deathSound.play();
    }

    setTimeout(this.playerReset.bind(this), 1000);
};

/* gem classes
 a gem is centered on top left tile at x = 12 and y = 15
 to place gem from there add 61 in x direction and 50 in y direction for each block

 Two gem classes were created to make placing on enemy tiles easier
 the goal is to have one gem randomly placed on the water tiles
 and one gem randomly placed on the road tiles.
*/
let gemCount = 0;

let FirstGem = function() {
    this.gemSprite = gems[getRandomInt(0,3)];
    this.x = 12  + 61*getRandomInt(0,10);
    this.y = 365 + 50*getRandomInt(0,5);
};

FirstGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.gemSprite), this.x, this.y, 35, 60);
};

//when player comes in contact with a gem collect it and remove it from screen
FirstGem.prototype.collect = function() {
    gemCount += 1;
    this.x = -100;
    this.y = -100;
    console.log('I collected gem1 ' + gemCount);
};

let SecondGem = function() {
    this.gemSprite = gems[getRandomInt(0,2)];
    this.x = 12 + 61*getRandomInt(0,10);
    this.y = 65 + 50*getRandomInt(0,5);
};

SecondGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.gemSprite), this.x, this.y, 35, 60);
};

//when player comes in contact with a gem collect it and remove it from screen
SecondGem.prototype.collect = function() {
    gemCount += 1;
    this.x = -100;
    this.y = -100;
    console.log('I collected gem2 ' + gemCount);
};

let gem1 = new FirstGem();
let gem2 = new SecondGem();


//Yummy brain
//x = 2.5 y = 30 will center brain on top left block
let brainCount = 0;
let Brain = function(x,y) {
    this.brainSprite = 'images/brain2.png';
    this.x = x;
    this.y = y;
};

Brain.prototype.render = function() {
    ctx.drawImage(Resources.get(this.brainSprite), this.x, this.y, 56, 47);
};

//when player comes in contact with the brains eat them!!!
Brain.prototype.eat = function() {
    brainCount += 1;
    this.x = -100;
    this.y = -100;
    console.log('i have eaten ' + brainCount);
}

let brain    = new Brain(2.5, 30);
let winBrain = new Brain(63.5, 30);

/*
 The below function is called during update() in engine.js
 It works by storing the player’s and enemies’ coordinates in separate arrays
 Then checks, for each type of enemy, if the player’s X coordinate is close to the enemy’s
 X coordinate and if the player’s Y coordinate is equal the enemy’s
 Y coordinate. When both those conditions are met the player has been hit.

 This check had to be done for each enemy type because each enemy type
 is a different size therefore affecting how close the player can get to each
 enemy type before a hit is simulated. Also, the size differences between the
 player and enemy types affected the Y coordinate between the player and each enemy type

 (note: enemy arrays length is 48, even index are X enemy coordinates,
 and odd index are Y enemy coordinates)
*/

function checkCollisions() {

    let playerCords = [];
    let enemyCords  = [];
    let gemCords    = [];
    let brainCords  = [];
    //get player coordinates
    playerCords.push(player.x);
    playerCords.push(player.y);
    //get gem coordinates
    gemCords.push(gem1.x);
    gemCords.push(gem1.y);
    gemCords.push(gem2.x);
    gemCords.push(gem2.y);
    //get brain coordinates
    brainCords.push(brain.x);
    brainCords.push(brain.y);
    if(gemCount === 2) {
        brainCords.push(winBrain.x);
        brainCords.push(winBrain.y);
    }

    //console.log(brainCords);
    //get enemy coordinates
    for(let enemy of allEnemies) {
        enemyCords.push(Math.round(enemy.x));
        enemyCords.push(enemy.y);
    }
    /////////////////////////////////////////////////////////////////////////////////////////////
    //brains
    //brain
    if(Math.abs(playerCords[0] - brainCords[0]) <= 30 && (playerCords[1]+45 === brainCords[1])) {
        brain.eat();
        console.log('eat brain');
    }
    //winBrain
    if(Math.abs(playerCords[0] - brainCords[2]) <= 30 && (playerCords[1]+45 === brainCords[3])) {
        winBrain.eat();
        console.log('eat winBrain');
    }

    /////////////////////////////////////////////////////////////////////////////////////////////
    //gems
    //gem1
    //console.log(Math.abs(playerCords[0] - gemCords[0]));
    if(Math.abs(playerCords[0] - gemCords[0]) <= 30 && (playerCords[1]+30 === gemCords[1])) {
        gem1.collect();
    }
    //gem2
    if(Math.abs(playerCords[0] - gemCords[2]) <= 30 && (playerCords[1]+30 === gemCords[3])) {
        gem2.collect();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////
    //bugs
    //bug1
    if(Math.abs(playerCords[0] - enemyCords[0]) <= 30 && (playerCords[1]+2 === enemyCords[1])) {
        player.playerDeath();
    }
    //bug2
    if(Math.abs(playerCords[0] - enemyCords[2]) <= 30 && (playerCords[1]+2 === enemyCords[3])) {
        player.playerDeath();
    }
    //bug3
    if(Math.abs(playerCords[0] - enemyCords[4]) <= 30 && (playerCords[1]+2 === enemyCords[5])) {
        player.playerDeath();
    }
    //bug4
    if(Math.abs(playerCords[0] - enemyCords[6]) <= 30 && (playerCords[1]+2 === enemyCords[7])) {
        player.playerDeath();
    }
    //bug5
    if(Math.abs(playerCords[0] - enemyCords[8]) <= 30 && (playerCords[1]+2 === enemyCords[9])) {
        player.playerDeath();
    }
    //bug6
    if(Math.abs(playerCords[0] - enemyCords[10]) <= 30 && (playerCords[1]+2 === enemyCords[11])) {
        player.playerDeath();
    }
    //bug7
    if(Math.abs(playerCords[0] - enemyCords[12]) <= 30 && (playerCords[1]+2 === enemyCords[13])) {
        player.playerDeath();
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    //SwampMonsters
    //SwampMonster1
    if(Math.abs(playerCords[0] - enemyCords[14]) <= 30 && (playerCords[1]+50 === enemyCords[15])) {
        player.playerDeath();
    }
    //SwampMonster2
    if(Math.abs(playerCords[0] - enemyCords[16]) <= 30 && (playerCords[1]+50 === enemyCords[17])) {
        player.playerDeath();
    }
    //SwampMonster3
    if(Math.abs(playerCords[0] - enemyCords[18]) <= 30 && (playerCords[1]+50 === enemyCords[19])) {
        player.playerDeath();
    }
    //SwampMonster4
    if(Math.abs(playerCords[0] - enemyCords[20]) <= 30 && (playerCords[1]+50 === enemyCords[21])) {
        player.playerDeath();
    }
    //SwampMonster5
    if(Math.abs(playerCords[0] - enemyCords[22]) <= 30 && (playerCords[1]+50 === enemyCords[23])) {
        player.playerDeath();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    //car type1 Blue Classic
    //car1
    if(Math.abs(playerCords[0] - enemyCords[24]) <= 35 && (playerCords[1]+45 === enemyCords[25])) {
        player.playerDeath();
    }
    //car2
    if(Math.abs(playerCords[0] - enemyCords[26]) <= 35 && (playerCords[1]+45 === enemyCords[27])) {
        player.playerDeath();
    }
    //car3
    if(Math.abs(playerCords[0] - enemyCords[28]) <= 35 && (playerCords[1]+45 === enemyCords[29])) {
        player.playerDeath();
    }
    //car4
    if(Math.abs(playerCords[0] - enemyCords[30]) <= 35 && (playerCords[1]+45 === enemyCords[31])) {
        player.playerDeath();
    }
    //car5
    if(Math.abs(playerCords[0] - enemyCords[32]) <= 35 && (playerCords[1]+45 === enemyCords[33])) {
        player.playerDeath();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //car type2 Red Truck
    //car1
    if(Math.abs(playerCords[0] - enemyCords[34]) <= 45 && (playerCords[1]+55 === enemyCords[35])) {
        player.playerDeath();
    }
    //car2
    if(Math.abs(playerCords[0] - enemyCords[36]) <= 45 && (playerCords[1]+55 === enemyCords[37])) {
        player.playerDeath();
    }
    //car3
    if(Math.abs(playerCords[0] - enemyCords[38]) <= 45 && (playerCords[1]+55 === enemyCords[39])) {
        player.playerDeath();
    }
    //car4
    if(Math.abs(playerCords[0] - enemyCords[40]) <= 45 && (playerCords[1]+55 === enemyCords[41])) {
        player.playerDeath();
    }
    //car5
    if(Math.abs(playerCords[0] - enemyCords[42]) <= 45 && (playerCords[1]+55 === enemyCords[43])) {
        player.playerDeath();
    }
    //car6
    if(Math.abs(playerCords[0] - enemyCords[44]) <= 45 && (playerCords[1]+55 === enemyCords[45])) {
        player.playerDeath();
    }
    //car7
    if(Math.abs(playerCords[0] - enemyCords[46]) <= 45 && (playerCords[1]+55 === enemyCords[47])) {
        player.playerDeath();
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// first 7 enemies are of type bug
// let enemy1 = new Enemy('bug');
// let enemy2 = new Enemy('bug');
// let enemy3 = new Enemy('bug');
// let enemy4 = new Enemy('bug');
// let enemy5 = new Enemy('bug');
// let enemy6 = new Enemy('bug');
// let enemy7 = new Enemy('bug');
// // next 5 are of type SwampMonster
// let enemy8  = new Enemy('swamp');
// let enemy9  = new Enemy('swamp');
// let enemy10 = new Enemy('swamp');
// let enemy11 = new Enemy('swamp');
// let enemy12 = new Enemy('swamp');
// // next 5 are of type car1 Blue Classic
// let enemy13 = new Enemy('car1');
// let enemy14 = new Enemy('car1');
// let enemy15 = new Enemy('car1');
// let enemy16 = new Enemy('car1');
// let enemy17 = new Enemy('car1');
// // next 7 are of type car2 RedTruck
// let enemy18 = new Enemy('car2');
// let enemy19 = new Enemy('car2');
// let enemy20 = new Enemy('car2');
// let enemy21 = new Enemy('car2');
// let enemy22 = new Enemy('car2');
// let enemy23 = new Enemy('car2');
// let enemy24 = new Enemy('car2');

// let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10,
// enemy11, enemy12, enemy13, enemy14, enemy15, enemy16, enemy17, enemy18, enemy19, enemy20, enemy21,
// enemy22, enemy23, enemy24];
let allEnemies =[];
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
// add wasd keys and account for keyCode being deprecated

document.addEventListener('keyup', function(e) {
    e.preventDefault();
    var allowedKeys = {
        37:           'left',
        38:           'up',
        39:           'right',
        40:           'down',
        'ArrowLeft':  'left',
        'ArrowUp':    'up',
        'ArrowRight': 'right',
        'ArrowDown':  'down',
        65:           'left',
        87:           'up',
        68:           'right',
        83:           'down',
        'a':          'left',
        'w':          'up',
        'd':          'right',
        's':          'down'
    };

    //keyCode is being deprecated use key
    if(e.key !== undefined) {
        player.handleInput(allowedKeys[e.key]);
    }
    else if(e.keyCode !== undefined) {
        player.handleInput(allowedKeys[e.keyCode]);
    }

});

// This listens for key presses and disables default scroll actions.
document.addEventListener('keydown', function(e) {
    e.preventDefault();
});
