// Preload GIFs so there's no lag on mobile
const imagesToPreload = [
    "https://media.tenor.com/nJmPZt5oVpwAAAAi/peach-cat-cute.gif",
    "https://media.tenor.com/b97j0h3X-ZMAAAAi/mochi-cat.gif",
    "https://media.tenor.com/YvVnN11HhEAAAAAi/cat-love.gif",
    "https://media.tenor.com/T0bO27w5qgMAAAAi/cat-heart.gif",
    "https://media.tenor.com/W2kPeeR-sKkAAAAi/cat-rose.gif",
    "https://media.tenor.com/y1uH3o8c94gAAAAi/cat-cats.gif"
];
imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Background Falling Elements
function createFallingElements() {
    const container = document.getElementById('falling-elements');
    const elements = ['💖', '✨', '🌸', '🐾'];
    
    for (let i = 0; i < 20; i++) {
        let el = document.createElement('div');
        el.className = 'fall-item';
        el.innerText = elements[Math.floor(Math.random() * elements.length)];
        el.style.left = Math.random() * 100 + 'vw';
        el.style.animationDelay = Math.random() * 5 + 's';
        el.style.animationDuration = (Math.random() * 4 + 6) + 's';
        el.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        container.appendChild(el);
    }
}
createFallingElements();

// Modern Engine for sequentially fading elements in
function playSequence(selector, interval, callback) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    let i = 0;
    const timer = setInterval(() => {
        elements[i].classList.add('visible');
        i++;
        if (i >= elements.length) {
            clearInterval(timer);
            if (callback) setTimeout(callback, 800); // Wait a moment before callback
        }
    }, interval);
}

// Stage Navigation
function goToStage(stageNumber) {
    // Hide old stages smoothly
    document.querySelectorAll('.stage').forEach(el => el.classList.remove('active'));
    
    // Show new stage
    const currentStage = document.getElementById(`stage-${stageNumber}`);
    currentStage.classList.add('active');

    // Trigger Animations per stage
    if (stageNumber === 0) {
        // Shorter delay for mobile attention span
        setTimeout(() => {
            playSequence('#intro-texts .smooth-text', 1200, () => {
                document.getElementById('btn-continue-1').classList.add('visible');
                document.getElementById('sig').classList.add('visible');
            });
        }, 500);
    } 
    else if (stageNumber === 1) {
        setTimeout(() => {
            playSequence('#memory-cards .glass-card', 1200, () => {
                document.getElementById('btn-continue-2').classList.add('visible');
            });
        }, 300);
    }
    else if (stageNumber === 2) {
        setTimeout(() => {
            playSequence('#proposal-texts .smooth-text, #proposal-texts .romantic-title', 1200, () => {
                document.getElementById('response-buttons').classList.add('visible');
            });
        }, 300);
    }
    else if (stageNumber === 3) {
        setTimeout(() => {
            document.getElementById('yay-text').classList.add('visible');
            setTimeout(() => document.getElementById('final-gif').classList.add('visible'), 600);
            setTimeout(() => document.getElementById('final-msg').classList.add('visible'), 1200);
        }, 300);

        // Confetti explosion!
        var duration = 3 * 1000;
        var end = Date.now() + duration;
        (function frame() {
            confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ff758c', '#ff7eb3'] });
            confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ff758c', '#ff7eb3'] });
            if (Date.now() < end) requestAnimationFrame(frame);
        }());
    }
}

// EVASIVE "NO" BUTTON - Mobile Optimized
const noBtn = document.getElementById('no-btn');

function dartAway(e) {
    if(e) e.preventDefault(); // Stop the click entirely on mobile

    // Get screen dimensions safely
    const screenWidth = window.innerWidth - 150; // 150 is approx button width
    const screenHeight = window.innerHeight - 100; 

    // Calculate safe random coordinates so it doesn't go off screen
    const randomX = Math.floor(Math.random() * screenWidth) - (screenWidth / 2);
    const randomY = Math.floor(Math.random() * (screenHeight / 2)) - 100; // Move it mostly upwards

    // The CSS transition handles the smooth glide
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Listen for both finger touches and mouse hovers
noBtn.addEventListener('touchstart', dartAway, {passive: false});
noBtn.addEventListener('mouseover', dartAway);

// Start
window.onload = () => goToStage(0);
