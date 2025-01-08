class ThrowableBottle extends MovableObject {
  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];
  speed = 5;
  otherDirection;
  collisionWithEnemy = false;
  rotation;
  movement;
  offset = {
    top: 22,
    left: 22,
    right: 22,
    bottom: 22,
  };

  constructor(character) {
    super();
    this.otherDirection = character.otherDirection;
    this.x = character.x + 40;
    this.y = character.y + 140;
    this.height = 70;
    this.width = 70;
    this.speedY = 30;
    this.loadImg(this.IMAGES_ROTATION[0]);
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.applyGravity(365);
    this.animate();
  }

  animate() {
    this.rotationInterval();
    this.movementInterval();
  }

  rotationInterval() {
    this.rotation = setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATION);
      if (this.conditionSplashAnimationMet()) {
        clearInterval(this.rotation);
        clearInterval(this.movement);
        this.playSplashAnimation();
        playSound("breakingBottleSound");
      }
    }, 100);
  }

  conditionSplashAnimationMet() {
    return !this.isAboveGround(365) || this.collisionWithEnemy;
  }

  playSplashAnimation() {
    let index = 0;
    let splashInterval = setInterval(() => {
      index < this.IMAGES_SPLASH.length
        ? ((this.img = this.imageCache[this.IMAGES_SPLASH[index]]), index++)
        : (clearInterval(splashInterval),
          setTimeout(() => this.removeThrowableBottle(), 50));
    }, 35);
  }

  movementInterval() {
    this.movement = setInterval(() => {
      if (world.character.buttonsForWalkingArePressed()) this.speed = 7;
      this.otherDirection ? this.moveLeft() : this.moveRight();
    }, 1000 / 60);
  }

  removeThrowableBottle() {
    let index = world.throwableBottles.indexOf(this);
    world.throwableBottles.splice(index, 1);
  }
}
