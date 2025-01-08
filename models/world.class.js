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

  setWorld() {
    this.character.world = this;
    this.level.clouds.forEach((cloud) => cloud.setWorld(this));
    this.level.enemies.forEach((enemy) => enemy.setWorld(this));
  }

  draw() {
    if (this.gameOver) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.addBackgroundObjectsToMap();
    this.addFixedObjectsToMap();
    this.addGameObjectsToMap();

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(() => self.draw());
  }

  addBackgroundObjectsToMap() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  addToMap(obj) {
    if (obj.otherDirection) obj.flipImg(this.ctx);
    obj.draw(this.ctx);
    if (obj.otherDirection) obj.flipImgBack(this.ctx);
  }

  addFixedObjectsToMap() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarLife);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottles);
    this.addObjectsToMap(this.statusBarEndboss);
    this.addObjectsToMap(this.coinsAnimation);
    this.ctx.translate(this.camera_x, 0);
  }

  addGameObjectsToMap() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableBottles);
    this.addObjectsToMap(this.level.collectibleObjects);
  }

  checkEvents() {
    this.checkCollisions();
    setStoppableInterval(() => this.checkThrowBottle(), 1000 / 60);
    this.checkCollisionsBottlesEmemies();
    this.checkGameIsOver();
  }

  checkCollisions() {
    this.checkCollisionWithEnemys();
    this.checkCollisionWithCollectibleObject();
  }

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

  stomp(enemy) {
    return (
      (enemy instanceof Chicken || enemy instanceof Chick) &&
      this.characterIsLandingOn(enemy) &&
      !enemy.isCollidingWithCharacter &&
      !this.character.isDead()
    );
  }

  characterIsLandingOn(enemy) {
    return (
      this.character.isColliding(enemy) &&
      enemy.isBelowFromCharacter &&
      this.character.speedY < 0
    );
  }

  conditionsForLateralCollisionMet(enemy) {
    return (
      this.character.isColliding(enemy) &&
      enemy.isAlive &&
      !enemy.isCollidingWithCharacter
    );
  }

  lateralCollision(enemy) {
    this.character.hit(enemy.constructor.name);
    this.statusBarLife.setPercentageLifes(this.character.energy);
    enemy.isCollidingWithCharacter = true;
    setTimeout(() => (enemy.isCollidingWithCharacter = false), 1500);
    if (this.conditionsForTurningCoinsIntoEnergyMet()) {
      setTimeout(() => this.turnCoinsIntoEnergy(), 750);
    }
  }

  conditionsForTurningCoinsIntoEnergyMet() {
    return (
      this.character.energy <= 80 &&
      this.collectedCoins == 5 &&
      !this.endboss.isDead() &&
      this.character.energy > 0
    );
  }

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

  conditionsForCollectingBottleMet(obj) {
    return (
      obj instanceof CollectibleBottle &&
      this.character.isColliding(obj) &&
      this.collectedBottles < 5
    );
  }

  collectBottle(indexOfObj) {
    this.playCollectBottleSound();
    this.level.collectibleObjects.splice(indexOfObj, 1);
    this.collectedBottles += 1;
    this.statusBarBottles.setPercentage(this.collectedBottles * 20);
  }

  playCollectBottleSound() {
    playSound("collectBottleSound");
  }

  conditionsForCollectingCoinMet(obj) {
    return (
      obj instanceof CollectibleCoin &&
      this.character.isColliding(obj) &&
      this.collectedCoins < 5
    );
  }

  collectCoin(indexOfObj) {
    playSound("collectCoinSound");
    this.level.collectibleObjects.splice(indexOfObj, 1);
    this.collectedCoins += 1;
    this.statusBarCoins.setPercentage(this.collectedCoins * 20);
  }

  turnCoinsIntoEnergy() {
    setTimeout(() => {
      this.setCollectedCoinsToZero();
      this.increaseEnergy();
      this.animateFyingCoins();
    }, 500);
  }

  setCollectedCoinsToZero() {
    this.collectedCoins = 0;
    this.statusBarCoins.setPercentage(this.collectedCoins * 20);
  }

  increaseEnergy() {
    this.character.energy += 20;
    this.character.energy = Math.min(this.character.energy, 100);
    this.statusBarLife.setPercentageLifes(this.character.energy);
  }

  animateFyingCoins() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        let coinAnimation = new CoinAnimation();
        this.coinsAnimation.push(coinAnimation);
      }, 200 * i);
    }
  }

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

  bottleHitsChickenOrChick(enemy, bottle) {
    return (
      (enemy instanceof Chicken || enemy instanceof Chick) &&
      bottle.isColliding(enemy)
    );
  }

  bottleHitsEndboss(enemy, bottle) {
    return enemy instanceof Endboss && bottle.isColliding(enemy);
  }

  checkGameIsOver() {
    let intervalCheckGameOver = setInterval(() => {
      if (this.endboss.isDead() || gameIsLost()) {
        clearInterval(intervalCheckGameOver);
        this.checkGameIsWon();
        this.checkGameIsLost();
        setTimeout(() => {
          displayEndscreen();
          playSound("mexicanHatDance");
        }, 1000);
      }
    }, 1000 / 60);
  }

  checkGameIsWon() {
    if (this.endboss.isDead()) {
      setTimeout(() => {
        this.gameOver = true;
        stoppableIntervalIds.forEach(clearInterval);
      }, 600);
    }
  }

  checkGameIsLost() {
    if (gameIsLost()) {
      setTimeout(() => stoppableIntervalIds.forEach(clearInterval), 500);
      setTimeout(() => {
        this.gameOver = true;
        pauseSound("backgroundMusicGame");
      }, 1000);
    }
  }
}
