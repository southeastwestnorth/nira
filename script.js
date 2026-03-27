// Background Elements
function createFallingElements() {
    const container = document.getElementById('falling-elements');
    const emojis = ['💖', '✨', '🐾', '🌸'];
    for (let i = 0; i < 15; i++) {
        const div = document.createElement('div');
        div.className = 'fall-item';
        div.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        div.style.left = Math.random() * 100 + 'vw';
        div.style.animationDuration = (Math.random() * 3 + 4) + 's';
        div.style.opacity = Math.random() * 0.7;
        container.appendChild(div);
    }
}

// Sequencing Logic
function revealStageElements(stageId, callback) {
    const texts = document.querySelectorAll(`#stage-${stageId} .reveal-text`);
    let delay = 300;
    
    texts.forEach((txt) => {
        setTimeout(() => txt.classList.add('show'), delay);
        delay += 1200;
    });
    
    if (callback) setTimeout(callback, delay);
}

function startApp() {
    document.getElementById('bg-music').play().catch(() => {});
    goToStage(1);
}

function goToStage(n) {
    // Reset scroll to top for new section
    window.scrollTo(0, 0);
    
    document.querySelectorAll('.stage').forEach(s => s.classList.remove('active'));
    document.getElementById(`stage-${n}`).classList.add('active');
    
    if (n === 1) {
        revealStageElements(1, () => {
            document.getElementById('btn-1').classList.add('show');
        });
    } else if (n === 2) {
        revealStageElements(2, () => {
            document.getElementById('btns-2').classList.add('show');
        });
    } else if (n === 3) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
}

// "NO" Button Evasion
const noBtn = document.getElementById('no-btn');
if (noBtn) {
    const dartAway = (e) => {
        e.preventDefault();
        const x = Math.random() * (window.innerWidth - 120) - (window.innerWidth / 2 - 60);
        const y = Math.random() * (window.innerHeight - 200) - (window.innerHeight / 2 - 100);
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
    };
    noBtn.addEventListener('touchstart', dartAway);
    noBtn.addEventListener('mouseover', dartAway);
}

// Init
window.onload = () => {
    createFallingElements();
    revealStageElements(0, () => {
        document.getElementById('btn-0').classList.add('show');
        document.getElementById('sig-0').classList.add('show');
    });
};
