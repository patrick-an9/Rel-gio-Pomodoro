let workTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let longBreakTime = 15 * 60; // 15 minutes in seconds
let isWorking = true;
let timer;
let cycle = 0;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const startStopBtn = document.getElementById('start-stop-btn');
const resetBtn = document.getElementById('reset-btn');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateDisplay(time) {
    timerDisplay.textContent = formatTime(time);
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Iniciar';
    } else {
        timer = setInterval(() => {
            if (isWorking) {
                if (workTime > 0) {
                    workTime--;
                    updateDisplay(workTime);
                } else {
                    cycle++;
                    isWorking = false;
                    if (cycle % 4 === 0) {
                        breakTime = longBreakTime;
                    }
                    updateDisplay(breakTime);
                }
            } else {
                if (breakTime > 0) {
                    breakTime--;
                    updateDisplay(breakTime);
                } else {
                    isWorking = true;
                    workTime = 25 * 60;
                    breakTime = 5 * 60;
                    updateDisplay(workTime);
                }
            }
        }, 1000);
        startStopBtn.textContent = 'Pausar';
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timer);
    isWorking = true;
    workTime = 25 * 60;
    breakTime = 5 * 60;
    cycle = 0;
    isRunning = false;
    startStopBtn.textContent = 'Iniciar';
    updateDisplay(workTime);
}

startStopBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay(workTime);
