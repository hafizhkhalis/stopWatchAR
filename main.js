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
}

let lastAlertTime = -1; // Menyimpan detik terakhir yang diberi alert
let resetBackground; // Variabel untuk menyimpan timeout

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

  // Memeriksa apakah detik saat ini adalah kelipatan 10 dan bukan sama dengan detik sebelumnya
  if (seconds > 0 && seconds % 20 === 0 && seconds !== lastAlertTime) {
    document.body.style.backgroundColor = 'red';

    // Menghapus timeout sebelumnya jika ada
    clearTimeout(resetBackground);

    // Mengatur timeout untuk mengembalikan warna latar belakang
    resetBackground = setTimeout(() => {
      document.body.style.backgroundColor = 'white';
    }, 1500);

    lastAlertTime = seconds; // Update detik terakhir yang diberi alert
  }
}
