let canvas;
let world;
let keyboard = new Keyboard();
let muted = false;
let stoppableIntervalIds = [];
let defaultSounds = [];
let gameStartedOnce = false;

window.addEventListener("keydown", (event) => {
  if (event.code == "Space") {
    keyboard.SPACE = true;
  }
  if (event.code == "ArrowUp") {
    keyboard.UP = true;
  }
  if (event.code == "ArrowDown") {
    keyboard.DOWN = true;
  }
  if (event.code == "ArrowLeft") {
    keyboard.LEFT = true;
  }
  if (event.code == "ArrowRight") {
    keyboard.RIGHT = true;
  }
  if (event.code == "KeyD") {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code == "Space") {
    keyboard.SPACE = false;
  }
  if (event.code == "ArrowUp") {
    keyboard.UP = false;
  }
  if (event.code == "ArrowDown") {
    keyboard.DOWN = false;
  }
  if (event.code == "ArrowLeft") {
    keyboard.LEFT = false;
  }
  if (event.code == "ArrowRight") {
    keyboard.RIGHT = false;
  }
  if (event.code == "KeyD") {
    keyboard.D = false;
  }
});

function init() {
  touchDeviceOrKeyboard();
  canvas = document.getElementById("canvas");
  addEventListeners();
  addEventListenersForMobileActionButtons();
  addOrientationListeners();
}

function touchDeviceOrKeyboard() {
  if ("ontouchstart" in window) {
    document.documentElement.classList.add("htmlScroll");
    checkOrientation();
    changeClassesForTouchDeviceDesign();
    window.addEventListener("orientationchange", checkOrientation);
    document.addEventListener("contextmenu", (event) => event.preventDefault());
  }
}

function changeClassesForTouchDeviceDesign() {
  document.getElementById("circle").classList.add("fillCircle");
  document.getElementById("polygon").classList.add("fillPolygon");
  document.getElementById("buttons").classList.remove("buttonsDesktop");
  document.getElementById("buttons").classList.add("buttonsMobile");
  document.getElementById("mobileActionButtons").classList.remove("dNone");
  document.getElementById("infoText").classList.remove("infoTextDesktop");
  document.getElementById("infoText").classList.add("infoTextMobile");
}

function addOrientationListeners() {
  window.addEventListener("orientationchange", checkOrientation);
  window.addEventListener("resize", checkOrientation);
}

function addEventListeners() {
  document
    .getElementById("startButton")
    .addEventListener("click", function (event) {
      let clickCircle = event.target.classList.contains("circleStartButton");
      let clickPolygon = event.target.tagName === "polygon";
      if (clickCircle || clickPolygon) {
        startGame();
      }
    });
}

function addEventListenersForMobileActionButtons() {
  document.getElementById("buttonThrow").addEventListener("touchstart", (e) => {
    keyboard.D = true;
  });
  document.getElementById("buttonThrow").addEventListener("touchend", (e) => {
    keyboard.D = false;
  });
  document.getElementById("buttonJump").addEventListener("touchstart", (e) => {
    keyboard.UP = true;
  });
  document.getElementById("buttonJump").addEventListener("touchend", (e) => {
    keyboard.UP = false;
  });
  document.getElementById("buttonLeft").addEventListener("touchstart", (e) => {
    keyboard.LEFT = true;
  });
  document.getElementById("buttonLeft").addEventListener("touchend", (e) => {
    keyboard.LEFT = false;
  });
  document.getElementById("buttonRight").addEventListener("touchstart", (e) => {
    keyboard.RIGHT = true;
  });
  document.getElementById("buttonRight").addEventListener("touchend", (e) => {
    keyboard.RIGHT = false;
  });
  preventTouchNextToButtons();
}

document.addEventListener("DOMContentLoaded", checkOrientation);

function checkOrientation() {
  setTimeout(() => {
    let overlay = document.getElementById("orientationOverlay");
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    overlay.offsetHeight;

    if (height > width) {
      if (/Android/i.test(navigator.userAgent)) minimize();
      overlay.classList.remove("dNone");
    } else {
      overlay.classList.add("dNone");
    }
  }, 10);
}

function minimize() {
  document.getElementById("fullscreen").classList.remove("dNone");
  document.getElementById("minimize").classList.add("dNone");

  let wrapper = document.getElementById("wrapper");
  wrapper.classList.remove("fullscreenApple");

  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
  addBorderRadius();
}

function addBorderRadius() {
  for (let rule of document.styleSheets[0].cssRules) {
    if (rule.style.borderRadius) {
      rule.style.borderRadius = "2vw";
    }
  }
}

function startGame() {
  if ("ontouchstart" in window) fullscreen();
  removeStartscreen();
  startNewGame();
  gameStartedOnce = true;
}

function removeStartscreen() {
  document.getElementById("startButton").classList.add("dNone");
  document.getElementById("startscreen").classList.add("dNone");
}

function startNewGame() {
  saveDefaultSettingsSounds();
  initLevel();
  world = new World(canvas, keyboard);
  playSound("backgroundMusicGame");
}

function saveDefaultSettingsSounds() {
  defaultSounds = JSON.parse(JSON.stringify(sounds));
}

function preventTouchNextToButtons() {
  ["mobileActionButtons", "canvas"].forEach((id) =>
    document.getElementById(id).addEventListener("touchstart", (e) => {
      if (!e.target.classList.contains("mobileActionButton"))
        e.preventDefault();
    })
  );
}

