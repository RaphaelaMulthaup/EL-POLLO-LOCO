let canvas;
let world;
let keyboard = new Keyboard();
let muted = false;
let stoppableIntervalIds = [];
let defaultSounds = [];
let gameStartedOnce = false;

/**
 * This function adds code listens for the load event to ensure all page resources are fully loaded before hiding the loading overlay by setting its display property to none.
 */
// window.addEventListener("load", () => {
//   document.getElementById("loadingOverlay").style.display = "none";
// });

/**
 * This function adds a keydown listener for the ESC key.
 */
window.addEventListener("keydown", (event) => {
  if (event.code == "Escape") { 
    minimize();
  }
});

/**
 * This function adds an event listener that calls the minimize() function if fullscreen mode is exited.
 */
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    minimize();
  }
});

/**
 * This event listener sets variables that represent keyboard keys to true when the corresponding key was pressed down.
 */
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

/**
 * This event listener sets variables that represent keyboard keys to false when the corresponding key has been released.
 */
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

/**
 * As soon as the page has finished loading, this function checks whether the game is being played on a touch device or a desktop computer, the canvas is passed to an appropriate variable and various event listeners and an orientation listener are set up.
 */
function init() {
  touchDeviceOrKeyboard();
  canvas = document.getElementById("canvas");
  addEventListeners();
  addEventListenersForMobileActionButtons();
  addOrientationListeners();
  getMuteStatus();
}

/**
 * This function checks what kind of device the game is being played on. If it is a touch device, a function is called to set up the game accordingly. Otherwise a class with overflow hidden is added.
 */
function touchDeviceOrKeyboard() {
  if ("ontouchstart" in window) {
    setUpTouchDevice();
  } else {
    document.documentElement.classList.add("htmlOverflowHidden");
  }
}

/**
 * This function checks the orientation of the screen and adds an event listener that checks the orientation again on every orientationchange. In addition, some classes for touch divices are changed and an event listener prevents a context menu from being opened by touch gestures.
 */
function setUpTouchDevice() {
  checkOrientation();
  window.addEventListener("orientationchange", checkOrientation);
  changeClassesForTouchDeviceDesign();
  document.addEventListener("contextmenu", (event) => event.preventDefault());
}

/**
 * This function modifies some classes. Minimal scrolling is allowed, the start button is made permanently visible, the buttons, the explanation bar and the information text are adapted for the mobile version and the mobile action buttons are made visible.
 */
function changeClassesForTouchDeviceDesign() {
  document.documentElement.classList.add("htmlScroll");
  document.getElementById("circle").classList.add("fillCircle");
  document.getElementById("polygon").classList.add("fillPolygon");
  document.getElementById("buttons").classList.remove("buttonsDesktop");
  document.getElementById("buttons").classList.add("buttonsMobile");
  document.getElementById("mobileActionButtons").classList.remove("dNone");
  document.getElementById("infoText").classList.remove("infoTextDesktop");
  document.getElementById("infoText").classList.add("infoTextMobile");
  document.getElementById("explanationBarThrowingD").classList.add("dNone");
  document.getElementById("explanationBarThrowingBottle").classList.remove("dNone");
  document.getElementById("space").classList.add("dNone");
  document.getElementById("fullscreen").classList.add("dNone");
  document.getElementById("home").classList.remove("dNone");
}

/**
 * This function adds two event listeners that call the check orientation function on orientationchange and resize.
 */
function addOrientationListeners() {
  window.addEventListener("orientationchange", checkOrientation);
  window.addEventListener("resize", checkOrientation);
}

/**
 * This function adds an event listener to the start button. If the button or its child element is clicked, the game is started.
 */
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

/**
 * This function adds event listeners to the mobile action buttons to simulate key presses when touched. It also prevents unwanted touch interactions near the buttons.
 */
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

/**
 * This function checks the screen orientation and displays an overlay if the orientation is incorrect. It also adjusts classes for mobile designs.
 */
function checkOrientation() {
  setTimeout(() => {
    let overlay = document.getElementById("orientationOverlay");
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    overlay.offsetHeight;

    if (height > width) {
      document.getElementById("body").classList.add("overflowHidden");
      document.documentElement.classList.remove("htmlScroll");
      document.documentElement.classList.add("htmlOverflowHidden");
      if (/Android/i.test(navigator.userAgent)) minimize();
      overlay.classList.remove("dNone");
    } else {
      overlay.classList.add("dNone");
      document.getElementById("body").classList.remove("overflowHidden");
      document.documentElement.classList.add("htmlScroll");
      document.documentElement.classList.remove("htmlOverflowHidden");
    }
  }, 10);
}

/**
 * This function exit the fullscreen mode, showes the fullscreen button and hides the minimize button, and adds a border radius to specific elements.
 */
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

/**
 * This function iterates through the CSS rules to add a border radius to elements that have it defined.
 */
function addBorderRadius() {
  for (let rule of document.styleSheets[0].cssRules) {
    if (rule.style.borderRadius) {
      rule.style.borderRadius = "2vw";
    }
  }
}

/**
 * This function removes the start screen and starts a new game by setting up a new game world. On a touch device it changes to fullscreen mode and the boolea 'gameStartedOnce' is set to true.
 */
function startGame() {
  if ("ontouchstart" in window) fullscreen();
  removeStartscreen();
  startNewGame();
  gameStartedOnce = true;
}

