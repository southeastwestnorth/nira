function createFallingElements() {
    const container = document.getElementById('falling-elements');
    const emojis = ['💖', '✨', '🐾', '🌸'];
    for (let i = 0; i < 15; i++) {
        const div = document.createElement('div');
        div.className = 'fall-item';
        div.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        div.style.left = Math.random() * 100 + 'vw';
        div.style.animationDuration = (Math.random() * 3 + 5) + 's';
        div.style.opacity = Math.random() * 0.7;
        container.appendChild(div);
    }
}

function revealSequence(stageId, callback) {
    const texts = document.querySelectorAll(`#stage-${stageId} .reveal-text`);
    let delay = 300;
    texts.forEach((txt) => {
        setTimeout(() => txt.classList.add('show'), delay);
        delay += 1200;
    });
    if (callback) setTimeout(callback, delay);
}

function startApp() {
    const music = document.getElementById('bg-music');
    music.play().catch(() => console.log("Music blocked by browser"));
    goToStage(1);
}

function goToStage(n) {
    // Scroll to top of page when changing stages
    window.scrollTo(0, 0);
    
    document.querySelectorAll('.stage').forEach(s => s.classList.remove('active'));
    document.getElementById(`stage-${n}`).classList.add('active');
    
    if (n === 1) {
        revealSequence(1, () => {
            const btn = document.getElementById('btn-1');
            btn.style.display = 'block';
            btn.classList.add('show');
        });
    } else if (n === 2) {
        revealSequence(2, () => {
            const btns = document.getElementById('btns-2');
            btns.style.display = 'flex';
            btns.classList.add('show');
        });
    } else if (n === 3) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
}

// NO Button Dart Logic - Improved for Mobile
const noBtn = document.getElementById('no-btn');
if (noBtn) {
    const move = (e) => {
        e.preventDefault();
        // Keep button inside visible screen area
        const x = Math.random() * (window.innerWidth - 120) - (window.innerWidth / 2 - 60);
        const y = Math.random() * (window.innerHeight - 200) - (window.innerHeight / 2 - 100);
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
    };
    noBtn.addEventListener('touchstart', move);
    noBtn.addEventListener('mouseover', move);
}

window.onload = () => {
    createFallingElements();
    revealSequence(0, () => {
        document.getElementById('btn-0').classList.add('show');
    });
};