function muteUnmute() {
  let img = document.getElementById("muteUnmute");
  img.src.includes("img/mute.png") ? mute(img) : unmute(img);
}

function mute(img) {
  img.src = "img/unmute.png";
  muted = true;
  Object.keys(sounds).forEach((sound) => (sounds[sound].audio.muted = true));
}

function unmute(img) {
  img.src = "img/mute.png";
  muted = false;
  Object.keys(sounds).forEach((sound) => {
    let audio = sounds[sound].audio;
    let theoreticalStartTime = sounds[sound].theoreticalStartTime;

    audio.muted = false;
    if (theoreticalStartTimeIsSaved(theoreticalStartTime)) {
      startAtNewCurrentTime(audio, theoreticalStartTime);
    }
  });
}

function theoreticalStartTimeIsSaved(theoreticalStartTime) {
  return theoreticalStartTime !== undefined;
}

function startAtNewCurrentTime(audio, theoreticalStartTime) {
  audio.currentTime =
    audio.currentTime + (Date.now() - theoreticalStartTime) / 1000;
  audio.play();
  delete theoreticalStartTime;
}

function playSound(soundName) {
  let currentSound = setSound(soundName);
  muted 
  ? (sounds[soundName].theoreticalStartTime = Date.now(), currentSound.pause()) 
  : currentSound.play();
}

function setSound(soundName) {
  let currentSound = setVolume(soundName);
  currentSound.currentTime = sounds[soundName].currentTime;
  return currentSound;
}

function setVolume(soundName) {
  let currentSound = sounds[soundName].audio;
  currentSound.volume = sounds[soundName].currentVolume;
  return currentSound;
}

function pauseSound(soundName) {
  let currentSound = sounds[soundName];
  currentSound.audio.pause();
  delete currentSound.theoreticalStartTime;
}

function setStoppableInterval(fn, time) {
  let id = setInterval(() => fn(id), time);
  stoppableIntervalIds.push(id);
}

function displayEndscreen() {
  let endscreen = document.getElementById("endscreen");
  if (world.endboss.isDead()) displayEndscreenWon(endscreen);
  if (gameIsLost()) displayEndsreenLost(endscreen);
  document.getElementById("restartEndscreen").classList.remove("dNone");
}

function displayEndscreenWon(endscreen) {
  endscreen.src = "img/9_intro_outro_screens/win/win_1.png";
  endscreen.classList.remove("dNone", "endscreenGameOver");
  endscreen.classList.add("endscreenYouWin");
  document.getElementById("overlay").classList.remove("dNone");
}

function gameIsLost() {
  return world.character.isDead() || world.endboss.x < -343;
}

function displayEndsreenLost(endscreen) {
  endscreen.src = "img/9_intro_outro_screens/game_over/game over.png";
  endscreen.classList.remove("dNone", "endscreenYouWin");
  endscreen.classList.add("endscreenGameOver");
}

function restart() {
  world.gameOverStopDrawing = true;
  restartSounds();
  restartIntervals();
  restartClasses();
  startGame();
}

function restartSounds() {
  pauseSound("mexicanHatDance");
  pauseSound("endbossBackgroundMusic");
  resetSounds();
}

function resetSounds() {
  Object.keys(sounds).forEach((sound) => {
    sounds[sound].currentVolume = defaultSounds[sound].currentVolume;
    sounds[sound].currentTime = defaultSounds[sound].currentTime;
  });
}

function restartIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
  stoppableIntervalIds = [];
}

function restartClasses() {
  document.getElementById("endscreen").classList.add("dNone");
  document.getElementById("overlay").classList.add("dNone");
  document.getElementById("restartEndscreen").classList.add("dNone");
}

function fullscreen() {
  fullscreenClasses();
  wrapperToFullscreen();
  removeBorderRadius();
}

function fullscreenClasses() {
  document.getElementById("fullscreen").classList.add("dNone");
  document.getElementById("minimize").classList.remove("dNone");
}

function wrapperToFullscreen() {
  let wrapper = document.getElementById("wrapper");
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    wrapper.classList.add("fullscreenApple");
  } else {
    if (wrapper.requestFullscreen) {
      wrapper.requestFullscreen();
    } else if (wrapper.mozRequestFullScreen) {
      wrapper.mozRequestFullScreen();
    } else if (wrapper.webkitRequestFullscreen) {
      wrapper.webkitRequestFullscreen();
    } else if (wrapper.msRequestFullscreen) {
      wrapper.msRequestFullscreen();
    }
  }
}

function removeBorderRadius() {
  for (let rule of document.styleSheets[0].cssRules) {
    if (rule.style.borderRadius) rule.style.borderRadius = "0";
  }
}

function openInfo() {
  event.stopPropagation();
  document.getElementById("infoText").classList.remove("dNone");
  document.getElementById("clickBarrier").classList.remove("dNone");
  document.getElementById("startButton").classList.add("dNone");
  document.getElementById("infoButton").setAttribute("onclick", "closeInfo()");
}

function closeInfo() {
  document.getElementById("infoText").classList.add("dNone");
  document.getElementById("clickBarrier").classList.add("dNone");
  if (!gameStartedOnce)
    document.getElementById("startButton").classList.remove("dNone");
  document.getElementById("infoButton").setAttribute("onclick", "openInfo()");
}