// Language Support
const translations = {
    en: {
        examCountdown: "Exam Countdown",
        myToDoList: "My To-Do List",
        login: "Login",
        usernamePlaceholder: "Username",
        loginButton: "Login",
        settings: "Settings",
        showMatrix: "Show Matrix Background",
        language: "Language",
        close: "Close",
        expired: "EXPIRED",
        showAllDeadlines: "Show All Deadlines",
        hideAdditionalDeadlines: "Hide Additional Deadlines"
    },
    es: {
        examCountdown: "Cuenta regresiva de exámenes",
        myToDoList: "Mi Lista de Tareas",
        login: "Iniciar sesión",
        usernamePlaceholder: "Nombre de usuario",
        loginButton: "Iniciar sesión",
        settings: "Configuraciones",
        showMatrix: "Mostrar fondo de Matrix",
        language: "Idioma",
        close: "Cerrar",
        expired: "EXPIRADO",
        showAllDeadlines: "Mostrar todas las fechas límite",
        hideAdditionalDeadlines: "Ocultar fechas límite adicionales"
    }
};

let currentLanguage = 'en';

function translatePage() {
    document.querySelectorAll('[data-text]').forEach(el => {
        el.textContent = translations[currentLanguage][el.getAttribute('data-text')];
    });
    document.getElementById('newTodo').placeholder = translations[currentLanguage]['myToDoList'];
    document.getElementById('toggleDeadlines').textContent = translations[currentLanguage]['showAllDeadlines'];
}

translatePage();

// User Authentication
let username = localStorage.getItem('username') || '';

if (!username) {
    document.getElementById('loginModal').style.display = 'block';
}

document.getElementById('loginButton').onclick = function() {
    username = document.getElementById('username').value.trim();
    if (username) {
        localStorage.setItem('username', username);
        document.getElementById('loginModal').style.display = 'none';
    }
};

// Theme Toggle
document.getElementById('themeToggle').onclick = function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', targetTheme);
};

// Settings Panel Toggle
document.getElementById('settingsToggle').onclick = function() {
    document.getElementById('settingsPanel').style.display = 'block';
};

document.getElementById('closeSettings').onclick = function() {
    document.getElementById('settingsPanel').style.display = 'none';
};

// Language Selection
document.getElementById('languageSelect').onchange = function() {
    currentLanguage = this.value;
    translatePage();
};

// Toggle Matrix Background
document.getElementById('toggleMatrix').onchange = function() {
    const canvas = document.getElementById('matrixCanvas');
    canvas.style.display = this.checked ? 'block' : 'none';
};

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

// Exam Data
const exams = [
    {
        id: 1,
        date: 'Oct 5, 2024 00:00:00',
        title: '5th Oct: Data Analyst Associate',
        details: 'Topics to study: SQL, Data Visualization, Excel.'
    },
    {
        id: 2,
        date: 'Oct 9, 2024 00:00:00',
        title: '9th Oct: Data Analyst',
        details: 'Topics to study: Data Mining, Python, R.'
    },
    {
        id: 3,
        date: 'Oct 14, 2024 00:00:00',
        title: '14th Oct: Data Science Associate',
        details: 'Topics to study: Machine Learning Basics, Statistics.'
    },
    {
        id: 4,
        date: 'Oct 19, 2024 00:00:00',
        title: '19th Oct: Data Scientist',
        details: 'Topics to study: Deep Learning, NLP, Advanced Algorithms.'
    },
    {
        id: 5,
        date: 'Oct 23, 2024 00:00:00',
        title: '23rd Oct: Data Engineering Associate',
        details: 'Topics to study: ETL Processes, Database Design.'
    },
    {
        id: 6,
        date: 'Oct 28, 2024 00:00:00',
        title: '28th Oct: Data Engineer',
        details: 'Topics to study: Big Data Technologies, Cloud Platforms.'
    }
];

// Initialize exam start times and notification flags
exams.forEach(exam => {
    exam.startTime = new Date().getTime();
    exam.notified = false;
});

// Countdown Timer Function
function updateCountdown() {
    const now = new Date().getTime();

    exams.forEach(exam => {
        const deadline = new Date(exam.date).getTime();
        const distance = deadline - now;

        const elementId = `timer${exam.id}`;
        const progressId = `progress${exam.id}`;

        if (distance < 0) {
            document.getElementById(elementId).textContent = translations[currentLanguage]['expired'];
            document.getElementById(progressId).value = 100;
            return;
        }

        const totalDuration = deadline - exam.startTime;
        const timeElapsed = now - exam.startTime;
        const progressPercent = (timeElapsed / totalDuration) * 100;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById(elementId).textContent = `${days}D ${hours}H ${minutes}M ${seconds}S`;
        document.getElementById(progressId).value = progressPercent;

        // Notification one day before the exam
        if (days === 1 && !exam.notified) {
            alert(`Reminder: ${exam.title} is in 1 day!`);
            exam.notified = true;
        }
    });
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Exam Modal Functionality
function openExamModal(id) {
    const exam = exams.find(e => e.id === id);
    document.getElementById('examTitle').textContent = exam.title;
    document.getElementById('examDetails').textContent = exam.details;
    document.getElementById('examModal').style.display = 'block';
}

document.getElementById('closeExamModal').onclick = function() {
    document.getElementById('examModal').style.display = 'none';
};

// Toggle Deadlines Display
document.getElementById('toggleDeadlines').onclick = function() {
    const additionalDeadlines = document.getElementById('additional-deadlines');
    if (additionalDeadlines.style.display === 'none') {
        additionalDeadlines.style.display = 'block';
        this.textContent = translations[currentLanguage]['hideAdditionalDeadlines'];
    } else {
        additionalDeadlines.style.display = 'none';
        this.textContent = translations[currentLanguage]['showAllDeadlines'];
    }
};

// To-Do List Functionality with Local Storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        if (todo.done) {
            li.classList.add('done');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.done;
        checkbox.onclick = function() {
            todos[index].done = !todos[index].done;
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        };

        const span = document.createElement('span');
        span.textContent = todo.text;

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.onclick = function() {
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

function addTodo() {
    const todoText = document.getElementById('newTodo').value.trim();
    if (todoText === '') return;

    todos.push({ text: todoText, done: false });
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
    document.getElementById('newTodo').value = '';
}

// Initial render
renderTodos();

// Matrix Falling Code Background with Color Effects
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

function startMatrix() {
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
        ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'dark' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
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
}

startMatrix();
