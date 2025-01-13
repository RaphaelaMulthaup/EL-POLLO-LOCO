class Character extends MovableObject {
  height = 300;
  width = 150;
  y = 145;
  x = 40;
  speed = 5;
  otherDirection = false;
  numberReductionsY = 0;
  idleTime = 0;
  isYawning = false;
  characterHurtSoundIsPlaying = false;
  characterJumpingSoundIsPlaying = false;
  characterWalkingSoundIsPlaying = false;
  world;

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  offset = {
    top: 150,
    left: 37,
    right: 56,
    bottom: 15,
  };

  /**
   * This function allows access to 'MovableObject', loads images for different aninmations, applys Gravity, brings the character to life and inserts the camera.
   *
   * @param {class} world - The world class is passed.
   */
  constructor(world) {
    super();
    this.world = world;
    this.loadImg("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity(145);
    this.bringToLife();
    camera(this, world.endboss);
  }

  /**
   * This function animates the character, lets him move and uses appropriate sounds.
   */
  bringToLife() {
    this.animate();
    this.movement();
    this.playSound();
  }

  /**
   * This function animates the character.
   */
  animate() {
    this.animateIdle();
    this.animateLongIdle();
    this.animateWalking();
    this.animateJumping();
    this.animateHurt();
    this.animateDying();
  }

  /**
   * This function continuously checks whether the character is at idle state. If this is the case, but not longer than 15 seconds, the idle animation will be played. The idle time is also saved.
   */
  animateIdle() {
    setInterval(() => {
      if (this.atIdle()) {
        if (this.idleTime < 15000) this.playAnimation(this.IMAGES_IDLE);
        this.idleTime += 200;
      } else {
        this.idleTime = 0;
      }
    }, 200);
  }

  /**
   * This function checks the conditions for idle state.
   *
   * @returns {boolean} - Returns `true` if all conditions for being idle are met, otherwise `false`.
   */
  atIdle() {
    return (
      !this.isDead() &&
      !this.isHurt() &&
      !this.isAboveGround(145) &&
      !this.buttonsForWalkingArePressed()
    );
  }

  /**
   * This function continuously checks whether the character is at idle state for min 15 seconds. If this is the case, the long idle animation will be played.
   */
  animateLongIdle() {
    setInterval(() => {
      if (this.idleTime >= 15000) this.playAnimation(this.IMAGES_LONG_IDLE);
    }, 200);
  }
  /**
   * This function continuously checks whether the character is walking and, if necessary, plays the walking animation.
   */
  animateWalking() {
    setInterval(() => {
      if (this.isWalking()) this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }

  /**
   * This function checks the conditions for walking state.
   *
   * @returns {boolean} - Returns `true` if all conditions for walking state are met, otherwise `false`.
   */
  isWalking() {
    return (
      !this.world.introAnimationEndboss &&
      !this.isDead() &&
      !this.isHurt() &&
      !this.isAboveGround(145) &&
      this.buttonsForWalkingArePressed()
    );
  }

  /**
   * This function continuously checks whether the character is jumping and, if necessary, plays the jumping animation. When the character is back on the ground, the animation is reset to start over again with a new jump.
   */
  animateJumping() {
    let index;
    setInterval(() => {
      if (!this.isAboveGround(145)) index = 0;
    }, 100);
    setInterval(() => {
      if (this.isAboveGround(145) && !this.isDead()) {
        this.img = this.imageCache[this.IMAGES_JUMPING[index]];
        index++;
        if (index > 8) index = 0;
      }
    }, 90);
  }

  /**
   * This function continuously checks whether the character is hurt and, if necessary, plays the hurt animation.
   */
  animateHurt() {
    setInterval(() => {
      if (this.isHurt() && !this.world.gameOver)
        this.playAnimation(this.IMAGES_HURT);
    }, 100);
  }

  /**
   * This function continuously checks whether the character is dead and, if necessary, plays the dying animation once.
   */
  animateDying() {
    let index = 0;
    let intervalCharacterAnimation = setInterval(() => {
      if (this.isDead()) {
        this.img = this.imageCache[this.IMAGES_DEAD[index]];
        index++;
        if (index >= 7) clearInterval(intervalCharacterAnimation);
      }
    }, 100);
  }

  /**
   * this function lets the character move.
   */
  movement() {
    this.movementRight();
    this.movementLeft();
    this.movementJumping();
  }

  /**
   * This function continuously checks whether the character is moving right and, if necessary, lets him move right and sets 'ohterDirection' to false.
   */
  movementRight() {
    setInterval(() => {
      if (this.conditionsMovingRightMet()) {
        this.moveRight();
        this.otherDirection = false;
      }
    }, 1000 / 60);
  }

  /**
   * This function checks the conditions for moving right state.
   *
   * @returns {boolean} - Returns `true` if all conditions for moving right state are met, otherwise `false`.
   */
  conditionsMovingRightMet() {
    return (
      this.world.keyboard.RIGHT &&
      this.x < this.world.level.level_end_x &&
      !this.isHurt() &&
      !this.world.introAnimationEndboss &&
      !this.isDead()
    );
  }

  /**
   * This function continuously checks whether the character is moving left and, if necessary, lets him move left and sets 'ohterDirection' to true.
   */
  movementLeft() {
    setInterval(() => {
      if (this.conditionsMovingLeftMet()) {
        this.moveLeft();
        this.otherDirection = true;
      }
    }, 1000 / 60);
  }

  /**
   * This function checks the conditions for moving left state.
   *
   * @returns {boolean} - Returns `true` if all conditions for moving left state are met, otherwise `false`.
   */
  conditionsMovingLeftMet() {
    return (
      this.world.keyboard.LEFT &&
      this.x > 0 &&
      !this.isHurt() &&
      !this.world.introAnimationEndboss &&
      !this.isDead()
    );
  }

  /**
   * This function makes the character jump.
   */
  movementJumping() {
    this.movementJumpingStandart();
    this.movementJumpingDeath();
  }

  /**
   * This function continuously checks whether the character is jumping and, if necessary, lets him jump.
   */
  movementJumpingStandart() {
    setInterval(() => {
      if (this.conditionsJumpingMet()) this.jump(30);
    }, 1000 / 60);
  }

  /**
   * This function checks the conditions for jumping state.
   *
   * @returns {boolean} - Returns `true` if all conditions for jumping state are met, otherwise `false`.
   */
  conditionsJumpingMet() {
    return (
      (this.world.keyboard.SPACE || this.world.keyboard.UP) &&
      !this.isAboveGround(145) &&
      !this.isHurt() &&
      !this.world.introAnimationEndboss &&
      !this.isDead()
    );
  }

  /**
   * This function continuously checks whether the character is dead and, if that's the case and he's not jumping already, lets him jump with a small delay.
   */
  movementJumpingDeath() {
    let intervalJumpingWhileDying = setInterval(() => {
      if (this.isDead() && !this.isAboveGround(145)) {
        setTimeout(() => {
          this.jump(10);
          clearInterval(intervalJumpingWhileDying);
        }, 200);
      }
    }, 1000 / 60);
  }

  /**
   * This function sets intervals to play sounds.
   */
  playSound() {
    setStoppableInterval(() => this.yawningSound(), 200);
    setStoppableInterval(() => this.walkingSound(), 200);
    setStoppableInterval(() => this.jumpingSound(), 200);
    setStoppableInterval(() => this.hurtSound(), 200);
    setStoppableInterval((id) => this.dyingSound(id), 200);
  }

  /**
   * This function checks whether the yawningSound should be started and whether the boolean isYawning needs to be reset to false.
   */
  yawningSound() {
    this.startYawningSound();
    this.resetIsYawning();
  }

  /**
   * This function checks whether the yawningSound can be played. If necessary, the corresponding function is called and the boolean isYawning is set to true.
   */
  startYawningSound() {
    if (this.conditionsStartYawningSoundMet()) {
      this.isYawning = true;
      this.yawningSoundActive();
    }
  }

  /**
   * This function checks the conditions for starting the yawning sound.
   *
   * @returns {boolean} - Returns `true` if all conditions for starting the yawning sound are met, otherwise `false`.
   */
  conditionsStartYawningSoundMet() {
    return this.idleTime >= 15000 && !this.isYawning;
  }

  /**
   * If the boolean isYawning is true, this function plays the yawnings sound for a specific period of time. The function repeats as long as the condition is met.
   */
  yawningSoundActive() {
    if (this.isYawning) {
      playSound("characterYawningSound");
      setTimeout(() => {
        pauseSound("characterYawningSound");
      }, 1605);
      setTimeout(() => {
        this.yawningSoundActive();
      }, 4000);
    }
  }

  /**
   * If the idleTime is shorter than 15 seconds, the boolean isYawning is set to false.
   */
  resetIsYawning() {
    if (this.idleTime < 1500) this.isYawning = false;
  }
  
  /**
   * This function checks whether the conditions for the character walking sound are met and executes the corresponding function.
   */
  walkingSound() {
    if (this.conditionsWalkingSoundMet()) {
      this.playCharacterWalkingSound();
    } else {
      this.pauseCharacterWalkingSound();
    }
  }

  /**
   * If the character walking sound is not already playing, this function starts it and sets the boolean characterWalkingSoundIsPlaying to true.
   */
  playCharacterWalkingSound() {
    if (!this.characterWalkingSoundIsPlaying) {
      playSound("characterWalkingSound");
      this.characterWalkingSoundIsPlaying = true;
    }
  }

  /**
   * This function pauses the character walking sound and sets the boolean characterWalkingSoundIsPlaying to false.
   */
  pauseCharacterWalkingSound() {
    pauseSound("characterWalkingSound");
    this.characterWalkingSoundIsPlaying = false;
  }

  /**
   * This function checks the conditions for the walking sound.
   *
   * @returns {boolean} - Returns `true` if all conditions for the walking sound are met, otherwise `false`.
   */
  conditionsWalkingSoundMet() {
    return (
      this.buttonsForWalkingArePressed() &&
      this.x > 0 &&
      this.x < this.world.level.level_end_x &&
      !this.isHurt() &&
      !this.world.introAnimationEndboss &&
      !this.isAboveGround(145) &&
      !this.world.gameOver
    );
  }

  /**
   * This function controls the jumping sound.
   */
  jumpingSound() {
    this.playJumpingSound();
    this.pauseJumpingSound();
  }

  /**
   * If the conditions are met, this function plays the jumping sound and sets the boolean characterJumpingSoundIsPlaying to true.
   */
  playJumpingSound(){
    if (this.conditionsJumpingSoundMet()) {
      this.characterJumpingSoundIsPlaying = true;
      playSound("characterJumpingSound");
    }
  }

  /**
   * This function checks the conditions for the jumping sound.
   *
   * @returns {boolean} - Returns `true` if all conditions for the jumping sound are met, otherwise `false`.
   */
  conditionsJumpingSoundMet() {
    return (
      this.speedY > 0 && !this.isDead() && !this.characterJumpingSoundIsPlaying
    );
  }

  /**
   * If speedY is less than or equal to zero, this function pauses the jumping sound and sets the boolean characterJumpingSoundIsPlaying to false.
   */
  pauseJumpingSound(){
    if (this.speedY <= 0) {
      pauseSound("characterJumpingSound");
      this.characterJumpingSoundIsPlaying = false;
    }
  }

  /**
   * If the conditions for are met, this function plays the hurt sound and sets the boolean characterHurtSoundIsPlaying to true for this time.
   */
  hurtSound() {
    if (this.conditionHurtSoundMet()) {
      this.characterHurtSoundIsPlaying = true;
      playSound("characterHurtSound");
      setTimeout(() => {
        this.characterHurtSoundIsPlaying = false;
      }, 1000);
    }
  }

  /**
   * This function checks the conditions for the hurt sound.
   *
   * @returns {boolean} - Returns `true` if all conditions for the hurt sound are met, otherwise `false`.
   */
  conditionHurtSoundMet() {
    return (
      this.isHurt() && !this.characterHurtSoundIsPlaying && !this.world.gameOver
    );
  }

  /**
   * If the character is dead, this function plays the dying sound exactly once and deletes the interval that executes the dying sound function.
   * 
   * @param {string} id - This is interval that executes the dying sound function.
   */
  dyingSound(id) {
    if (this.isDead()) {
      clearInterval(id);
      playSound("characterDyingSound");
      setTimeout(() => {
        pauseSound("characterDyingSound");
      }, 1610);
    }
  }
  
  /**
   * This function checks whether the walking buttons are pressed.
   *
   * @returns {boolean} - Returns `true` if the walking buttons are pressed, otherwise `false`.
   */
  buttonsForWalkingArePressed() {
    return world.keyboard.RIGHT || world.keyboard.LEFT;
  }
}
