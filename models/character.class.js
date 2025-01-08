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

  bringToLife() {
    this.animate();
    this.movement();
    this.playSound();
  }

  animate() {
    this.animateIdle();
    this.animateLongIdle();
    this.animateWalking();
    this.animateJumping();
    this.animateHurt();
    this.animateDying();
  }

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

  atIdle() {
    return (
      !this.isDead() &&
      !this.isHurt() &&
      !this.isAboveGround(145) &&
      !this.buttonsForWalkingArePressed()
    );
  }

  animateLongIdle() {
    setInterval(() => {
      if (this.idleTime >= 15000) this.playAnimation(this.IMAGES_LONG_IDLE);
    }, 200);
  }

  animateWalking() {
    setInterval(() => {
      if (this.isWalking()) this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }

  isWalking() {
    return (
      !this.world.introAnimationEndboss &&
      !this.isDead() &&
      !this.isHurt() &&
      !this.isAboveGround(145) &&
      this.buttonsForWalkingArePressed()
    );
  }

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

  animateHurt() {
    setInterval(() => {
      if (this.isHurt() && !this.world.gameOver)
        this.playAnimation(this.IMAGES_HURT);
    }, 100);
  }

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

  movement() {
    this.movementRight();
    this.movementLeft();
    this.movementJumping();
  }

  movementRight() {
    setInterval(() => {
      if (this.conditionsMovingRightMet()) {
        this.moveRight();
        this.otherDirection = false;
      }
    }, 1000 / 60);
  }

  conditionsMovingRightMet() {
    return (
      this.world.keyboard.RIGHT &&
      this.x < this.world.level.level_end_x &&
      !this.isHurt() &&
      !this.world.introAnimationEndboss &&
      !this.isDead()
    );
  }

  movementLeft() {
    setInterval(() => {
      if (this.conditionsMovingLeftMet()) {
        this.moveLeft();
        this.otherDirection = true;
      }
    }, 1000 / 60);
  }

  conditionsMovingLeftMet() {
    return (
      this.world.keyboard.LEFT &&
      this.x > 0 &&
      !this.isHurt() &&
      !this.world.introAnimationEndboss &&
      !this.isDead()
    );
  }

  movementJumping() {
    setInterval(() => {
      if (this.conditionsJumpingMet()) this.jump(30);
    }, 1000 / 60);
    let intervalJumpingWhileDying = setInterval(() => {
      if (this.isDead() && !this.isAboveGround(145)) {
        setTimeout(() => {
          this.jump(10);
          clearInterval(intervalJumpingWhileDying);
        }, 200);
      }
    }, 1000 / 60);
  }

  conditionsJumpingMet() {
    return (
      (this.world.keyboard.SPACE || this.world.keyboard.UP) &&
      !this.isAboveGround(145) &&
      !this.isHurt() &&
      !this.world.introAnimationEndboss &&
      !this.isDead()
    );
  }

  playSound() {
    setStoppableInterval(() => this.playYawningSound(), 200);
    setStoppableInterval(() => this.playWalkingSound(), 200);
    setStoppableInterval(() => this.playJumpingSound(), 200);
    setStoppableInterval(() => this.playHurtSound(), 200);
    setStoppableInterval((id) => this.playDyingSound(id), 200);
  }

  playYawningSound() {
    if (this.idleTime >= 15000 && !this.isYawning) {
      this.isYawning = true;
      this.yawningSoundActive();
    }
    if (this.idleTime < 1500) this.isYawning = false;
  }

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

  playWalkingSound() {
    if (this.conditionsWalkingSoundMet()) {
      if (!this.characterWalkingSoundIsPlaying) {
        playSound("characterWalkingSound");
        this.characterWalkingSoundIsPlaying = true;
      }
    } else {
      pauseSound("characterWalkingSound");
      this.characterWalkingSoundIsPlaying = false;
    }
  }

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

  playJumpingSound() {
    if (this.conditionsJumpingSoundMet()) {
      this.characterJumpingSoundIsPlaying = true;
      playSound("characterJumpingSound");
    }
    if (this.speedY <= 0) {
      pauseSound("characterJumpingSound");
      this.characterJumpingSoundIsPlaying = false;
    }
  }

  conditionsJumpingSoundMet() {
    return (
      this.speedY > 0 && !this.isDead() && !this.characterJumpingSoundIsPlaying
    );
  }

  playHurtSound() {
    if (this.conditionHurtSoundMet()) {
      this.characterHurtSoundIsPlaying = true;
      playSound("characterHurtSound");
      setTimeout(() => {
        this.characterHurtSoundIsPlaying = false;
      }, 1000);
    }
  }

  conditionHurtSoundMet() {
    return (
      this.isHurt() &&
      !this.characterHurtSoundIsPlaying &&
      !this.world.gameOver
    );
  }

  playDyingSound(id) {
    if (this.isDead()) {
      clearInterval(id);
      playSound("characterDyingSound");
      setTimeout(() => {
        pauseSound("characterDyingSound");
      }, 1610);
    }
  }

  buttonsForWalkingArePressed() {
    return world.keyboard.RIGHT || world.keyboard.LEFT;
  }
}
