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
  recoil = false;
  recoilJump = false;

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
   * @param {object} world - The world class is passed.
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
    playSoundsCharacter();
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
      !this.buttonsForWalkingArePressed() &&
      new Date().getTime() - world.lastThrowTime >= 500
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
      !this.recoil &&
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
      !this.recoil &&
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
      !this.recoil &&
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
    this.movementRecoilJump();
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
      !this.recoil &&
      (this.world.keyboard.SPACE || this.world.keyboard.UP) &&
      !this.isAboveGround(145) &&
      !this.isHurt() &&
      !this.world.introAnimationEndboss &&
      !this.isDead()
    );
  }

  /**
   * This function causes the character to recoil when he hits the endboss with a bottle. It causes a jump and movement away from the endboss.
   */
  movementRecoilJump() {
    setInterval(() => {
      if (this.conditionsRecoilJumpMet()) {
        this.recoil = true;
        this.recoilJump = true;
        this.jump(24);
        this.movingDirectionRecoil();
        setTimeout(() => this.recoil = false, 700);
        setTimeout(() => this.recoilJump = false, 2000);
      }
    }, 1000 / 60);
  }

  /**
   * This function checks the conditions for the recoil jump state.
   *
   * @returns {boolean} - Returns `true` if all conditions for the recoil jump state are met, otherwise `false`.
   */
  conditionsRecoilJumpMet() {
    return (
      !this.recoilJump &&
      world.endboss.isHurt &&
      !this.isAboveGround(145) &&
      !this.isHurt() &&
      !this.world.introAnimationEndboss &&
      !this.isDead()
    );
  }

  /**
   * This function checks from which side the recoil occurs and moves the character accordingly. After the jump ends, the interval is stopped.
   */
  movingDirectionRecoil() {
    let movingBackwarts = setInterval(() => {
      if (this.x < world.endboss.x) {
        this.moveLeft();
      } else {
        this.moveRight();
      }
    }, 1000 / 60);
    setTimeout(() => {
      clearInterval(movingBackwarts);
    }, 700);
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
   * This function checks whether the walking buttons are pressed.
   *
   * @returns {boolean} - Returns `true` if the walking buttons are pressed, otherwise `false`.
   */
  buttonsForWalkingArePressed() {
    return world.keyboard.RIGHT || world.keyboard.LEFT;
  }
}
