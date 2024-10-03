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

// Countdown Timers Function
function countdown(endTime, elementId) {
    const end = new Date(endTime).getTime();
    const interval = setInterval(function () {
        const now = new Date().getTime();
        const distance = end - now;

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById(elementId).textContent = "EXAM TIMER STARTED!";
            startExamTimer(elementId);
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById(elementId).textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }, 1000);
}

// Initialize countdown timers
countdown("2024-10-05T19:00:00", "timer1");
countdown("2024-10-09T19:00:00", "timer2");
countdown("2024-10-11T19:00:00", "timer3");
countdown("2024-10-12T11:59:00", "timer4");

// Function to start a 3-hour exam timer after deadline
function startExamTimer(elementId) {
    let examTime = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
    const interval = setInterval(function () {
        examTime -= 1000;

        const hours = Math.floor((examTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((examTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((examTime % (1000 * 60)) / 1000);

        document.getElementById(elementId).textContent = `Exam Time Left: ${hours}h ${minutes}m ${seconds}s`;

        if (examTime < 0) {
            clearInterval(interval);
            document.getElementById(elementId).textContent = "EXAM TIME'S UP!";
        }
    }, 1000);
}

// Matrix Falling Code Background
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = '0123456789ABCDEF';
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = Array(Math.floor(columns)).fill(0);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Slight trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0'; // Green text
    ctx.font = `${fontSize}px monospace`;

    for
