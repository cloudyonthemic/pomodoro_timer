let timerInterval;
let breakInterval;
let timeInSeconds = 1500; // 25 minutes
let breakTimeInSeconds = 300; // 5 minutes
let isTimeRunning = false;
let isBreakTimeRunning = false;
let sessionCounter = 0; // Initialize session counter
let breakCounter = 0; // Initialize break counter

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const minutesInput = document.getElementById('minutesInput');
const setTimerButton = document.getElementById('setTimeButton');
const sessionCounterElement = document.getElementById('sessionCounter'); // Session counter element
const breakCounterElement = document.getElementById('breakCounter'); // Break counter element
const currentYear = new Date().getFullYear();

const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = currentYear;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainderSeconds.toString().padStart(2, '0')}`;
}

function updateTimer() {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const displayMinutes = minutes.toString().padStart(2, '0');
    const displaySeconds = seconds.toString().padStart(2, '0');

    if (timeInSeconds >= 0) {
        timerDisplay.textContent = `${displayMinutes}:${displaySeconds}`;
    } else {
        timerDisplay.textContent = '00:00'; // Display 00:00 when time goes below zero
        if (sessionCounter > 0) {
            startBreakTime();
        }
    }
}

function updateBreakTimer() {
    const minutes = Math.floor(breakTimeInSeconds / 60);
    const seconds = breakTimeInSeconds % 60;
    const displayMinutes = minutes.toString().padStart(2, '0');
    const displaySeconds = seconds.toString().padStart(2, '0');
    
    if (breakTimeInSeconds >= 0) {
        timerDisplay.textContent = `${displayMinutes}:${displaySeconds}`;
    } else {
        timerDisplay.textContent = '00:00'; // Display 00:00 when break time goes below zero
        stopBreakTime();
    }
}

function startTimer() {
    if (isTimeRunning) return;
    isTimeRunning = true;
    timerInterval = setInterval(() => {
        timeInSeconds--;
        if (timeInSeconds < 0) {
            clearInterval(timerInterval);
            isTimeRunning = false;
            sessionCounter++; // Increment the session counter
            updateSessionCounter(); // Update the session counter in the HTML
            if (sessionCounter > 0) {
                startBreakTime();
            }
        }
        updateTimer();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    isTimeRunning = false;
}

function resetTimer() {
    stopTimer();
    timeInSeconds = 1500; // Reset to 25 minutes (1500 seconds)
    updateTimer();
}

function setTimer() {
    const minutes = parseInt(minutesInput.value);
    if (!isNaN(minutes) && minutes > 0 && minutes <= 120) {
        timeInSeconds = minutes * 60;
        updateTimer();
    } else {
        alert('Please enter a valid number of minutes (1-120).');
    }
}

function handleTimerInputChange() {
    const minutes = parseInt(minutesInput.value);
    if (!isNaN(minutes) && minutes > 0 && minutes <= 120) {
        timeInSeconds = minutes * 60;
    }
}

function updateSessionCounter() {
    sessionCounterElement.textContent = `Sessions completed: ${sessionCounter}`;
}

function startBreakTime() {
    if (isBreakTimeRunning) return;
    isBreakTimeRunning = true;
    breakInterval = setInterval(() => {
        breakTimeInSeconds--;
        if (breakTimeInSeconds < 0) {
            clearInterval(breakInterval);
            isBreakTimeRunning = false;
            startTimer();
            breakCounter++; // Increment the break counter
            updateBreakCounter(); // Update the break counter in the HTML
        }
        updateBreakTimer();
    }, 1000);
}

function stopBreakTime() {
    clearInterval(breakInterval);
    isBreakTimeRunning = false;
    breakTimeInSeconds = 300; // Reset break time to 5 minutes
    updateTimer();
}

function updateBreakCounter() {
    breakCounterElement.textContent = `Breaks taken: ${breakCounter}`;
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
setTimerButton.addEventListener('click', setTimer);
minutesInput.addEventListener('input', handleTimerInputChange);
