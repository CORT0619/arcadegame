// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

Enemy.prototype.reset = function() {
    this.x = -100;
    this.y = Math.floor(Math.random() * 240) + 20; // randomly determines the y coordinate of the enemy between 20 and 240
    this.speed = Math.floor(Math.random() * 1000) + 20; // randomly determines the speed for each enemy between 20 and 1000
    this.width = 75;
    this.height = 40;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks (time elapsed since the last renderin?)
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += dt * this.speed;
    this.checkCollision();
    if (this.x >= 500) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// checks if there has been a collision between each bug and the player if there has been a collision then it resets
Enemy.prototype.checkCollision = function() {
    allEnemies.forEach((enemy) => {
        if (enemy.x < player.x + player.width &&
            enemy.x + enemy.width > player.x &&
            enemy.y < player.y + player.height &&
            enemy.y + enemy.height > player.y) {
            player.reset();
        }
    });
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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

// sets the user's image and sets the player's initial location
var Player = function() {

    this.sprite = 'images/char-pink-girl.png';
    this.x = 200;
    this.y = 400;
    this.width = 75;
    this.height = 25;
};

// updates the position of the Player object
Player.prototype.update = function(dt) {

};

// draws the user image on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const player = new Player();
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const enemy4 = new Enemy();

const allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);

Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case 'left':
            this.x <= 0 ? this.return : this.x -= 10;
            break; 
        case 'right':
            this.x >= 410 ? this.return :  this.x += 10;
            break;
        case 'up':
            this.y <= 0 ? gameComplete(this.y) : this.y -= 10;
            break;
        case 'down':
            this.y >= 440 ? this.reset() : this.y += 10;
            break;
        default:
            return;    
    }
}

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// displays the winner's modal
function showModal() {
    const modal = document.querySelector('.modal');
    modal.style['visibility'] = 'visible';
}

// hides the winner's modal
function hideModal() {
    const modal = document.querySelector('.modal');
    modal.style['visibility'] = 'hidden';
}

// determines if the game is complete
function gameComplete(y) {
    if (y <= 0) {
        showModal();
        setTimeout(() => { // after 2.5 seconds resets the game and hides the modal
            player.reset();
            hideModal();
        }, 2500);
    }
}