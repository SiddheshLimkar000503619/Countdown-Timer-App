// Language Support
const translations = {
    en: {
        examCountdown: "Exam Countdown",
        myToDoList: "My To-Do List",
        showAllDeadlines: "Show All Deadlines",
        hideAdditionalDeadlines: "Hide Additional Deadlines",
        expired: "EXPIRED"
    },
    es: {
        examCountdown: "Cuenta regresiva de exámenes",
        myToDoList: "Mi Lista de Tareas",
        showAllDeadlines: "Mostrar todas las fechas límite",
        hideAdditionalDeadlines: "Ocultar fechas límite adicionales",
        expired: "EXPIRADO"
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

// Welcome Modal Functionality
document.getElementById('welcomeModal').style.display = 'block';

// Hide the modal when Enter key is pressed
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('welcomeModal').style.display = 'none';
    }
});

// Hide the modal when the "Enter" button is clicked
document.getElementById('enterButton').onclick = function() {
    document.getElementById('welcomeModal').style.display = 'none';
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
    const t
