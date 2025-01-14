class Endboss extends MovableObject {
  height = 400;
  width = 343;
  y = 65;
  x = 2700;
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_DYING = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  world;
  character;
  speed = 3;
  energy = 5;
  isHurt = false;
  initialHit = false;
  randomAttackInterval;
  isAttacking = false;
  endbossHurtSoundIsPlaying = false;
  dyingSoundIsPlaying = false;
  offset = {
    top: 81,
    left: 73,
    right: 67,
    bottom: 112,
  };

  /**
   * This function allows access to 'MovableObject', loads images for different aninmations, sets the world and the character inside endboss.class.js, displays the statusbar for the endboss, brings the endboss to life and checks if the first encounter with the character had happend.
   *
   * @param {class} world - The world of the game.
   */
  constructor(world) {
    super();
    this.loadImg("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DYING);
    this.loadImages(this.IMAGES_HURT);
    this.world = world;
    this.character = world.character;
    this.displayStatusBarEndboss();
    this.bringToLife();
    this.checkFirstEncounter();
  }

  /**
   * This function sets the world and the character inside endboss.class.js
   *
   * @param {class} world - The world of the game.
   */
  setWorld(world) {
    this.world = world;
    this.character = world.character;
  }

  /**
   * With an interval, this function checks whether the function firstEncounterWithCharacterNotYetCompleted() returns true and then creats a new StatusBarEndboss which it places in the aarray StatusBarEndboss in the world and ends the interval.
   */ 
  displayStatusBarEndboss() {
    let intervalDisplayStatusBarEnndboss = setInterval(() => {
      if (this.firstEncounterWithCharacterNotYetCompleted()) {
        let statusBarEndboss = new StatusBarEndboss();
        this.world.statusBarEndboss.push(statusBarEndboss);
        clearInterval(intervalDisplayStatusBarEnndboss);
      }
    }, 200);
  }

  /**
   * This function animates the endboss, lets him move left and uses appropriate sounds.
   */
  bringToLife() {
    this.animate();
    this.endbossMovesLeft();
    this.playSound();
  }

  /**
   * This function animates the endboss.
   */
  animate() {
    this.animateWalking();
    this.animateAlert();
    this.animateAttacking();
    this.animateHurt();
    this.animateDying();
  }

  /**
   * This function continuously checks the conditions that must be met for the endboss to walk and calls the appropriate function if necessary.
   */
  animateWalking() {
    setInterval(() => {
      if (this.firstEncounterWithCharacterNotYetCompleted())
        this.playAnimation(this.IMAGES_WALKING);
      if (this.conditionsWalkingMet()) this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }

  /**
   * This function checks whether the first encounter with the character has not yet been completed.
   *
   * @returns {boolean} - Returns `true` if the first encounter with the character has not yet been completed, otherwise `false`.
   */
  firstEncounterWithCharacterNotYetCompleted() {
    return this.character.x > 2100 && this.x > 2450;
  }

  /**
   * This function checks the conditions for walking state.
   *
   * @returns {boolean} - Returns `true` if all conditions for walking state are met, otherwise `false`.
   */
  conditionsWalkingMet() {
    return (
      !this.isAttacking && !this.isDead() && this.initialHit && !this.isHurt
    );
  }

  /**
   * This function continuously checks the conditions that must be met for alert state and calls the appropriate function if necessary.
   */
  animateAlert() {
    setInterval(() => {
      if (this.conditionsAlertMet()) this.playAnimation(this.IMAGES_ALERT);
    }, 200);
  }

  /**
   * This function checks the conditions for alert state.
   *
   * @returns {boolean} - Returns `true` if all conditions for alert state are met, otherwise `false`.
   */
  conditionsAlertMet() {
    return (
      !this.initialHit &&
      this.world.firstEncounterEndbossHappend &&
      this.character.x <= 2150
    );
  }

  /**
   * This function continuously checks the conditions that must be met for the endboss to attack and calls the appropriate function if necessary.
   */
  animateAttacking() {
    setInterval(() => {
      if (this.conditionsAttackingBevorInitialHitMet())
        this.playAnimation(this.IMAGES_ATTACK);
      if (this.isAttacking && !this.isDead()) {
        this.playAnimation(this.IMAGES_ATTACK);
      }
    }, 200);
  }

  /**
   * This function checks the conditions for attacking state bevor the inital hit.
   *
   * @returns {boolean} - Returns `true` if all conditions for attacking state bevor the inital hit are met, otherwise `false`.
   */
  conditionsAttackingBevorInitialHitMet() {
    return (
      !this.initialHit &&
      this.world.firstEncounterEndbossHappend &&
      this.character.x > 2150
    );
  }

  /**
   * This function continuously checks whether the endboss is hurt. If this is the case, the boolean 'initialHit' is set to true and the hurt animation is started. In addition, the interval that randomly triggers an attack is ended and restarted so that the endboss starts walking again after the injury animation.
   */
  animateHurt() {
    setInterval(() => {
      if (this.isHurt) {
        this.initialHit = true;
        clearInterval(this.randomAttackInterval);
        this.playAnimation(this.IMAGES_HURT);
        this.randomAttacks();
      }
    }, 200);
  }

  /**
   * This function continuously checks whether the endboss is dead and plays the corresponding animation if necessary.
   */
  animateDying() {
    setInterval(() => {
      if (this.isDead()) {
        this.playDyingAnimation(this.IMAGES_DYING);
      }
    }, 200);
  }

  /**
   * This function continuously checks the conditions that must be met for the endboss to move left and calls the appropriate function and changes the speed if necessary.
   */
  endbossMovesLeft() {
    setInterval(() => {
      if (this.firstEncounterWithCharacterNotYetCompleted()) {
        this.moveLeft();
      }
    }, 1000 / 60);
    setInterval(() => {
      if (this.conditionsMovingLeftMet()) {
        this.speed = 5;
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  /**
   * This function checks the conditions for moving left.
   *
   * @returns {boolean} - Returns `true` if all conditions for moving left are met, otherwise `false`.
   */
  conditionsMovingLeftMet() {
    return (
      !this.isAttacking && !this.isDead() && this.initialHit && !this.isHurt
    );
  }

  /**
   * This function sets intervals to play sounds.
   */
  playSound() {
    setStoppableInterval((id) => this.playThreateningSound(id), 200);
    setStoppableInterval((id) => this.playAlertSound(id), 200);
    this.endbossBackgroundmusic();
    setStoppableInterval((id) => this.playDyingSound(id), 200);
    setStoppableInterval(() => this.playHurtSound(), 200);
  }

  /**
   * If the first encounter with the character is not yet completed, this function plays the threatening sound, pauses the backgound music and deletes the interval that executes the threatening sound function.
   *
   * @param {string} id - This is interval that executes the threatening sound function.
   */
  playThreateningSound(id) {
    if (this.firstEncounterWithCharacterNotYetCompleted()) {
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
  playAlertSound(id) {
    if (this.firstEncounterNoHit()) {
      this.playRandomAlertSound();
      clearInterval(id);
    }
  }

  /**
   * This function checks whether the first encounter with the character has taken place, but not an initial hit.
   *
   * @returns {boolean} - Returns `true` if the first encounter with the character has taken place, but not an initial hit, otherwise `false`.
   */
  firstEncounterNoHit() {
    return !this.initialHit && this.world.firstEncounterEndbossHappend;
  }

  /**
   * This function checks whether the first encounter with the character has taken place, but not an initial hit, if necessary plays the alert sound exactly once and calls the function again after a random period of time.
   */
  playRandomAlertSound() {
    if (this.firstEncounterNoHit()) {
      playSound("endbossAlertSound");
      setTimeout(() => pauseSound("endbossAlertSound"), 1500);
    }
    setTimeout(() => this.playRandomAlertSound(), 2500 + Math.random() * 2500);
  }

  /**
   * This function controls the endboss backgroundmusic.
   */
  endbossBackgroundmusic() {
    this.playEndbossBackgroundmusic();
    this.stopEndbossBackgroundmusic();
  }

  /**
   * This function checks whether the conditions for the background music endboss are met until the corresponding function can be executed.
   */
  playEndbossBackgroundmusic() {
    let intervalEndbossBackgroundMusic = setInterval(() => {
      if (this.conditionsBackgroundMusicEndbossMet()) {
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
  conditionsBackgroundMusicEndbossMet() {
    return this.initialHit && !this.threateningSound && !this.isDead();
  }

  /**
   * This function continuously checks whether the game has ended and, if so, sets the endboss background music volume to 0.
   */
  stopEndbossBackgroundmusic() {
    setInterval(() => {
      if (this.world.gameOver) {
        sounds.endbossBackgroundMusic.currentVolume = 0;
        setVolume("endbossBackgroundMusic");
      }
    }, 1000);
  }

  /**
   * If the conditions for the hurt sound are met, this function sets the boolean endbossHurtSoundIsPlaying to true, plays the hurt sound exactly once and then sets the boolean back to false.
   */
  playHurtSound() {
    if (this.conditionsHurtSoundMet()) {
      this.endbossHurtSoundIsPlaying = true;
      playSound("endbossHurtSound");
      setTimeout(() => pauseSound("endbossHurtSound"), 1200);
      setTimeout(() => (this.endbossHurtSoundIsPlaying = false), 2000);
    }
  }

  /**
   * This function checks whether the conditions for the hurt sound are met.
   *
   * @returns {boolean} - Returns `true` if all conditions for the hurt sound are met, otherwise `false`.
   */
  conditionsHurtSoundMet() {
    return this.isHurt && !this.endbossHurtSoundIsPlaying && this.energy >= 0;
  }

  /**
   * If the conditions for the dying sound are met, this function sets the boolean dyingSoundIsPlaying to true, plays the dying sound and, afer a timeout, deletes the interval that executes the dying sound function.
   *
   * @param {string} id - This is interval that executes the dying sound function.
   */
  playDyingSound(id) {
    if (this.conditionsDyingSoundMet()) {
      this.dyingSoundIsPlaying = true;
      playSound("endbossDyingSound");
      setTimeout(() => clearInterval(id), 5000);
    }
  }

  /**
   * This function checks whether the conditions for the dying sound are met.
   *
   * @returns {boolean} - Returns `true` if all conditions for the dying sound are met, otherwise `false`.
   */
  conditionsDyingSoundMet() {
    return this.isDead() && !this.dyingSoundIsPlaying;
  }

  /**
   * This function controls the first encounter of endboss and character.
   */
  checkFirstEncounter() {
    this.didFirstEncounterEndbossHappend();
    this.setIntroAnimationEndboss();
  }

  /**
   * This function sets the boolean 'firstEncounterEndbossHappend' to true if x is less than 2450.
   */
  didFirstEncounterEndbossHappend(){
    setInterval(() => {
      if (this.x <= 2450) this.world.firstEncounterEndbossHappend = true;
    }, 200);
  }

  /**
   * With an interval, this function checks whether x is less than 2600 and then sets the boolean introAnimationEndboss to true. After a second, it sets it back to false and ends the interval.
   */
  setIntroAnimationEndboss(){
    let intervalCheckIntroAnimationEndboss = setInterval(() => {
      if (this.x < 2600) {
        world.introAnimationEndboss = true;
        setTimeout(() => {
          world.introAnimationEndboss = false;
          clearInterval(intervalCheckIntroAnimationEndboss);
        }, 1000);
      }
    }, 200);
  }

  /**
   * This function checks whether the endboss is not already hurt. If this is not the case, the booleans 'isHurt' and 'collisionWithEnemy' of the bottle are set to true, the energy is reduced by one point, the startus bar of the endboss is updated and after a timeout 'isHurt' is set to false again.
   * 
   * @param {object} bottle - throwable bottle
   */
  isHit(bottle) {
    if (!this.isHurt) {
      this.isHurt = true;
      bottle.collisionWithEnemy = true;
      this.energy -= 1;
      this.world.statusBarEndboss[0].setPercentage(this.energy * 20);
      setTimeout(() => (this.isHurt = false), 2000);
    }
  }

  /**
   * This function gets the images of the dying animation one after the other from the image chace and puts them on img.
   * 
   * @param {array} images - Array 'IMAGES_DYING' whith image pathes.
   */
  playDyingAnimation(images) {
    for (let index = 0; index < 3; index++) {
      let path = images[index];
      this.img = this.imageCache[path];
    }
  }

  /**
   * This function activates random attacks from the object at specified time intervals.
   */
  randomAttacks() {
    this.randomAttackInterval = setInterval(() => {
      this.isAttacking = true;
      setTimeout(() => (this.isAttacking = false), 2500);
    }, 3500 + Math.random() * 1500);
  }
}
