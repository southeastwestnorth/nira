const introTexts = [
    "I created this just for you...",
    "Because you are incredibly special to me...",
    "And today, I want to tell you something..."
];

const memories = [
    { text: "Talking to you is the best part of my day.", img: "https://media.tenor.com/b97j0h3X-ZMAAAAi/mochi-cat.gif" },
    { text: "You turned my normal days into magic.", img: "https://media.tenor.com/YvVnN11HhEAAAAAi/cat-love.gif" },
    { text: "I fell for you, and I haven't recovered from the fall.", img: "https://media.tenor.com/T0bO27w5qgMAAAAi/cat-heart.gif" }
];

const proposalTexts = [
    "Nira...",
    "I really, really like you.",
    "Will you be my girlfriend?"
];

function startApp() {
    document.getElementById('bg-music').play().catch(() => {});
    goToStage(1);
}

async function sendMessages(stageId, textArray, isCard = false) {
    const thread = document.getElementById(`thread-${stageId}`);
    const typing = document.getElementById(`typing-${stageId}`);
    const status = document.getElementById('status');

    for (const item of textArray) {
        typing.style.display = 'block';
        status.innerText = 'Typing...';
        
        // Wait for "typing" effect
        await new Promise(r => setTimeout(r, 1500));
        
        typing.style.display = 'none';
        status.innerText = 'Online';

        const div = document.createElement('div');
        if (isCard) {
            div.className = 'chat-card';
            div.innerHTML = `<img src="${item.img}"><p>${item.text}</p>`;
        } else {
            div.className = 'bubble';
            div.innerText = item;
        }
        
        thread.appendChild(div);
        
        // Auto scroll to bottom
        window.scrollTo(0, document.body.scrollHeight);
    }

    // Show button after messages
    const btn = document.getElementById(`btn-${stageId}`) || document.getElementById(`btns-2`);
    if (btn) btn.classList.remove('hidden');
}

function goToStage(n) {
    document.querySelectorAll('.stage').forEach(s => s.classList.remove('active'));
    const current = document.getElementById(`stage-${n}`);
    current.classList.add('active');

    if (n === 1) sendMessages(1, memories, true);
    if (n === 2) sendMessages(2, proposalTexts);
    if (n === 3) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
}

// Falling emojis
function createHearts() {
    const container = document.getElementById('falling-elements');
    setInterval(() => {
        const div = document.createElement('div');
        div.className = 'fall-item';
        div.innerHTML = '💖';
        div.style.left = Math.random() * 100 + 'vw';
        div.style.animationDuration = (Math.random() * 2 + 3) + 's';
        container.appendChild(div);
        setTimeout(() => div.remove(), 4000);
    }, 400);
}

// NO Button logic
const noBtn = document.getElementById('no-btn');
noBtn?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const x = Math.random() * (window.innerWidth - 100) - (window.innerWidth/2 - 50);
    const y = Math.random() * (window.innerHeight - 100) - (window.innerHeight/2 - 50);
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

window.onload = () => {
    createHearts();
    sendMessages(0, introTexts);
};
