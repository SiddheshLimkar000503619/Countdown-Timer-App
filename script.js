// World Clock Function
function updateWorldClocks() {
    const reginaTime = new Date().toLocaleString("en-US", { timeZone: "America/Regina" });
    const mumbaiTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const londonTime = new Date().toLocaleString("en-US", { timeZone: "Europe/London" });
    const torontoTime = new Date().toLocaleString("en-US", { timeZone: "America/Toronto" });
    const atlantaTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

    document.getElementById('regina').textContent = "Regina: " + reginaTime;
    document.getElementById('mumbai').textContent = "Mumbai: " + mumbaiTime;
    document.getElementById('london').textContent = "London: " + londonTime;
    document.getElementById('toronto').textContent = "Toronto: " + torontoTime;
    document.getElementById('atlanta').textContent = "Atlanta: " + atlantaTime;
}

setInterval(updateWorldClocks, 1000); // Update every second

// Countdown Timer Function (D, Hrs, Mins, Secs)
function updateCountdown(deadline, elementId) {
    const now = new Date().getTime();
    const distance = deadline - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById(elementId).textContent = `${days}D ${hours}Hrs ${minutes}Mins ${seconds}Secs`;
}

// Example deadlines (replace with actual values)
const deadline1 = new Date('Oct 5, 2024 00:00:00').getTime();
const deadline2 = new Date('Oct 9, 2024 00:00:00').getTime();
const deadline3 = new Date('Oct 14, 2024 00:00:00').getTime();
const deadline4 = new Date('Oct 19, 2024 00:00:00').getTime();
const deadline5 = new Date('Oct 23, 2024 00:00:00').getTime();
const deadline6 = new Date('Oct 28, 2024 00:00:00').getTime();

setInterval(() => updateCountdown(deadline1, 'timer1'), 1000);
setInterval(() => updateCountdown(deadline2, 'timer2'), 1000);
setInterval(() => updateCountdown(deadline3, 'timer3'), 1000);
setInterval(() => updateCountdown(deadline4, 'timer4'), 1000);
setInterval(() => updateCountdown(deadline5, 'timer5'), 1000);
setInterval(() => updateCountdown(deadline6, 'timer6'), 1000);

// Matrix Falling Code Background with No Glow
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = '0123456789ABCDEF';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(0);

let currentEffect = 0;
let cycleDuration = 8000; // Slowed down cycle duration for each effect (8 seconds)

const matrixSpeed = 20;
const colorEffects = ['white', 'green', 'random', 'rgb'];

function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}

function getMatrixColor() {
    const effect = colorEffects[currentEffect];
    if (effect === 'white') return '#FFF';
    if (effect === 'green') return '#0F0';
    if (effect === 'random') return getRandomColor();
    if (effect === 'rgb') return getRandomColor();
}

function cycleEffects() {
    currentEffect = (currentEffect + 1) % colorEffects.length;
}
setInterval(cycleEffects, cycleDuration);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));

        if (colorEffects[currentEffect] === 'rgb') {
            ctx.fillStyle = getRandomColor();
        } else {
            ctx.fillStyle = getMatrixColor();
        }

        // Removed glow effect here
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i] += 1;
    }
}

setInterval(drawMatrix, matrixSpeed);
