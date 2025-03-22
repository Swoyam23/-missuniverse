const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const message = document.getElementById('message');

let playerPosition = 175;
let heartsCaught = 0;

// Move the player left and right
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= 20;
    } else if (event.key === 'ArrowRight' && playerPosition < 350) {
        playerPosition += 20;
    }
    player.style.left = playerPosition + 'px';
});

// Function to create falling hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 380 + 'px';
    heart.style.top = '0px';
    gameContainer.appendChild(heart);

    let fallInterval = setInterval(() => {
        let heartTop = parseInt(heart.style.top);
        if (heartTop < 480) {
            heart.style.top = heartTop + 5 + 'px';
        } else {
            clearInterval(fallInterval);
            gameContainer.removeChild(heart);
        }

        // Collision detection
        let heartLeft = parseInt(heart.style.left);
        if (heartTop > 450 && Math.abs(heartLeft - playerPosition) < 40) {
            heartsCaught++;
            gameContainer.removeChild(heart);
            clearInterval(fallInterval);
            updateMessage();
        }
    }, 50);
}

// Update message when enough hearts are caught
function updateMessage() {
    if (heartsCaught >= 10) {
        message.innerHTML = "I'm really sorry! Please forgive me. ❤";
    }
}

// Generate hearts at intervals
setInterval(createHeart, 1000);