let character;
let alignedToTheLeft = false;
let alignedToTheRight = true;
let endbossSwitchedToLeft;
let directionChanged;
let lastEndbossPosition;
let lastDirectionLeft = this.alignedToTheLeft;
let isSlowModeActive = false;
let targetCameraX = 0;
let smoothing = 0.1;

/**
 * This function sets the character and the endboss so that they are available here as variables. It also sets an interval that continuously calls up all functions that are necessary for the camera to track the character.
 *
 * @param {object} characterHandOver - the character
 * @param {object} endbossHandOver - the endboss
 */
function camera(characterHandOver, endbossHandOver) {
  character = characterHandOver;
  lastEndbossPosition = endbossHandOver.x;
  setInterval(() => {
    checkAlignedToTheLeft();
    checkAlignedToTheRight();
    largeChangesCamera();
    setTargetCameraX();
    speedCamera();
    preventSubpixelMovements();
    cameraLimitationLeft();
    updatelastStates();
  }, 1000 / 60);
}

/**
 * This function checks whether the character is aligned to the left.
 */
function checkAlignedToTheLeft() {
  if (world.keyboard.LEFT) alignedToTheLeft = true;
  if (world.keyboard.RIGHT) alignedToTheLeft = false;
}

/**
 * This function checks whether the character is aligned to the right.
 */
function checkAlignedToTheRight() {
  if (world.keyboard.RIGHT) alignedToTheRight = true;
  if (world.keyboard.LEFT) alignedToTheRight = false;
}

/**
 * This function controls the large changes of the camera.
 */
function largeChangesCamera() {
  checkConditionsForLargeChangesCamera();
  executeLargeChangeCamera();
}

/**
 * This function checks whether the final boss has moved to the left of the character and whether the character has changed his direction.
 */
function checkConditionsForLargeChangesCamera() {
  endbossSwitchedToLeft =
    lastEndbossPosition > character.x && world.endboss.x <= character.x;
  directionChanged =
    (alignedToTheLeft && !lastDirectionLeft) ||
    (alignedToTheRight && lastDirectionLeft);
}

/**
 * This function sets the boolean 'isSlowModeActive' to true when the conditions for a large change are met.
 */
function executeLargeChangeCamera() {
  if (conditionsForSlowModeMet()) isSlowModeActive = true;
}

/**
 * This function checks the conditions for the slow mode.
 *
 * @returns {boolean} - Returns `true` if all conditions for the slow mode are met, otherwise `false`.
 */
function conditionsForSlowModeMet() {
  return (
    (character.x > world.endboss.x && directionChanged) ||
    (endbossSwitchedToLeft && alignedToTheLeft)
  );
}

/**
 * This function sets 'targetCameraX'.
 */
function setTargetCameraX() {
  targetCameraX = spaceLeftOfCharacterVisible()
    ? -character.x + 500
    : character.x < 2200
    ? -character.x + 100
    : -2200 + 100;
}

/**
 * This function checks whether the conditions for the space to the left of the character to be visible are met.
 *
 * @returns {boolean} - Returns `true` if the conditions for the space to the left of the character to be visible are met, otherwise `false`.
 */
function spaceLeftOfCharacterVisible() {
  return character.x > world.endboss.x && alignedToTheLeft;
}

/**
 * This function sets the speed of the camera by multiplying the difference between the camera (x) and its target position (targetCameraX) by the smoothing. The smoothing depends on whether slowMode is activated or not. It is checked in advance whether the slowMode can be set to false again because the camera has already reached its target.
 */
function speedCamera() {
  if (Math.abs(world.camera_x - targetCameraX) < 1) isSlowModeActive = false;
  smoothing = isSlowModeActive ? 0.025 : 0.1;
  world.camera_x += (targetCameraX - world.camera_x) * smoothing;
}

/**
 * This function ensures that the camera position is rounded to an integer. This prevents subpixel movements that, for example, lead to blurry images on the screen.
 */
function preventSubpixelMovements() {
  world.camera_x = Math.floor(world.camera_x);
}

/**
 * This feature ensures that the camera cannot pan further to the left than up to camera_x = 0.
 */
function cameraLimitationLeft() {
  if (world.camera_x > 0) world.camera_x = 0;
}

/**
 * This function saves the position of the endboss and the orientation of the character for comparative access in the next run of the camera() interval.
 */
function updatelastStates() {
  lastEndbossPosition = world.endboss.x;
  lastDirectionLeft = alignedToTheLeft;
}
