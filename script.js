function createFallingElements() {
  const container = document.getElementById('falling-elements');
  if (!container) return;

  container.innerHTML = '';
  const emojis = ['💖', '✨', '🐾', '🌸', '💕'];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.className = 'fall-item';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = `${Math.random() * 100}vw`;
    el.style.animationDuration = `${5 + Math.random() * 6}s`;
    el.style.animationDelay = `${Math.random() * 4}s`;
    el.style.opacity = `${0.35 + Math.random() * 0.5}`;
    container.appendChild(el);
  }
}

function revealSequence(stageNum, onDone) {
  const stage = document.getElementById(`stage-${stageNum}`);
  if (!stage) return;

  const items = stage.querySelectorAll('.reveal-text');
  let delay = 150;
  items.forEach((item) => {
    setTimeout(() => item.classList.add('show'), delay);
    delay += 550;
  });

  if (onDone) setTimeout(onDone, delay + 150);
}

function resetStageAnimations(stage) {
  stage.querySelectorAll('.reveal-text').forEach((el) => el.classList.remove('show'));
  stage.querySelectorAll('.hidden').forEach((el) => el.classList.remove('show'));
}

function goToStage(n) {
  document.querySelectorAll('.stage').forEach((stage) => {
    stage.classList.remove('active');
    resetStageAnimations(stage);
  });

  const active = document.getElementById(`stage-${n}`);
  if (!active) return;
  active.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

  if (n === 0) {
    revealSequence(0, () => document.getElementById('btn-0')?.classList.add('show'));
  }

  if (n === 1) {
    revealSequence(1, () => document.getElementById('btn-1')?.classList.add('show'));
  }

  if (n === 2) {
    revealSequence(2, () => document.getElementById('btns-2')?.classList.add('show'));
  }

  if (n === 3) {
    revealSequence(3);
    confetti({ particleCount: 180, spread: 90, origin: { y: 0.55 } });
  }
}

function startMusic() {
  const music = document.getElementById('bg-music');
  if (!music) return;
  music.volume = 0.25;
  music.play().catch(() => {
    // Mobile browsers may still block autoplay until a user gesture.
  });
}

function moveNoButton(event) {
  event.preventDefault();
  const noBtn = document.getElementById('no-btn');
  const group = document.getElementById('btns-2');
  if (!noBtn || !group) return;

  const groupRect = group.getBoundingClientRect();
  const maxX = Math.max(0, groupRect.width - noBtn.offsetWidth - 12);
  const maxY = 70;

  const x = Math.random() * maxX - maxX / 2;
  const y = -(Math.random() * maxY);
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

window.addEventListener('load', () => {
  createFallingElements();
  goToStage(0);

  document.getElementById('btn-0')?.addEventListener('click', () => {
    startMusic();
    goToStage(1);
  });

  document.getElementById('btn-1')?.addEventListener('click', () => goToStage(2));
  document.getElementById('yes-btn')?.addEventListener('click', () => goToStage(3));

  const noBtn = document.getElementById('no-btn');
  noBtn?.addEventListener('mouseover', moveNoButton);
  noBtn?.addEventListener('touchstart', moveNoButton, { passive: false });
  noBtn?.addEventListener('click', moveNoButton);
});
