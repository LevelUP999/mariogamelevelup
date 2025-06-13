const teclaTutorial = document.getElementById("tecla");
const player = document.querySelector(".player");
const pipe = document.querySelector(".pipe");
const gameOverImg = document.getElementById("gameover");
const rangeInput = document.getElementById("width-screen");

let isJumping = false;
let isGameOver = false;

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !isGameOver && !isJumping) {
    jump();
    teclaTutorial.style.background = "#1a1a1a30";
    teclaTutorial.style.boxShadow = "0 3px 3px 3px #1a1a1a10";
  }
});

document.addEventListener("keyup", () => {
  teclaTutorial.style.background = "transparent";
  teclaTutorial.style.boxShadow = "0 3px 3px 3px transparent";
});

function jump() {
  if (isJumping || isGameOver) return;

  isJumping = true;
  player.classList.add("jump");

  setTimeout(() => {
    player.classList.remove("jump");
    isJumping = false;
  }, 600);
}

function checkCollision() {
  if (isGameOver) return;

  const playerRect = player.getBoundingClientRect();
  const pipeRect = pipe.getBoundingClientRect();

  const horizontalCollision = pipeRect.left < playerRect.right - 20 && pipeRect.right > playerRect.left + 20;
  const verticalCollision = playerRect.bottom > pipeRect.top + 10;

  if (horizontalCollision && verticalCollision) {
    gameOver();
  }

  requestAnimationFrame(checkCollision);
}

function gameOver() {
  isGameOver = true;

  pipe.style.animation = "none";
  pipe.style.right = `${pipe.getBoundingClientRect().right}px`;

  player.src = "./assets/game-over.png";
  player.style.width = "120px";
  player.style.bottom = "10px";
  player.style.left = `${player.getBoundingClientRect().left}px`;

  gameOverImg.style.display = "block";
}

rangeInput.addEventListener("input", (e) => {
  const screen = document.querySelector(".screen");
  screen.style.width = `${e.target.value}%`;
});
requestAnimationFrame(checkCollision);
