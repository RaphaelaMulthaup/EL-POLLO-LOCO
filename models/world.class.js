class World {
  level = level1;
  endboss = new Endboss(this);
  character;
  statusBarLife = new StatusBarLife();
  statusBarCoins = new StatusBarCoins();
  statusBarBottles = new StatusBarBottles();
  statusBarEndboss = [];
  canvas;
  ctx;
  keyboard;
  camera_x = 60;
  directionClouds = Math.random() < 0.5 ? "left" : "right";
  throwableBottles = [];
  collectedBottles = 0;
  collectedCoins = 0;
  lastThrowTime = 0;
  coinsAnimation = [];
  introAnimationEndboss = false;
  firstEncounterEndbossHappend = false;
  gameOver = false;
  gameOverStopDrawing = false;

  /**
   * This function initializes various components such as the canvas, keyboard, character, and level. It calls the functions that make the game run.
   *
   * @param {HTMLCanvasElement} canvas - The canvas where the game is rendered.
   * @param {object} keyboard - The keyboard input handler for controlling the character.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;

    this.keyboard = keyboard;
    this.level.enemies.push(this.endboss);
    this.character = new Character(this);

    this.setWorld();
    this.draw();
    this.checkEvents();
  }

  /**
   * Sets up the world by linking the character, enemies, and clouds to the world context.
   */
  setWorld() {
    this.character.world = this;
    this.level.clouds.forEach((cloud) => cloud.setWorld(this));
    this.level.enemies.forEach((enemy) => enemy.setWorld(this));
  }

  /**
   * Main drawing function for the game. Clears the canvas and redraws the game world at each frame. Calls itself again and again as long as the game is not over.
   */
  draw() {
    if (this.gameOverStopDrawing) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.addBackgroundObjectsToMap();
    this.addFixedObjectsToMap();
    this.addGameObjectsToMap();

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(() => self.draw());
  }

  /**
   * Adds background objects to the game world.
   */
  addBackgroundObjectsToMap() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
  }

  /**
   * Adds a list of objects to the game world.
   *
   * @param {Array} objects - An array of objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  /**
   * Adds an individual object to the map. When an image is to be rendered, it is fliped before it is drawn.
   *
   * @param {Object} obj - The object to be added to the map.
   */
  addToMap(obj) {
    if (obj.otherDirection) obj.flipImg(this.ctx);
    obj.draw(this.ctx);
    if (obj.otherDirection) obj.flipImgBack(this.ctx);
  }

  /**
   * Adds fixed objects to the game world. The drawing area moves to the left so that the added objects are displayed relative to the camera.
   */
  addFixedObjectsToMap() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarLife);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottles);
    this.addObjectsToMap(this.statusBarEndboss);
    this.addObjectsToMap(this.coinsAnimation);
    this.ctx.translate(this.camera_x, 0);
  }

  /**
   * Adds dynamic game objectsto the game world.
   */
  addGameObjectsToMap() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableBottles);
    this.addObjectsToMap(this.level.collectibleObjects);
  }

  /**
   * Checks various game events such as collisions, bottle throwing, and game-over conditions.
   */
  checkEvents() {
    this.checkCollisions();
    setStoppableInterval(() => this.checkThrowBottle(), 1000 / 60);
    this.checkCollisionsBottlesEmemies();
    this.checkGameIsOver();
  }

  /**
   * Checks for collisions between the character and enemies or collectible objects.
   */
  checkCollisions() {
    this.checkCollisionWithEnemys();
    this.checkCollisionWithCollectibleObject();
  }

  /**
   * Checks for collisions between the character and enemies, triggering the actions enemy death or lateral collision.
   */
  checkCollisionWithEnemys() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.stomp(enemy)) {
          enemy.dying();
        } else if (this.conditionsForLateralCollisionMet(enemy))
          this.lateralCollision(enemy);
      });
    }, 50);
  }

  /**
   * Checks if the character is stomping on an enemy.
   *
   * @param {object} enemy - The enemy to check.
   * @returns {boolean} Returns true if the character is landing on the enemy.
   */
  stomp(enemy) {
    return (
      (enemy instanceof Chicken || enemy instanceof Chick) &&
      this.characterIsLandingOn(enemy) &&
      !enemy.isCollidingWithCharacter &&
      !this.character.isDead()
    );
  }

  /**
   * Checks if the character is landing on the enemy.
   *
   * @param {object} enemy - The enemy to check.
   * @returns {boolean} Returns true if the character is landing on the enemy.
   */
  characterIsLandingOn(enemy) {
    return (
      this.character.isColliding(enemy) &&
      enemy.isBelowFromCharacter &&
      this.character.speedY < 0
    );
  }

  /**
   * Checks if the conditions for a lateral collision with an enemy are met.
   *
   * @param {object} enemy - The enemy to check.
   * @returns {boolean} Returns true if the conditions for a lateral collision are met.
   */
  conditionsForLateralCollisionMet(enemy) {
    return (
      this.character.isColliding(enemy) &&
      enemy.isAlive &&
      !enemy.isCollidingWithCharacter
    );
  }

  /**
   * Handles a lateral collision with an enemy. It reduces the character's energy based on the enemy type, updates the life status bar, and temporarily sets a collision state for the enemy to prevent repeated damage. Additionally, if certain conditions are met, coins collected by the character are converted into energy after a short delay.
   *
   * @param {object} enemy - The enemy causing the lateral collision.
   */
  lateralCollision(enemy) {
    this.character.hit(enemy.constructor.name);
    this.statusBarLife.setPercentageLifes(this.character.energy);
    enemy.isCollidingWithCharacter = true;
    setTimeout(() => (enemy.isCollidingWithCharacter = false), 1500);
    if (this.conditionsForTurningCoinsIntoEnergyMet()) {
      setTimeout(() => this.turnCoinsIntoEnergy(), 750);
    }
  }

  /**
   * Checks if the conditions for turning collected coins into energy are met.
   * 
   * @returns {boolean} Returns true if the conditions are met.
   */
  conditionsForTurningCoinsIntoEnergyMet() {
    return (
      this.character.energy <= 80 && this.collectedCoins == 5 && !this.gameOver
    );
  }

  /**
   * Checks for collisions between the character and collectible objects like bottles and coins.
   */
  checkCollisionWithCollectibleObject() {
    setInterval(() => {
      this.level.collectibleObjects.forEach((obj, indexOfObj) => {
        if (this.conditionsForCollectingBottleMet(obj))
          this.collectBottle(indexOfObj);
        if (this.conditionsForCollectingCoinMet(obj)) {
          this.collectCoin(indexOfObj);
          if (this.conditionsForTurningCoinsIntoEnergyMet())
            this.turnCoinsIntoEnergy();
        }
      });
    }, 100);
  }

  /**
   * Checks if the conditions for collecting a bottle are met.
   *
   * @param {object} obj - The collectible object to check.
   * @returns {boolean} Returns true if the conditions for collecting a bottle are met.
   */
  conditionsForCollectingBottleMet(obj) {
    return (
      obj instanceof CollectibleBottle &&
      this.character.isColliding(obj) &&
      this.collectedBottles < 5
    );
  }

  /**
   * Collects a bottle, deletes it from the array 'collectibleObjects', adding it to the inventory and updating the status bar.
   *
   * @param {number} indexOfObj - The index of the object in the collectible objects array.
   */
  collectBottle(indexOfObj) {
    this.playCollectBottleSound();
    this.level.collectibleObjects.splice(indexOfObj, 1);
    this.collectedBottles += 1;
    this.statusBarBottles.setPercentage(this.collectedBottles * 20);
  }

  /**
   * Plays the sound effect for collecting a bottle.
   */
  playCollectBottleSound() {
    playSound("collectBottleSound");
  }

  /**
   * Checks if the conditions for collecting a coin are met.
   *
   * @param {object} obj - The collectible object to check.
   * @returns {boolean} Returns true if the conditions for collecting a coin are met.
   */
  conditionsForCollectingCoinMet(obj) {
    return (
      obj instanceof CollectibleCoin &&
      this.character.isColliding(obj) &&
      this.collectedCoins < 5
    );
  }

  /**
   * Collects a coin, deletes it from the array 'collectibleObjects', adding it to the inventory and updating the status bar.
   *
   * @param {number} indexOfObj - The index of the object in the collectible objects array.
   */
  collectCoin(indexOfObj) {
    playSound("collectCoinSound");
    this.level.collectibleObjects.splice(indexOfObj, 1);
    this.collectedCoins += 1;
    this.statusBarCoins.setPercentage(this.collectedCoins * 20);
  }

  /**
   * Turns collected coins into energy for the character.
   */
  turnCoinsIntoEnergy() {
    setTimeout(() => {
      this.setCollectedCoinsToZero();
      this.increaseEnergy();
      this.animateFyingCoins();
    }, 500);
  }

  /**
   * Resets the collected coins to zero and updates the status bar.
   */
  setCollectedCoinsToZero() {
    this.collectedCoins = 0;
    this.statusBarCoins.setPercentage(this.collectedCoins * 20);
  }

  /**
   * Increases the character's energy and updates the life status bar.
   */
  increaseEnergy() {
    this.character.energy += 20;
    this.character.energy = Math.min(this.character.energy, 100);
    this.statusBarLife.setPercentageLifes(this.character.energy);
  }

  /**
   * Animates flying coins for turning them into energy.
   */
  animateFyingCoins() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        let coinAnimation = new CoinAnimation();
        this.coinsAnimation.push(coinAnimation);
      }, 200 * i);
    }
  }

  /**
   * Checks if the character is throwing a bottle, triggering a bottle creation.
   */
  checkThrowBottle() {
    let currentTime = new Date().getTime();
    if (this.conditionsForThrowingBottleMet(currentTime)) {
      let throwableBottle = new ThrowableBottle(this.character);
      this.throwableBottles.push(throwableBottle);
      playSound("throwingBottleSound");
      this.lastThrowTime = currentTime;
      this.collectedBottles -= 1;
      this.statusBarBottles.setPercentage(this.collectedBottles * 20);
    }
  }

  /**
   * Checks if the conditions for throwing a bottle are met.
   *
   * @param {number} currentTime - The current time in milliseconds.
   * @returns {boolean} Returns true if the conditions for throwing a bottle are met.
   */
  conditionsForThrowingBottleMet(currentTime) {
    return (
      this.keyboard.D &&
      currentTime - this.lastThrowTime >= 500 &&
      this.collectedBottles != 0 &&
      !this.introAnimationEndboss &&
      !this.character.isHurt() &&
      !this.character.isDead()
    );
  }

  /**
   * Checks the collisions between bottles and enemies. When a bottle hits an enemy, the corresponding enemy is injured or killed.
   */
  checkCollisionsBottlesEmemies() {
    setInterval(() => {
      this.throwableBottles.forEach((bottle) => {
        this.level.enemies.forEach((enemy) => {
          if (this.bottleHitsChickenOrChick(enemy, bottle)) {
            enemy.deadFromCollision(bottle);
          } else if (this.bottleHitsEndboss(enemy, bottle)) {
            enemy.isHit(bottle);
          }
        });
      });
    }, 1000 / 60);
  }

  /**
   * Checks if a bottle hits a chicken or chick.
   *
   * @param {object} enemy - The enemy to check.
   * @param {object} bottle - The thrown bottle.
   * @returns {boolean} Returns true if the bottle hits the chicken or chick.
   */
  bottleHitsChickenOrChick(enemy, bottle) {
    return (
      (enemy instanceof Chicken || enemy instanceof Chick) &&
      bottle.isColliding(enemy)
    );
  }

  /**
   * Checks if a bottle hits the Endboss.
   *
   * @param {object} enemy - The enemy to check.
   * @param {object} bottle - The thrown bottle.
   * @returns {boolean} Returns true if the bottle hits the Endboss.
   */
  bottleHitsEndboss(enemy, bottle) {
    return enemy instanceof Endboss && bottle.isColliding(enemy);
  }

  /**
   * Checks if the game is over. If the Endboss is dead or the player loses, the game ends. All intervals are cleared and the end screen is displayed.
   */
  checkGameIsOver() {
    let intervalCheckGameOver = setInterval(() => {
      if (this.endboss.isDead() || gameIsLost()) {
        clearInterval(intervalCheckGameOver);
        this.checkGameIsWon();
        this.checkGameIsLost();
        this.endscreenAndBreakMusic();
      }
    }, 1000 / 60);
  }

  /**
   * Shows the end screen and plays a sound. The sound is repeated continuously.
   */
  endscreenAndBreakMusic() {
    setTimeout(() => {
      displayEndscreen();
      playSound("mexicanHatDance");
      setInterval(() => {
        if (this.gameOverStopDrawing) playSound("mexicanHatDance");
      }, 37000);
    }, 1000);
  }

  /**
   * Checks if the game is won. If the Endboss is dead, the game is marked as over. After a timout, all stoppable intervals are cleared.
   */
  checkGameIsWon() {
    if (this.endboss.isDead()) {
      this.gameOver = true;
      setTimeout(() => {
        this.gameOverStopDrawing = true;
        stoppableIntervalIds.forEach(clearInterval);
      }, 600);
    }
  }

  /**
   * Checks if the game is lost.  If the game is lost, the game is marked as over. After a timout, all stoppable intervals are cleared and the backgroundmusic is paused.
   */
  checkGameIsLost() {
    if (gameIsLost()) {
      this.gameOver = true;
      setTimeout(() => stoppableIntervalIds.forEach(clearInterval), 500);
      setTimeout(() => {
        this.gameOverStopDrawing = true;
        pauseSound("backgroundMusicGame");
      }, 1000);
    }
  }
}
