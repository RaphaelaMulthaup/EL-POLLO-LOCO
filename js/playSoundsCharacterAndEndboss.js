let endboss;

/**
 * This function sets intervals to play sounds.
 */
function playSoundsCharacter() {
  setStoppableInterval(() => yawningSound(), 200);
  setStoppableInterval(() => walkingSound(), 200);
  setStoppableInterval(() => jumpingSound(), 200);
  setStoppableInterval(() => playHurtSoundCharacter(), 200);
  setStoppableInterval((id) => playDyingSoundCharacter(id), 200);
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
function playHurtSoundCharacter() {
  if (conditionsHurtSoundCharacterMet()) {
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
function conditionsHurtSoundCharacterMet() {
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
function playDyingSoundCharacter(id) {
  if (character.isDead()) {
    clearInterval(id);
    playSound("characterDyingSound");
    setTimeout(() => {
      pauseSound("characterDyingSound");
    }, 1610);
  }
}

/**
 * This function hands over the endboss object to the variable 'endboss' and sets intervals to play sounds.
 */
function playSoundsEndboss(endbossHandOver) {
  endboss = endbossHandOver;
  setStoppableInterval((id) => playThreateningSound(id), 200);
  setStoppableInterval((id) => playAlertSound(id), 200);
  endbossBackgroundmusic();
  setStoppableInterval((id) => this.playDyingSoundEndboss(id), 200);
  setStoppableInterval(() => this.playHurtSoundEndboss(), 200);
}

/**
 * If the first encounter with the character is not yet completed, this function plays the threatening sound, pauses the backgound music and deletes the interval that executes the threatening sound function.
 *
 * @param {string} id - This is interval that executes the threatening sound function.
 */
function playThreateningSound(id) {
  if (endboss.firstEncounterWithCharacterNotYetCompleted()) {
    clearInterval(id);
    playSound("threateningSound");
    pauseSound("backgroundMusicGame");
  }
}

/**
 * As soon as the first encounter with the character has taken place, but no initial hit has yet taken place, the playRandomAlertSound() function is called. The interval that calls playAlertSound() is then ended.
 *
 * @param {string} id - This is interval that executes the alert sound function.
 */
function playAlertSound(id) {
  if (firstEncounterNoHit()) {
    playRandomAlertSound();
    clearInterval(id);
  }
}

/**
 * This function checks whether the first encounter with the character has taken place, but not an initial hit.
 *
 * @returns {boolean} - Returns `true` if the first encounter with the character has taken place, but not an initial hit, otherwise `false`.
 */
function firstEncounterNoHit() {
  return !endboss.initialHit && world.firstEncounterEndbossHappend;
}

/**
 * This function checks whether the first encounter with the character has taken place, but not an initial hit, if necessary plays the alert sound exactly once and calls the function again after a random period of time.
 */
function playRandomAlertSound() {
  if (firstEncounterNoHit()) {
    playSound("endbossAlertSound");
    setTimeout(() => pauseSound("endbossAlertSound"), 1500);
  }
  setTimeout(() => playRandomAlertSound(), 2500 + Math.random() * 2500);
}

/**
 * This function controls the endboss backgroundmusic.
 */
function endbossBackgroundmusic() {
  playEndbossBackgroundmusic();
  stopEndbossBackgroundmusic();
}

/**
 * This function checks whether the conditions for the background music endboss are met until the corresponding function can be executed.
 */
function playEndbossBackgroundmusic() {
  let intervalEndbossBackgroundMusic = setInterval(() => {
    if (conditionsBackgroundMusicEndbossMet()) {
      clearInterval(intervalEndbossBackgroundMusic);
      playSound("endbossBackgroundMusic");
    }
  }, 200);
}

/**
 * This function checks whether the conditions for the background music endboss are met.
 *
 * @returns {boolean} - Returns `true` if all conditions for the background music endboss are met, otherwise `false`.
 */
function conditionsBackgroundMusicEndbossMet() {
  return (
    endboss.initialHit &&
    !endboss.threateningSound &&
    !endboss.isDead()
  );
}

/**
 * This function continuously checks whether the game has ended and, if so, sets the endboss background music volume to 0.
 */
function stopEndbossBackgroundmusic() {
  setInterval(() => {
    if (world.gameOver) {
      sounds.endbossBackgroundMusic.currentVolume = 0;
      setVolume("endbossBackgroundMusic");
    }
  }, 1000);
}

/**
 * If the conditions for the hurt sound are met, this function sets the boolean endbossHurtSoundIsPlaying to true, plays the hurt sound exactly once and then sets the boolean back to false.
 */
function playHurtSoundEndboss() {
  if (conditionsHurtSoundEndbossMet()) {
    endboss.endbossHurtSoundIsPlaying = true;
    playSound("endbossHurtSound");
    setTimeout(() => pauseSound("endbossHurtSound"), 1200);
    setTimeout(() => (endboss.endbossHurtSoundIsPlaying = false), 2000);
  }
}

/**
 * This function checks whether the conditions for the hurt sound are met.
 *
 * @returns {boolean} - Returns `true` if all conditions for the hurt sound are met, otherwise `false`.
 */
function conditionsHurtSoundEndbossMet() {
  return (
    endboss.isHurt &&
    !endboss.endbossHurtSoundIsPlaying &&
    endboss.energy >= 0
  );
}

/**
 * If the conditions for the dying sound are met, this function sets the boolean dyingSoundIsPlaying to true, plays the dying sound and, afer a timeout, deletes the interval that executes the dying sound function.
 *
 * @param {string} id - This is interval that executes the dying sound function.
 */
function playDyingSoundEndboss(id) {
  if (conditionsDyingSoundEndbossMet()) {
    endboss.dyingSoundIsPlaying = true;
    playSound("endbossDyingSound");
    setTimeout(() => clearInterval(id), 5000);
  }
}

/**
 * This function checks whether the conditions for the dying sound are met.
 *
 * @returns {boolean} - Returns `true` if all conditions for the dying sound are met, otherwise `false`.
 */
function conditionsDyingSoundEndbossMet() {
  return endboss.isDead() && !endboss.dyingSoundIsPlaying;
}
