let blastCount = 0;
let bubbleCount = 5;
let target = 50;
let timeLimit = 30;
let gameActive = false;
let timer;
let timeRemaining;
let countdownInterval;

function createBubble() {
  if (!gameActive) return;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  const randomLeft = Math.random() * 80 + 10;
  bubble.style.left = `${randomLeft}%`;

  bubble.onclick = function () {
    if (!gameActive) return;
    createBlast(bubble);
    bubble.remove();
    updateCounter();
  };

  document.body.appendChild(bubble);

  setTimeout(() => {
    if (gameActive && document.body.contains(bubble)) {
      bubble.remove();
    }
  }, 8000);
}

function createBlast(bubble) {
  const blast = document.createElement("div");
  blast.className = "blast";
  blast.style.left = bubble.style.left;
  blast.style.top = bubble.getBoundingClientRect().top + "px";
  document.body.appendChild(blast);

  setTimeout(() => {
    blast.remove();
    if (gameActive) createMultipleBubbles();
  }, 400);
}

function updateCounter() {
  blastCount++;
  document.getElementById("counter").textContent = blastCount;
}

function createMultipleBubbles() {
  for (let i = 0; i < bubbleCount; i++) {
    setTimeout(() => {
      createBubble();
    }, i * 200);
  }
}

function showPopup(message) {
  const popup = document.getElementById("popup");
  document.getElementById("popupMessage").textContent = message;
  popup.style.display = "block";
}

function resetGame() {
  blastCount = 0;
  document.getElementById("counter").textContent = 0;
  document.getElementById("popup").style.display = "none";
  document.querySelector(".counter").style.display = "block";
  gameActive = true;

  timeRemaining = timeLimit;
  document.getElementById("timeLeft").textContent = timeRemaining;

  countdownInterval = setInterval(() => {
    timeRemaining--;
    document.getElementById("timeLeft").textContent = timeRemaining;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  createMultipleBubbles();

  clearTimeout(timer);
  timer = setTimeout(() => {
    gameActive = false;
    clearInterval(countdownInterval);
    if (blastCount >= target) {
      showPopup("🎉 You Win! 🎉");
    } else {
      showPopup("😢 You Lost. Try Again!");
    }
  }, timeLimit * 1000);
}

document.getElementById("startGameBtn").onclick = () => {
  timeLimit = parseInt(document.getElementById("timeInput").value);
  target = parseInt(document.getElementById("targetInput").value);
  document.getElementById("setupScreen").style.display = "none";
  resetGame();
};

document.getElementById("playAgainBtn").onclick = () => {
  document.getElementById("popup").style.display = "none";
  document.getElementById("setupScreen").style.display = "block";
  document.querySelector(".counter").style.display = "none";
};
