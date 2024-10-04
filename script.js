// Matrix Falling Code Background with Random Color Per Line/Character and Slower Speed
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = '0123456789ABCDEF';
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = Array(Math.floor(columns)).fill(0);

// Function to generate random colors for individual characters
function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}

// Slow down the matrix effect and add randomness to the falling speed
function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Slight trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillStyle = getRandomColor(); // Apply random color to each character

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Randomize falling speed for each column
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i] += Math.random() * 2 + 1; // Random speed per line
    }
}

// Adjust speed to slow down by 500ms and maintain smooth falling effect
setInterval(drawMatrix, 533); // Increased interval to slow down by ~500ms
