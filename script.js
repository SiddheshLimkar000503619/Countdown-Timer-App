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

// Countdown Timer Function
function updateCountdown(deadline, elementId) {
    const now = new Date().getTime();
    const distance = deadline - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById(elementId).textContent = `${days}D ${hours}Hrs ${minutes}Mins ${seconds}Secs`;
}

// Deadlines
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

// Matrix Falling Code Background (Movie-Like)
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = '0123456789ABCDEF';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(0);

const matrixSpeed = 80; // Slower fall speed for the matrix effect
const glowEffectSpeed = 2000; // Slower breathing effect for the glow
const colorEffects = ['#0F0']; // Green color for Matrix effect

function drawMatrix() {
    // Ensure the background remains black
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Light fade to black, ensuring glow doesn't affect the background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Setting the font for the falling characters
    ctx.font = `${fontSize}px monospace`;

    // Loop over the columns (drops)
    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));

        // Matrix green with glow effect
        ctx.fillStyle = colorEffects[0];
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 20; // Glow effect around characters

        // Draw the text (falling character)
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset the drop to the top when it goes beyond the screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Move the drop down
        drops[i]++;
    }
}

// Slower breathing effect for the glow (optional to smoothen glow in/out)
function breatheEffect() {
    ctx.globalAlpha = 0.5 + Math.sin(Date.now() / glowEffectSpeed) / 2; // Creates breathing effect
}

setInterval(breatheEffect, 100);
setInterval(drawMatrix, matrixSpeed);
