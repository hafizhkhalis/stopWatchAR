const display = document.getElementById('display');
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(update, 10);
    isRunning = true;
  }
}

function stop() {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
}

function reset() {
  clearInterval(timer);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = '00:00:00:00';
  document.body.style.backgroundColor = 'white';
}

let lastAlertTime = -1; // Menyimpan detik terakhir yang diberi alert
let resetBackground; // Variabel untuk menyimpan timeout
const alertSound = document.getElementById('alertSound');
const alertSound1 = document.getElementById('alertSound1');

function update() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let milliseconds = Math.floor((elapsedTime % 1000) / 10);

  hours = String(hours).padStart(2, '0');
  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');
  milliseconds = String(milliseconds).padStart(2, '0');

  display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;

  // Cek jika menit adalah 1
  if (minutes === '04') {
    stop();
    alertSound1.play();
    document.body.style.backgroundColor = 'red';
    return;
  }

  // Memeriksa apakah detik saat ini adalah kelipatan 20 dan milidetik adalah 0
  if (
    seconds % 20 === 0 &&
    milliseconds === '00' &&
    seconds !== lastAlertTime
  ) {
    alertSound.play();
    document.body.style.backgroundColor = 'pink';

    // Menghapus timeout sebelumnya jika ada
    clearTimeout(resetBackground);

    // Mengatur timeout untuk mengembalikan warna latar belakang
    resetBackground = setTimeout(() => {
      document.body.style.backgroundColor = 'white';
    }, 1500);

    lastAlertTime = seconds; // Update detik terakhir yang diberi alert
  }
}
