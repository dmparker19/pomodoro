let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const toggleModeButton = document.getElementById('toggle-mode');
const taskInput = document.getElementById('task-input');
const saveTaskButton = document.getElementById('save-task');
const currentTaskDisplay = document.querySelector('.current-task');
let currentTask = '';

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    const mode = isWorkTime ? 'Work' : 'Rest';
    const taskString = currentTask && isWorkTime ? ` - ${currentTask}` : '';
    document.title = `(${timeString}) ${mode}${taskString}`;
}

function updateTaskVisibility() {
    const taskElements = document.querySelector('.task-input');
    const currentTaskDisplay = document.querySelector('.current-task');
    
    if (isWorkTime) {
        taskElements.style.display = 'flex';
        currentTaskDisplay.style.display = 'block';
    } else {
        taskElements.style.display = 'none';
        currentTaskDisplay.style.display = 'none';
    }
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Rest Time';
    toggleModeButton.textContent = isWorkTime ? 'Switch to Rest Mode' : 'Switch to Work Mode';
    updateDisplay();
    updateTaskVisibility();
}

function startTimer() {
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = WORK_TIME;
        }
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                switchMode();
                startTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    updateDisplay();
}

function saveTask() {
    currentTask = taskInput.value.trim();
    if (currentTask) {
        currentTaskDisplay.textContent = `Focus: ${currentTask}`;
        taskInput.value = '';
        updateDisplay();
    }
}

// Event Listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
toggleModeButton.addEventListener('click', switchMode);
saveTaskButton.addEventListener('click', saveTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveTask();
    }
});

// Initialize
timeLeft = WORK_TIME;
updateDisplay();
updateTaskVisibility(); 