/**
 * This function hides the start screen and the start button.
 */
function removeStartscreen() {
  document.getElementById("startButton").classList.add("dNone");
  document.getElementById("startscreen").classList.add("dNone");
}

/**
 * This function saves the default settings of the sounds initializes the game level, sets up the world object, and starts the background music.
 */
function startNewGame() {
  saveDefaultSettingsSounds();
  initLevel();
  world = new World(canvas, keyboard);
  playSound("backgroundMusicGame");
}

/**
 * This function saves the default sound settings by making a copy of the sound configuration.
 */
function saveDefaultSettingsSounds() {
  defaultSounds = JSON.parse(JSON.stringify(sounds));
}

/**
 * This function prevents touch gestures near specific elements from triggering unintended actions.
 */
function preventTouchNextToButtons() {
  ["mobileActionButtons", "canvas"].forEach((id) =>
    document.getElementById(id).addEventListener("touchstart", (e) => {
      if (!e.target.classList.contains("mobileActionButton"))
        e.preventDefault();
    })
  );
}

/**
 * This function creates an interval that can be stopped manually later and pushes the associated id into the array 'stoppableIntervalIds'.
 *
 * @param {function} fn - A function that repeats through an interval.
 * @param {number} time - the time period in milliseconds after which the interval should be repeated
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(() => fn(id), time);
  stoppableIntervalIds.push(id);
}

/**
 * This function displays the end screen based on game status (win or loss)
 */
function displayEndscreen() {
  let endscreen = document.getElementById("endscreen");
  if (world.endboss.isDead()) displayEndscreenWon(endscreen);
  if (gameIsLost()) displayEndsreenLost(endscreen);
  document.getElementById("restartEndscreen").classList.remove("dNone");
}

/**
 * This function displays the endscreen in case the game has been won.
 *
 * @param {html element} endscreen - the endscreen of the game
 */
function displayEndscreenWon(endscreen) {
  endscreen.src = "img/9_intro_outro_screens/win/win_1.png";
  endscreen.classList.remove("dNone", "endscreenGameOver");
  endscreen.classList.add("endscreenYouWin");
  document.getElementById("overlay").classList.remove("dNone");
}

/**
 * This function checks if the game has been lost (either character is dead or endboss is out of bounds).
 *
 * @returns {boolean}  Returns `true` if the game has been lost, otherwise `false`.
 */
function gameIsLost() {
  return world.character.isDead() || world.endboss.x < -343;
}

/**
 * This function displays the endscreen in case the game was lost.
 *
 * @param {html element} endscreen - the endscreen of the game
 */
function displayEndsreenLost(endscreen) {
  endscreen.src = "img/9_intro_outro_screens/game_over/game over.png";
  endscreen.classList.remove("dNone", "endscreenYouWin");
  endscreen.classList.add("endscreenGameOver");
}

/**
 * This function restarts the game. If the game has been already started once, by resetting relevant elements and sounds.
 */
function restart() {
  if (gameStartedOnce) {
    world.gameOverStopDrawing = true;
    restartSounds();
    restartIntervals();
    restartClasses();
  }
  startGame();
}

/**
 * This function clears all active intervals.
 */
function restartIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
  stoppableIntervalIds = [];
}

/**
 * This function resets the end screen and overlay classes.
 */
function restartClasses() {
  document.getElementById("endscreen").classList.add("dNone");
  document.getElementById("overlay").classList.add("dNone");
  document.getElementById("restartEndscreen").classList.add("dNone");
}

/**
 * This function switches the game to fullscreen mode.
 */
function fullscreen() {
  fullscreenClasses();
  wrapperToFullscreen();
  removeBorderRadius();
}

/**
 * This function swaps the fullscreen icon for the minimize icon, if it is a desktop device.
 */
function fullscreenClasses() {
  document.getElementById("fullscreen").classList.add("dNone");
  if (!("ontouchstart" in window)) {
    document.getElementById("minimize").classList.remove("dNone");
  }
}

/**
 * This function adjusts the wrapper to fullscreen based on the device.
 */
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

/**
 * This function removes border-radius styles from the game for fullscreen mode.
 */
function removeBorderRadius() {
  for (let rule of document.styleSheets[0].cssRules) {
    if (rule.style.borderRadius) rule.style.borderRadius = "0";
  }
}

/**
 * This function opens the information overlay and the info button is assigned a onclick attribute to close the info.
 */
function openInfo() {
  event.stopPropagation();
  document.getElementById("infoText").classList.remove("dNone");
  document.getElementById("clickBarrier").classList.remove("dNone");
  document.getElementById("startButton").classList.add("dNone");
  document.getElementById("infoButton").setAttribute("onclick", "closeInfo()");
}

/**
 * This function closes the information overlay, the info button is again assigned the onclick attribute to open the info and if the game has not yet been initially started, the start button will be displayed again.
 */
function closeInfo() {
  document.getElementById("infoText").classList.add("dNone");
  document.getElementById("clickBarrier").classList.add("dNone");
  if (!gameStartedOnce)
    document.getElementById("startButton").classList.remove("dNone");
  document.getElementById("infoButton").setAttribute("onclick", "openInfo()");
}

/**
 * This function reloads the game.
 */
function home(){
  location.reload();
}
