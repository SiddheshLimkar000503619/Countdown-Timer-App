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
countdown("2024-10-05T19:00:00", "timer1"); // Data Analyst Associate
countdown("2024-10-09T19:00:00", "timer2"); // Data Analyst
countdown("2024-10-14T19:00:00", "timer3"); // Data Science Associate
countdown("2024-10-19T19:00:00", "timer4"); // Data Scientist
countdown("2024-10-23T19:00:00", "timer5"); // Data Engineering Associate
countdown("2024-10-28T19:00:00", "timer6"); // Data Engineer

// Function to add tasks with a checkbox and numbering
function addTodo() {
    const taskText = document.getElementById('newTodo').value;
    if (taskText === '') return;

    const todoList = document.getElementById('todoList');
    const newTask = document.createElement('li');
    newTask.innerHTML = `<input type="checkbox" onclick="completeTask(this)"> <span>${taskText}</span>`;
    todoList.appendChild(newTask);

    document.getElementById('newTodo').value = ''; // Clear input
}

// Function to mark tasks as completed
function completeTask(checkbox) {
    const taskItem = checkbox.nextElementSibling;
    if (checkbox.checked) {
        taskItem.style.textDecoration = 'line-through';
        taskItem.style.color = '#999'; // dull font
    } else {
        taskItem.style.textDecoration = 'none';
        taskItem.style.color = '#fff';
    }
}

// Matrix Falling Code Background with Gaming RGB Breathing Effect
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = '0123456789ABCDEF';
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = Array(Math.floor(columns)).fill(0);

let red = 255, green = 0, blue = 0;
let colorDirection = 1; // For smooth RGB cycling

// Function to create random shift times between 3 to 5 seconds
function getRandomShiftTime() {
    return Math.random() * (5000 - 3000) + 3000; // Random time between 3s and 5s
}

// Function to smoothly cycle through RGB colors for gaming effect
function shiftMatrixColor() {
    if (colorDirection === 1) {
        green += 5;
        if (green >= 255) colorDirection = 2;
    } else if (colorDirection === 2) {
        red -= 5;
        if (red <= 0) colorDirection = 3;
    } else if (colorDirection === 3) {
        blue += 5;
        if (blue >= 255) colorDirection = 4;
    } else if (colorDirection === 4) {
        green -= 5;
        if (green <= 0) colorDirection = 5;
    } else if (colorDirection === 5) {
        blue -= 5;
        red += 5;
        if (red >= 255) colorDirection = 1;
    }
}

function getMatrixColor() {
    return `rgb(${red},${green},${blue})`;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Slight trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = getMatrixColor(); // Dynamic matrix color based on RGB effect
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(shiftMatrixColor, getRandomShiftTime()); // Random shift times
setInterval(drawMatrix, 33); // Adjust speed of falling code
