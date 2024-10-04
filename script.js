// Matrix Falling Code Background with Movie-Like Speed and Color Cycling
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = '0123456789ABCDEF';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(0);

let currentEffect = 0; // Variable to keep track of which effect is active
let cycleDuration = 5000; // Cycle duration for each effect (5 seconds)

// Adjust speed to mimic Matrix movie
const matrixSpeed = 50; // Fast speed for Matrix movie effect

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

setInterval(cycleEffects, cycleDuration); // Change effect every 5 seconds

// Draw the Matrix effect with movie-like speed and cycling colors
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

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i] += Math.random() * 2 + 1; // Random falling speed for each column, fast for movie-like effect
    }
}

// Fast movie-like effect speed at 50ms
setInterval(drawMatrix, matrixSpeed);
