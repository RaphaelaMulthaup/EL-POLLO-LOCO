class MovableObject extends DrawableObject {
  speed;
  speedY = 0;
  acceleration = 3;
  energy = 100;
  lastHit = 0;
  world;
  character;
  isCollidingWithCharacter = false;
  isAlive = true;
  isBelowFromCharacter = false;

  /**
   * This function allows access to 'DrawableObject' and sets up periodic checks for its position relative to the character.
   */
  constructor() {
    super();
    this.isBelowFromCharacterStatusBoolean();
  }

  /**
   * This function sets the world context for the movable object.
   * @param {object} world - The game world.
   */
  setWorld(world) {
    this.world = world;
    this.character = world.character;
  }

  /**
   * This function starts the object's life cycle, including animations, movement, and sound.
   */
  bringToLife() {
    this.animate();
    this.movement();
    this.playSound();
  }

  /**
   * This function manages animations for walking and dying states of the object.
   */
  animate() {
    setInterval(() => {
      if (this.isAlive) this.playAnimation(this.IMAGES_WALKING);
    }, 150);
    setInterval(() => {
      if (!this.isAlive) this.playAnimation(this.IMAGE_DYING);
    }, 100);
  }

  /**
   * This function handles the horizontal movement of the object if it's alive.
   */
  movement() {
    setInterval(() => {
      if (this.isAlive) this.moveLeft();
    }, 1000 / 60);
  }

  /**
   * This function periodically executes the sound functions.
   */
  playSound() {
    setStoppableInterval(() => this.playWalkingSound(), 5000);
    setStoppableInterval((id) => this.playDyingSound(id), 1000 / 60);
  }

  /**
   * This function plays walking sounds based on the kind of the enemy.
   */
  playWalkingSound() {
    if (this.conditionsWalkingSoundEnemiesMet()) {
      if (this instanceof Chick) playSound("chickWalkingSound");
      if (this instanceof Chicken) playSound("chickenWalkingSound");
    }
  }

  /**
   * This function checks if the conditions for playing the enemies walking sounds are met.
   *
   * @returns {boolean} True if the enemy is alive and near the character.
   */
  conditionsWalkingSoundEnemiesMet() {
    return (
      this.isAlive &&
      this.x > this.character.x - 60 &&
      this.x < this.character.x + 660
    );
  }

  /**
   * Plays dying sounds and stops the interval when the object is no longer alive.
   *
   * @param {number} id - The interval ID.
   */
  playDyingSound(id) {
    if (!this.isAlive) {
      clearInterval(id);
      if (this instanceof Chick) {
        playSound("chickDyingingSound");
        setTimeout(() => pauseSound("chickenDyingingSound"), 500);
      }
      if (this instanceof Chicken) {
        playSound("chickenDyingingSound");
        setTimeout(() => pauseSound("chickenDyingingSound"), 800);
      }
    }
  }

  /**
   * Applies gravity to the object if certain conditions are met.
   *
   * @param {number} imgTouchesGround - The ground level for the object.
   */
  applyGravity(imgTouchesGround) {
    setInterval(() => {
      if (this.conditionsApplyingGravityMet(imgTouchesGround)) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if gravity should be applied.
   *
   * @param {number} imgTouchesGround - The ground level for the object.
   * @returns {boolean} Returnes 'true' if the object is above ground or moving upwards, otherwise 'false'.
   */
  conditionsApplyingGravityMet(imgTouchesGround) {
    return this.isAboveGround(imgTouchesGround) || this.speedY > 0;
  }

  /**
   * Determines if the object is above the ground level.
   *
   * @param {number} imgTouchesGround - The ground level for the object.
   * @returns {boolean} Returnes 'true' if the object is above ground, otherwise 'false'.
   */
  isAboveGround(imgTouchesGround) {
    return this.y < imgTouchesGround;
  }

  /**
   * Checks if the object is colliding with another object.
   *
   * @param {object} obj - The other object.
   * @returns {boolean} Returnes 'true' if collision is detected, otherwise 'false'.
   */
  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
      this.x + this.offset.left <= obj.x + obj.width - obj.offset.right &&
      this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
      this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom
    );
  }

  /**
   * This function reduces the energy of the object when hit by an enemy, based on the type of enemy. If the energy drops to zero, the object is marked as having no energy left. Otherwise, the time of the last hit is recorded.
   *
   * @param {string} enemyTyp - The type of enemy causing the hit.
   */
  hit(enemyTyp) {
    if (enemyTyp == "Chicken" || enemyTyp == "Endboss") this.energy -= 20;
    if (enemyTyp == "Chick") this.energy -= 10;
    this.energy <= 0
      ? (this.energy = 0)
      : (this.lastHit = new Date().getTime());
  }

  /**
   * This function checks if the object is currently in a hurt state.
   *
   * @returns {boolean} - Returnes 'true' if the object is hurt, otherwise 'false'.
   */
  isHurt() {
    return this.lastHit + 1000 >= new Date().getTime();
  }

  /**
   * This function checks if the object is dead.
   *
   * @returns {boolean} - Returnes 'true' if the object is dead, otherwise 'false'.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * This function flips the image horizontally by applying transformations to the canvas context. The x-coordinate of the object is also reversed to maintain proper positioning.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas context used for rendering.
   */
  flipImg(ctx) {
    ctx.save();
    ctx.translate(this.width, 0);
    ctx.scale(-1, 1);
    this.x = this.x * -1;
  }

  /**
   * This function reverts the horizontal flip by restoring the canvas context and reversing the x-coordinate of the object.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas context used for rendering.
   */
  flipImgBack(ctx) {
    this.x = this.x * -1;
    ctx.restore();
  }

  /**
   * This function moves the object to the left by decreasing its x-coordinate based on its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * This function moves the object to the right by increasing its x-coordinate based on its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * This function plays an animation by cycling through an array of image paths. It updates the current image of the object based on the current frame index.
   *
   * @param {array} images - An array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * This function makes the object jump by setting its vertical speed.
   *
   * @param {number} speedY - The vertical speed of the jump.
   */
  jump(speedY) {
    this.speedY = speedY;
  }

  /**
   * This function handles the logic for when the object dies due to a collision with a bottle. It marks the bottle as having collided and triggers the object's dying behavior.
   *
   * @param {object} bottle - The bottle object involved in the collision.
   */
  deadFromCollision(bottle) {
    bottle.collisionWithEnemy = true;
    this.dying();
  }

  /**
   * This function handles the dying process of the object. It sets the object as no longer alive and removes it from the world's enemy array after a delay.
   */
  dying() {
    if (this.isAlive) {
      this.isAlive = false;
      setTimeout(() => {
        let enemyIndex = this.world.level.enemies.indexOf(this);
        this.world.level.enemies.splice(enemyIndex, 1);
      }, 1000);
    }
  }

  /**
   * This function continuously updates the `isBelowFromCharacter` status of the object. It checks whether the object is below the character and updates the status accordingly.
   */
  isBelowFromCharacterStatusBoolean() {
    setInterval(() => {
      if (this.conditionsBeingBelowFromCharacterMet())
        this.isBelowFromCharacter = true;
      if (this.canChangeBack()) this.isBelowFromCharacter = false;
    }, 200);
  }

  /**
   * This function checks if the object meets the conditions to be considered below the character.
   *
   * @returns {boolean} - True if the object is below the character, false otherwise.
   */
  conditionsBeingBelowFromCharacterMet() {
    return (
      this.world &&
      (this instanceof Chicken || this instanceof Chick) &&
      this.isBelowFromCharacterFunction()
    );
  }

  /**
   * This function checks if the object can change its status back from being below the character.
   *
   * @returns {boolean} - True if the object can change back, false otherwise.
   */
  canChangeBack() {
    return this.isBelowFromCharacter && !this.character.isAboveGround(145);
  }

  /**
   * This function determines if the object is below the character based on their positions.
   *
   * @returns {boolean} - True if the object is below the character, false otherwise.
   */
  isBelowFromCharacterFunction() {
    return (
      this.y + 20 > this.world.character.y + this.world.character.height - 13 &&
      this.x + this.width > this.character.x + 20 &&
      this.x < this.character.x + this.character.width - 30
    );
  }
}
