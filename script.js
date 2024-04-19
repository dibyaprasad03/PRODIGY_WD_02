let startTime;
let running = false;
let interval;
let laps = [];

function startPause() {
  if (running) {
    clearInterval(interval);
    running = false;
    document.getElementById('startPause').innerText = 'Start';
  } else {
    startTime = Date.now() - (laps.length > 0 ? laps.reduce((acc, lap) => acc + lap, 0) : 0);
    interval = setInterval(updateDisplay, 10);
    running = true;
    document.getElementById('startPause').innerText = 'Pause';
  }
}

function reset() {
  clearInterval(interval);
  running = false;
  document.getElementById('startPause').innerText = 'Start';
  document.getElementById('display').innerText = '00:00:00';
  laps = [];
  document.getElementById('laps').innerHTML = '';
}

function lap() {
  const currentTime = Date.now();
  const lapTime = currentTime - startTime;
  laps.push(lapTime);
  const lapItem = document.createElement('li');
  lapItem.innerText = formatTime(lapTime);
  document.getElementById('laps').appendChild(lapItem);
}

function updateDisplay() {
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;
  document.getElementById('display').innerText = formatTime(elapsedTime);
}

function formatTime(time) {
  const totalSeconds = Math.floor(time / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((time % 1000) / 10);
  return `${padNumber(minutes)}:${padNumber(seconds)}:${padNumber(milliseconds)}`;
}

function padNumber(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

document.getElementById('startPause').addEventListener('click', startPause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);