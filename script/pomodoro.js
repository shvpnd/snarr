let timer, isRunning = false, timeLeft;
let pomodoroDuration = 25 * 60, breakDuration = 5 * 60;
let isBreakTime = false;

const elements = {
    minutesDisplay: document.getElementById('minutes'),
    secondsDisplay: document.getElementById('seconds'),
    resetButton: document.getElementById('reset'),
    pomodoroInput: document.getElementById('pomodoroDuration'),
    breakInput: document.getElementById('breakDuration'),
    pomodoroValue: document.getElementById('pomodoroValue'),
    breakValue: document.getElementById('breakValue'),
    timerDisplay: document.getElementById('timer')
};

const loadSettings = () => {
    const savedPomodoro = localStorage.getItem('pomodoroDuration');
    const savedBreak = localStorage.getItem('breakDuration');

    if (savedPomodoro) {
        pomodoroDuration = parseInt(savedPomodoro) * 60;
        elements.pomodoroInput.value = savedPomodoro;
        elements.pomodoroValue.textContent = `${savedPomodoro} minutes`;
    }

    if (savedBreak) {
        breakDuration = parseInt(savedBreak) * 60;
        elements.breakInput.value = savedBreak;
        elements.breakValue.textContent = `${savedBreak} minutes`;
    }

    timeLeft = pomodoroDuration;
    updateDisplay();
    updateResetButtonText();
};

const updateDisplay = () => {
    elements.minutesDisplay.textContent = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    elements.secondsDisplay.textContent = String(timeLeft % 60).padStart(2, '0');
};

const updateResetButtonText = () => {
    elements.resetButton.textContent = isBreakTime ? "Break Time" : "Work Time";
};

const updateTimer = () => {
    if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        playSound();

        if (isBreakTime) {
            timeLeft = pomodoroDuration;
            isBreakTime = false;
        } else {
            timeLeft = breakDuration;
            isBreakTime = true;
        }
        updateDisplay();
        updateResetButtonText();
        timer = setInterval(updateTimer, 1000);
        return;
    }
    timeLeft--;
    updateDisplay();
};

const playSound = () => {
    const audio = new Audio('alarm.mp3');
    audio.play();
};

const saveSettings = () => {
    localStorage.setItem('pomodoroDuration', pomodoroDuration / 60);
    localStorage.setItem('breakDuration', breakDuration / 60);
};

const updateRangeBackground = (input) => {
    const value = input.value;
    const min = input.min ? input.min : 0;
    const max = input.max ? input.max : 100;
    const percentage = (value - min) / (max - min) * 100;
    input.style.background = `linear-gradient(to right, #583119 ${percentage}%, #505050 ${percentage}%)`;
};

updateRangeBackground(elements.pomodoroInput);
updateRangeBackground(elements.breakInput);

elements.pomodoroInput.addEventListener('input', () => {
    pomodoroDuration = parseInt(elements.pomodoroInput.value) * 60;
    elements.pomodoroValue.textContent = `${elements.pomodoroInput.value} minutes`;
    saveSettings();
    if (!isRunning) {
        timeLeft = pomodoroDuration;
        updateDisplay();
    }
    updateRangeBackground(elements.pomodoroInput);
});

elements.breakInput.addEventListener('input', () => {
    breakDuration = parseInt(elements.breakInput.value) * 60;
    elements.breakValue.textContent = `${elements.breakInput.value} minutes`;
    saveSettings();
    updateRangeBackground(elements.breakInput);
});

elements.timerDisplay.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        timeLeft = pomodoroDuration; 
        updateDisplay();
        updateResetButtonText(); 
        timer = setInterval(updateTimer, 1000);
    }
});

elements.resetButton.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    timeLeft = pomodoroDuration; 
    isBreakTime = false; 
    updateDisplay();
    updateResetButtonText(); 
});

loadSettings();
