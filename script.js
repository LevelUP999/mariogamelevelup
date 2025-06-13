const spaceTutorial = document.getElementById("tecla")
const player = document.querySelector(".player")
let Jumping = false
const obstacle = document.querySelector(".pipe")
let playerdeath = false

document.addEventListener("keydown", function (event) {
    // Verifica se a tecla pressionada foi "Espaço"
    if (event.code === "Space") {
        event.preventDefault(); // Evita scroll automático
        spaceTutorial.style.background = `#1a1a1a30`
        spaceTutorial.style.boxShadow = `0 3px 3px 3px #1a1a1a10`
        spaceTutorial.style.borderRadius = `10px`
    }
});

document.addEventListener("keyup", function (event) {
    spaceTutorial.style.background = `transparent`
    if (event.code === "Space"&& playerdeath == false) {
        spaceTutorial.style.boxShadow = `0 3px 3px 3px transparent`
        spaceTutorial.style.borderRadius = `0`
        if (!Jumping) {
            jumpPlayer()
        }
    }
});

document.getElementById("width-screen").addEventListener("change", () => {
    document.querySelector(".screen").style.width = `${document.getElementById("width-screen").value}%`
})

function jumpPlayer() {
    Jumping = true;
    player.style.animation = `jump ease-in-out 1s`;

    setTimeout(() => {
        player.style.animation = ``;
        Jumping = false;
    }, 1000);
}


setInterval(checkCollision, 1)
function checkCollision() {
    if (!playerdeath) {
        const playerRect = player.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        const isColliding = !(
            playerRect.top > obstacleRect.bottom ||
            playerRect.bottom < obstacleRect.top ||
            playerRect.right < obstacleRect.left ||
            playerRect.left > obstacleRect.right
        );

        if (isColliding) {
            playerdeath = true
            gameOver()
        }
    }
}

function gameOver() {
    const screenRect = document.querySelector(".screen").getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    // Posição relativa ao container .screen
    const playerLeft = playerRect.left - screenRect.left;
    const playerTop = playerRect.top - screenRect.top;

    const obstacleLeft = obstacleRect.left - screenRect.left;
    const obstacleTop = obstacleRect.top - screenRect.top;

    // Parar animações e fixar posição do player
    player.src = `./assets/game-over.png`;
    player.style.width = `120px`;
    
    player.style.transform = "none";
    player.style.left = `${playerLeft}px`;
    player.style.animation = "death 2s ease-in-out";
    player.style.transform = "translateY(500px)"

    // Parar animação e fixar obstáculo
    obstacle.style.animation = "none";
    obstacle.style.left = `${obstacleLeft}px`;
    obstacle.style.top = `${obstacleTop}px`;

    document.getElementById("gameover").style.display = `block`
}
