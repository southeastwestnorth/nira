// Start falling elements immediately
function createFallingElements() {
    const container = document.getElementById('falling-elements');
    const elements = ['💖', '🐾', '🐱', '✨', '🌸'];
    
    for (let i = 0; i < 25; i++) {
        let el = document.createElement('div');
        el.className = 'falling-element';
        el.innerText = elements[Math.floor(Math.random() * elements.length)];
        el.style.left = Math.random() * 100 + 'vw';
        el.style.animationDelay = Math.random() * 5 + 's';
        el.style.animationDuration = (Math.random() * 5 + 5) + 's';
        el.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        container.appendChild(el);
    }
}
createFallingElements();

// Function to handle sequence timings
function showSequential(elements, interval, callback) {
    let i = 0;
    const intervalId = setInterval(() => {
        if (i < elements.length) {
            elements[i].classList.remove('hidden');
            elements[i].classList.add('visible');
            i++;
        } else {
            clearInterval(intervalId);
            if(callback) callback();
        }
    }, interval);
}

// Stage Logic
function goToStage(stageNumber) {
    // Hide all stages
    document.querySelectorAll('.stage').forEach(el => {
        el.classList.remove('active');
    });

    // Start Music on first interaction
    if (stageNumber === 1) {
        document.getElementById('bg-music').play().catch(e => console.log("Audio play blocked until interaction."));
    }

    // Show target stage
    const currentStage = document.getElementById(`stage-${stageNumber}`);
    currentStage.classList.add('active');

    // Run specific stage animations
    if (stageNumber === 0) {
        const texts = document.querySelectorAll('#intro-texts p');
        showSequential(texts, 1800, () => {
            document.getElementById('btn-continue-1').classList.remove('hidden');
            document.getElementById('sig').classList.remove('hidden');
        });
    } 
    else if (stageNumber === 1) {
        const cards = document.querySelectorAll('.memory-card');
        showSequential(cards, 1500, () => {
            document.getElementById('btn-continue-2').classList.remove('hidden');
        });
    }
    else if (stageNumber === 2) {
        const texts = document.querySelectorAll('#proposal-texts p, #proposal-texts h2');
        showSequential(texts, 1800, () => {
            document.getElementById('response-buttons').classList.remove('hidden');
        });
    }
    else if (stageNumber === 3) {
        // Trigger Confetti
        var duration = 3 * 1000;
        var end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff758c', '#ff7eb3', '#ffffff']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff758c', '#ff7eb3', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
}

// Mobile NO Button Evasion Script
const noBtn = document.getElementById('no-btn');

function moveButton() {
    // Moves the button to a random position quickly when touched/hovered
    const x = Math.random() * 150 - 75; // Random X offset
    const y = Math.random() * 150 - 75; // Random Y offset
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

// Triggers for both mobile touch and mouse hover
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevents tapping
    moveButton();
});

// Initialize first stage
window.onload = () => {
    goToStage(0);
}