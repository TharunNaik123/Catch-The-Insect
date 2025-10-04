const screens = document.querySelectorAll('.screen');
const startBtn = document.getElementById('start-btn');
const insectBtns = document.querySelectorAll('.choose-insect-btn');
const gameContainer = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const messageEl = document.getElementById('message');

let seconds = 0;
let score = 0;
let selectedInsect = {};

startBtn.addEventListener('click', () => {
  screens[0].classList.remove('active');
  screens[1].classList.add('active');
});

insectBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    const name = btn.querySelector('p').textContent;
    selectedInsect = { name, src: img.src, alt: img.alt };
    screens[1].classList.remove('active');
    screens[2].classList.add('active');
    startGame();
  });
});

function startGame() {
  setInterval(updateTime, 1000);
  createInsect();
}

function updateTime() {
  seconds++;
  const min = Math.floor(seconds / 60).toString().padStart(2, '0');
  const sec = (seconds % 60).toString().padStart(2, '0');
  timeEl.textContent = `Time: ${min}:${sec}`;
}

function createInsect() {
  const insect = document.createElement('div');
  insect.classList.add('insect');
  const { x, y } = getRandomLocation();
  insect.style.top = `${y}px`;
  insect.style.left = `${x}px`;
  insect.innerHTML = `<img src="${selectedInsect.src}" alt="${selectedInsect.alt}" style="transform: rotate(${Math.random() * 360}deg)">`;
  insect.addEventListener('click', catchInsect);
  gameContainer.appendChild(insect);
}

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
}

function catchInsect() {
  score++;
  scoreEl.textContent = `Score: ${score}`;
  this.classList.add('caught');
  setTimeout(() => this.remove(), 200);
  if (score > 19) {
    messageEl.style.display = 'block';
  }
  setTimeout(createInsect, 1000);
  setTimeout(createInsect, 1500);
}
