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

// Matrix Falling Code Background with Slow Breathing Glow/Illumination
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = '0123456789ABCDEF';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(0);

let currentEffect = 0; // Variable to keep track of which effect is active
let cycleDuration = 8000; // Slowed down cycle duration for each effect (8 seconds)

// Speed for smooth falling effect
const matrixSpeed = 20; // Smooth, fast effect

// Color options for cycling in order
const colorEffects = ['white', 'green', 'random', 'rgb'];

// Function to generate a random color
function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}

// Function to cycle through the color effects in the specified order
function getMatrixColor() {
    const effect = colorEffects[currentEffect];

    if (effect === 'white') {
        return '#FFF'; // White color
    } else if (effect === 'green') {
        return '#0F0'; // Matrix green color
    } else if (effect === 'random') {
        return getRandomColor(); // Random color per character
    } else if (effect === 'rgb') {
        return getRandomColor(); // RGB effect where each character gets a different color
    }
}

// Function to switch between effects every cycleDuration
function cycleEffects() {
    currentEffect = (currentEffect + 1) % colorEffects.length; // Cycle through effects in order
}

setInterval(cycleEffects, cycleDuration); // Change effect every 8 seconds (slowed down)

// Draw the Matrix effect with slower glow/illumination effect and smooth falling
function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Slight trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));

        // Apply color based on current effect
        if (colorEffects[currentEffect] === 'rgb') {
            ctx.fillStyle = getRandomColor(); // Each character gets a random color in 'rgb' effect
        } else {
            ctx.fillStyle = getMatrixColor(); // Use the current effect's color
        }

        // Add glow/illumination effect with slower breathing
        ctx.shadowColor = ctx.fillStyle; // Glow color same as the character color
        ctx.shadowBlur = 8; // Adjusted glow for slower breathing effect

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i] += 1; // Smooth, uniform falling speed for each column
    }
}

// Slower breathing effect speed set at 20ms interval for maximum fluidity
setInterval(drawMatrix, matrixSpeed);
