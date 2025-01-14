/**
 * This function sets intervals to play sounds.
 */
function playSoundsCharacter() {
  setStoppableInterval(() => yawningSound(), 200);
  setStoppableInterval(() => walkingSound(), 200);
  setStoppableInterval(() => jumpingSound(), 200);
  setStoppableInterval(() => hurtSound(), 200);
  setStoppableInterval((id) => dyingSound(id), 200);
}

/**
 * This function checks whether the yawningSound should be started and whether the boolean isYawning needs to be reset to false.
 */
function yawningSound() {
  startYawningSound();
  resetIsYawning();
}

/**
 * This function checks whether the yawningSound can be played. If necessary, the corresponding function is called and the boolean isYawning is set to true.
 */
function startYawningSound() {
  if (conditionsStartYawningSoundMet()) {
    character.isYawning = true;
    yawningSoundActive();
  }
}

/**
 * This function checks the conditions for starting the yawning sound.
 *
 * @returns {boolean} - Returns `true` if all conditions for starting the yawning sound are met, otherwise `false`.
 */
function conditionsStartYawningSoundMet() {
  return character.idleTime >= 15000 && !character.isYawning;
}

/**
 * If the boolean isYawning is true, this function plays the yawnings sound for a specific period of time. The function repeats as long as the condition is met.
 */
function yawningSoundActive() {
  if (character.isYawning) {
    playSound("characterYawningSound");
    setTimeout(() => {
      pauseSound("characterYawningSound");
    }, 1605);
    setTimeout(() => {
      yawningSoundActive();
    }, 4000);
  }
}

/**
 * If the idleTime is shorter than 15 seconds, the boolean isYawning is set to false.
 */
function resetIsYawning() {
  if (character.idleTime < 1500) character.isYawning = false;
}

/**
 * This function checks whether the conditions for the character walking sound are met and executes the corresponding function.
 */
function walkingSound() {
  if (conditionsWalkingSoundMet()) {
    playCharacterWalkingSound();
  } else {
    pauseCharacterWalkingSound();
  }
}

/**
 * If the character walking sound is not already playing, this function starts it and sets the boolean characterWalkingSoundIsPlaying to true.
 */
function playCharacterWalkingSound() {
  if (!character.characterWalkingSoundIsPlaying) {
    playSound("characterWalkingSound");
    character.characterWalkingSoundIsPlaying = true;
  }
}

/**
 * This function pauses the character walking sound and sets the boolean characterWalkingSoundIsPlaying to false.
 */
function pauseCharacterWalkingSound() {
  pauseSound("characterWalkingSound");
  character.characterWalkingSoundIsPlaying = false;
}

/**
 * This function checks the conditions for the walking sound.
 *
 * @returns {boolean} - Returns `true` if all conditions for the walking sound are met, otherwise `false`.
 */
function conditionsWalkingSoundMet() {
  return (
    character.buttonsForWalkingArePressed() &&
    character.x > 0 &&
    character.x < world.level.level_end_x &&
    !character.isHurt() &&
    !world.introAnimationEndboss &&
    !character.isAboveGround(145) &&
    !world.gameOver
  );
}

/**
 * This function controls the jumping sound.
 */
function jumpingSound() {
  playJumpingSound();
  pauseJumpingSound();
}

/**
 * If the conditions are met, this function plays the jumping sound and sets the boolean characterJumpingSoundIsPlaying to true.
 */
function playJumpingSound() {
  if (conditionsJumpingSoundMet()) {
    character.characterJumpingSoundIsPlaying = true;
    playSound("characterJumpingSound");
  }
}

/**
 * This function checks the conditions for the jumping sound.
 *
 * @returns {boolean} - Returns `true` if all conditions for the jumping sound are met, otherwise `false`.
 */
function conditionsJumpingSoundMet() {
  return (
    character.speedY > 0 &&
    !character.isDead() &&
    !character.characterJumpingSoundIsPlaying
  );
}

/**
 * If speedY is less than or equal to zero, this function pauses the jumping sound and sets the boolean characterJumpingSoundIsPlaying to false.
 */
function pauseJumpingSound() {
  if (character.speedY <= 0) {
    pauseSound("characterJumpingSound");
    character.characterJumpingSoundIsPlaying = false;
  }
}

/**
 * If the conditions for are met, this function plays the hurt sound and sets the boolean characterHurtSoundIsPlaying to true for this time.
 */
function hurtSound() {
  if (conditionHurtSoundMet()) {
    character.characterHurtSoundIsPlaying = true;
    playSound("characterHurtSound");
    setTimeout(() => {
      character.characterHurtSoundIsPlaying = false;
    }, 1000);
  }
}

/**
 * This function checks the conditions for the hurt sound.
 *
 * @returns {boolean} - Returns `true` if all conditions for the hurt sound are met, otherwise `false`.
 */
function conditionHurtSoundMet() {
  return (
    character.isHurt() &&
    !character.characterHurtSoundIsPlaying &&
    !world.gameOver
  );
}

/**
 * If the character is dead, this function plays the dying sound exactly once and deletes the interval that executes the dying sound function.
 *
 * @param {string} id - This is interval that executes the dying sound function.
 */
function dyingSound(id) {
  if (character.isDead()) {
    clearInterval(id);
    playSound("characterDyingSound");
    setTimeout(() => {
      pauseSound("characterDyingSound");
    }, 1610);
  }
}
