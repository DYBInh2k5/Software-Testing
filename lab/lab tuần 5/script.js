const states = [
  { name: "S01 - EW_AllRed", duration: 2, active: ["north-red","south-red","east-red","west-red"] },
  { name: "S02 - EW_Green", duration: 5, active: ["north-red","south-red","east-green","west-green"] },
  { name: "S03 - EW_Yellow", duration: 2, active: ["north-red","south-red","east-yellow","west-yellow"] },
  { name: "S04 - NS_AllRed", duration: 2, active: ["north-red","south-red","east-red","west-red"] },
  { name: "S05 - NS_Green", duration: 5, active: ["north-green","south-green","east-red","west-red"] },
  { name: "S06 - NS_Yellow", duration: 2, active: ["north-yellow","south-yellow","east-red","west-red"] },
];

let current = 0;
let timer;
let countdownInterval;
let nightMode = false;
let emergency = false;
let countdownValue = 0;

function setLamps(activeList) {
  document.querySelectorAll(".lamp").forEach(l => l.classList.remove("active"));
  activeList.forEach(id => {
    const [dir, color] = id.split("-");
    document.querySelector(`.${dir} .${color}`).classList.add("active");
  });
}

function updateCountdown(seconds) {
  document.querySelectorAll(".countdown").forEach(el => (el.textContent = "--"));
  states[current].active.forEach(id => {
    const dir = id.split("-")[0];
    document.getElementById(`timer-${dir}`).textContent = seconds;
  });
}

function nextState() {
  if (nightMode) return;
  clearInterval(countdownInterval);
  current = (current + 1) % states.length;
  const s = states[current];
  document.getElementById("stateName").innerText = s.name;
  setLamps(s.active);
  countdownValue = s.duration;
  updateCountdown(countdownValue);

  countdownInterval = setInterval(() => {
    countdownValue--;
    updateCountdown(countdownValue);
    if (countdownValue <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  timer = setTimeout(nextState, s.duration * 1000);
}

function startCycle() {
  clearTimeout(timer);
  const s = states[current];
  document.getElementById("stateName").innerText = s.name;
  setLamps(s.active);
  countdownValue = s.duration;
  updateCountdown(countdownValue);

  countdownInterval = setInterval(() => {
    countdownValue--;
    updateCountdown(countdownValue);
    if (countdownValue <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  timer = setTimeout(nextState, s.duration * 1000);
}

// 🎯 Pedestrian
document.getElementById("ped").onclick = () => alert("Pedestrian crossing requested! Will activate next safe phase.");

// 🚒 Emergency mode
document.getElementById("emergency").onclick = () => {
  clearTimeout(timer);
  clearInterval(countdownInterval);
  emergency = true;
  document.getElementById("stateName").innerText = "🚨 Emergency Mode (All Red)";
  setLamps(["north-red","south-red","east-red","west-red"]);
  document.querySelectorAll(".countdown").forEach(el => (el.textContent = "--"));
  setTimeout(() => {
    document.getElementById("stateName").innerText = "🚨 Emergency Green North-South";
    setLamps(["north-green","south-green","east-red","west-red"]);
    setTimeout(() => {
      emergency = false;
      startCycle();
    }, 4000);
  }, 2000);
};

// 🌙 Night Mode
document.getElementById("night").onclick = () => {
  nightMode = !nightMode;
  clearTimeout(timer);
  clearInterval(countdownInterval);
  if (nightMode) {
    document.getElementById("stateName").innerText = "🌙 Night Flashing Yellow";
    document.querySelectorAll(".lamp").forEach(l => l.classList.remove("active"));
    flashYellow();
  } else {
    startCycle();
  }
};

function flashYellow() {
  if (!nightMode) return;
  document.querySelectorAll(".lamp").forEach(l => l.classList.remove("active"));
  document.querySelectorAll(".yellow").forEach(l => l.classList.toggle("active"));
  setTimeout(flashYellow, 600);
}

// ⏭ Manual Step
document.getElementById("next").onclick = () => {
  clearTimeout(timer);
  clearInterval(countdownInterval);
  nextState();
};

startCycle();
