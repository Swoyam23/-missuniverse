const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const message = document.getElementById('message');

let playerPosition = 175;
let heartsCaught = 0;

document.getElementById("start-btn").style.display = "block"; // Show button

// Move the player left and right
document.getElementById("start-btn").addEventListener("click", function() {
    startGame();
    document.getElementById("bg-music").play(); // Ensure music starts
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= 20;
    } else if (event.key === 'ArrowRight' && playerPosition < 350) {
        playerPosition += 20;
    }
    player.style.left = playerPosition + 'px';
});

function startGame() {
    let music = document.getElementById("music.mp3");

    if (music.paused) {
        music.play().catch(error => console.log("Autoplay blocked:", error));
    }
}

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

function collectSnitch() {
    let catchSound = document.getElementById("catch.mp3");

    // Play catch sound
    if (catchSound) {
        catchSound.currentTime = 0; // Restart sound in case it overlaps
        catchSound.play().catch(error => console.log("Sound blocked:", error));
    }

    snitchCount++;

    if (snitchCount >= 10) {
        endGame(); // Stop game after 10 snitches
    }
}

// Update message when enough hearts are caught
function updateMessage() {
    if (heartsCaught >= 10) {
        message.innerHTML = "I'm really sorry! Please forgive me. ❤";
    }
}

function endGame() {
    // Stop all game actions
    document.getElementById("snitch").style.display = "none"; // Hide Snitches
    document.getElementById("harry").style.display = "none"; // Hide character

    // Display message
    let message = document.createElement("div");
    message.innerHTML = "You caught 10 Snitches! Well done!";
    message.style.position = "absolute";
    message.style.top = "50%";
    message.style.left = "50%";
    message.style.transform = "translate(-50%, -50%)";
    message.style.fontSize = "24px";
    message.style.fontFamily = "Harry Potter Font";
    message.style.color = "#FFD700"; // Golden color like Snitch
    message.style.background = "rgba(0, 0, 0, 0.8)";
    message.style.padding = "20px";
    message.style.borderRadius = "10px";

    document.body.appendChild(message);

    // Optional: Stop background music
    let music = document.getElementById("bg-music");
    if (music) {
        music.pause();
        music.currentTime = 0; // Reset music
    }
}

// Generate hearts at intervals
setInterval(createHeart, 1000);
