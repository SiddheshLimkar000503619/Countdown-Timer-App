// World Clock Function
function updateWorldClocks() {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const reginaTime = new Date().toLocaleTimeString("en-US", { ...options, timeZone: "America/Regina" });
    const mumbaiTime = new Date().toLocaleTimeString("en-US", { ...options, timeZone: "Asia/Kolkata" });
    const londonTime = new Date().toLocaleTimeString("en-US", { ...options, timeZone: "Europe/London" });
    const torontoTime = new Date().toLocaleTimeString("en-US", { ...options, timeZone: "America/Toronto" });
    const atlantaTime = new Date().toLocaleTimeString("en-US", { ...options, timeZone: "America/New_York" });

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

    if (distance < 0) {
        document.getElementById(elementId).textContent = "EXPIRED";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById(elementId).textContent = `${days}D ${hours}H ${minutes}M ${seconds}S`;
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

// To-Do List Functionality
function addTodo() {
    const todoText = document.getElementById('newTodo').value.trim();
    if (todoText === '') return;

    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onclick = function() {
        li.classList.toggle('done');
    };
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(todoText));
    document.getElementById('todoList').appendChild(li);
    document.getElementById('newTodo').value = '';
}

// Matrix Falling Code Background with Color Effects
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters to display
const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%';
const chars = matrixChars.split('');

// Font size and columns
const fontSize = 16;
const columns = canvas.width / fontSize;

// Array of drops - one per column
const drops = Array.from({ length: columns }).fill(1);

// Color sequence: white, green, random color per character, random RGB
const colorSequence = ['white', 'green', 'randomPerChar', 'randomRGB'];
let colorIndex = 0;

// Function to get a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    return '#' + Array.from({ length: 6 }).map(() => letters[Math.floor(Math.random() * 16)]).join('');
}

// Function to get a random RGB color
function getRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

// Main draw function
function drawMatrix() {
    // Semi-transparent background to create fading trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px monospace`;

    // Loop over drops
    drops.forEach((y, x) => {
        // Get a random character
        const text = chars[Math.floor(Math.random() * chars.length)];

        // Set color based on the current color sequence
        switch (colorSequence[colorIndex]) {
            case 'white':
                ctx.fillStyle = '#FFFFFF';
                break;
            case 'green':
                ctx.fillStyle = '#00FF00';
                break;
            case 'randomPerChar':
                ctx.fillStyle = getRandomColor();
                break;
            case 'randomRGB':
                ctx.fillStyle = getRandomRGB();
                break;
        }

        // Draw the character
        ctx.fillText(text, x * fontSize, y * fontSize);

        // Reset drop to top randomly
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[x] = 0;
        }

        // Increment y coordinate for drop
        drops[x]++;
    });
}

// Change color every 5 seconds
setInterval(() => {
    colorIndex = (colorIndex + 1) % colorSequence.length;
}, 5000);

// Redraw matrix every 50 milliseconds
setInterval(drawMatrix, 50);

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
