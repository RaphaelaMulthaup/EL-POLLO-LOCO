/**
 * This function retrieves the mute status from local storage. If it is true, the mute function is executed.
 */
function getMuteStatus(){
  let muteStatus = localStorage.getItem('muteStatus');
  if (muteStatus === 'true') {
    let img = document.getElementById("muteUnmute");
    mute(img);
  }
}

/**
 * This function toggles between mute and unmute state when called.
 */
function muteUnmute() {
  let img = document.getElementById("muteUnmute");
  img.src.includes("img/mute.png") ? mute(img) : unmute(img);
}

/**
 * This function updates the mute icon, saves the mute status in the local storage and mutes all sounds.
 *
 * @param {html element} img - image that shows the mute or unmute icon
 */
function mute(img) {
  img.src = "img/unmute.png";
  muted = true;
  localStorage.setItem('muteStatus', muted);
  Object.keys(sounds).forEach((sound) => (sounds[sound].audio.muted = true));
}

/**
 * This function updates the mute icon, saves the mute status in the local storage, unmutes all sounds and restores the audio to the theoretical start time if saved.
 *
 * @param {html element} img - image that shows the mute or unmute icon
 */
function unmute(img) {
  img.src = "img/mute.png";
  muted = false;
  localStorage.setItem('muteStatus', muted);
  Object.keys(sounds).forEach((sound) => {
    let audio = sounds[sound].audio;
    let theoreticalStartTime = sounds[sound].theoreticalStartTime;

    audio.muted = false;
    if (theoreticalStartTimeIsSaved(theoreticalStartTime)) {
      startAtNewCurrentTime(audio, theoreticalStartTime);
    }
  });
}

/**
 * This function checks if a theoretical start time for a sound is saved.
 *
 * @param {number} theoreticalStartTime - This is the point in the past where a sound would theoretically have started if the game had not been muted.
 * @returns {boolean}  Returns `true` if a theoretical start time for a sound is saved, otherwise `false`.
 */
function theoreticalStartTimeIsSaved(theoreticalStartTime) {
  return theoreticalStartTime !== undefined;
}

/**
 * This function starts the audio at a new time based on the theoretical start time and deletes the saved theoretical start time.
 *
 * @param {audio object} audio - the sound
 * @param {number} theoreticalStartTime - This is the point in the past where a sound would theoretically have started if the game had not been muted.
 */
function startAtNewCurrentTime(audio, theoreticalStartTime) {
  audio.currentTime =
    audio.currentTime + (Date.now() - theoreticalStartTime) / 1000;
  audio.play();
  delete theoreticalStartTime;
}

/**
 * This function plays the specified sound, but if the game is muted the current time ist saved as theoretical start time and the sound will not be played.
 *
 * @param {string} soundName - The name of the sound under which it can be found in the sounds array.
 */
function playSound(soundName) {
  let currentSound = setSound(soundName);
  muted
    ? ((sounds[soundName].theoreticalStartTime = Date.now()),
      currentSound.pause())
    : currentSound.play();
}

/**
 * This function sets the sound object for the given sound name with adjusted volume and assigns the current time to it.
 *
 * @param {string} soundName - The name of the sound under which it can be found in the sounds array.
 * @returns {audio object} audio - the sound
 */
function setSound(soundName) {
  let currentSound = setVolume(soundName);
  currentSound.currentTime = sounds[soundName].currentTime;
  return currentSound;
}

/**
 * This function sets the sound object for the given sound name and its volume.
 *
 * @param {string} soundName - The name of the sound under which it can be found in the sounds array.
 * @returns {audio object} audio - the sound
 */
function setVolume(soundName) {
  let currentSound = sounds[soundName].audio;
  currentSound.volume = sounds[soundName].currentVolume;
  return currentSound;
}

/**
 * This function pauses the specified sound and resets its theoretical start time.
 *
 * @param {string} soundName - The name of the sound under which it can be found in the sounds array.
 */
function pauseSound(soundName) {
  let currentSound = sounds[soundName];
  currentSound.audio.pause();
  delete currentSound.theoreticalStartTime;
}

/**
 * This function pauses running background sounds and resets all sounds when restarting.
 */
function restartSounds() {
  pauseSound("mexicanHatDance");
  pauseSound("endbossBackgroundMusic");
  resetSounds();
}

/**
 * This function resets the sounds to their default values.
 */
function resetSounds() {
  Object.keys(sounds).forEach((sound) => {
    sounds[sound].currentVolume = defaultSounds[sound].currentVolume;
    sounds[sound].currentTime = defaultSounds[sound].currentTime;
  });
}
