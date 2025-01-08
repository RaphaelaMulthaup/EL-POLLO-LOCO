let character;
let alignedToTheLeft = false;
let alignedToTheRight = true;
let lastEndbossPosition;
let lastDirectionLeft = this.alignedToTheLeft;
let isSlowModeActive = false;
let targetCameraX = 0;
let smoothing = 0.1;

function camera(characterHandOver, endbossHandOver) {
  character = characterHandOver;
  lastEndbossPosition = endbossHandOver.x;
  setInterval(() => {
    checkAlignedToTheLeft();
    checkAlignedToTheRight();
    checkForLargeChangesCamera();
    setTargetCameraX();
    speedCamera();
    preventSubpixelMovements();
    cameraLimitationLeft();
    updatelastStates();
  }, 1000 / 60);
}

function checkAlignedToTheLeft() {
  if (world.keyboard.LEFT) alignedToTheLeft = true;
  if (world.keyboard.RIGHT) alignedToTheLeft = false;
}

function checkAlignedToTheRight() {
  if (world.keyboard.RIGHT) alignedToTheRight = true;
  if (world.keyboard.LEFT) alignedToTheRight = false;
}

function checkForLargeChangesCamera() {
  let endbossSwitchedToLeft =
    lastEndbossPosition > character.x && world.endboss.x <= character.x;
  let directionChanged =
    (alignedToTheLeft && !lastDirectionLeft) ||
    (alignedToTheRight && lastDirectionLeft);

  if (
    (character.x > world.endboss.x && directionChanged) ||
    (endbossSwitchedToLeft && alignedToTheLeft)
  )
    isSlowModeActive = true;
}

function setTargetCameraX() {
  targetCameraX = spaceLeftOfCharacterVisible()
    ? -character.x + 500
    : character.x < 2200
    ? -character.x + 100
    : -2200 + 100;
}

function spaceLeftOfCharacterVisible() {
  return character.x > world.endboss.x && alignedToTheLeft;
}

function speedCamera() {
  if (Math.abs(world.camera_x - targetCameraX) < 1) isSlowModeActive = false;

  smoothing = isSlowModeActive ? 0.025 : 0.1;

  world.camera_x += (targetCameraX - world.camera_x) * smoothing;
}

function preventSubpixelMovements() {
  world.camera_x = Math.floor(world.camera_x);
}

function cameraLimitationLeft() {
  if (world.camera_x > 0) world.camera_x = 0;
}

function updatelastStates() {
  lastEndbossPosition = world.endboss.x;
  lastDirectionLeft = alignedToTheLeft;
}
