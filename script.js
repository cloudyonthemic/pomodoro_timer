let timerInterval;
let timeInSeconds = 1500;
let isTimeRunning = false;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const minutesInput = document.getElementById('minutesInput');
const setTimerButton = document.getElementById('setTimeButton');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainderSeconds.toString().padStart(2, '0')}`;
}

function updateTimer() {
    timerDisplay.textContent = formatTime(timeInSeconds);
}

function startTimer() {
    if (isTimeRunning) return;
    isTimeRunning = true;
    timerInterval = setInterval(() => {
        timeInSeconds--;
        if (timeInSeconds < 0) {
            clearInterval(timerInterval);
            isTimeRunning = false;
            alert('Pomodoro session completed!');
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

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
setTimerButton.addEventListener('click', setTimer);
minutesInput.addEventListener('input', handleTimerInputChange);
