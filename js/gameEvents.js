/**
 * Checks various game events such as collisions, bottle throwing, and game-over conditions.
 */
function checkEvents() {
  checkCollisions();
  setStoppableInterval(() => checkThrowBottle(), 1000 / 60);
  checkCollisionsBottlesEmemies();
  checkGameIsOver();
}

/**
 * Checks for collisions between the character and enemies or collectable objects.
 */
function checkCollisions() {
  checkCollisionWithEnemys();
  checkCollisionWithCollectableObject();
}

/**
 * Checks for collisions between the character and enemies, triggering the actions enemy death or lateral collision.
 */
function checkCollisionWithEnemys() {
  setInterval(() => {
    world.level.enemies.forEach((enemy) => {
      if (stomp(enemy)) {
        enemy.dying();
      } else if (conditionsForLateralCollisionMet(enemy))
        lateralCollision(enemy);
    });
  }, 50);
}

/**
 * Checks if the character is stomping on an enemy.
 *
 * @param {object} enemy - The enemy to check.
 * @returns {boolean} Returns true if the character is landing on the enemy.
 */
function stomp(enemy) {
  return (
    (enemy instanceof Chicken || enemy instanceof Chick) &&
    characterIsLandingOn(enemy) &&
    !enemy.isCollidingWithCharacter &&
    !character.isDead()
  );
}

/**
 * Checks if the character is landing on the enemy.
 *
 * @param {object} enemy - The enemy to check.
 * @returns {boolean} Returns true if the character is landing on the enemy.
 */
function characterIsLandingOn(enemy) {
  return (
    character.isColliding(enemy) &&
    enemy.isBelowFromCharacter &&
    character.speedY < 0
  );
}

/**
 * Checks if the conditions for a lateral collision with an enemy are met.
 *
 * @param {object} enemy - The enemy to check.
 * @returns {boolean} Returns true if the conditions for a lateral collision are met.
 */
function conditionsForLateralCollisionMet(enemy) {
  return (
    character.isColliding(enemy) &&
    enemy.isAlive &&
    !enemy.isCollidingWithCharacter
  );
}

/**
 * Handles a lateral collision with an enemy. It reduces the character's energy based on the enemy type, updates the life status bar, and temporarily sets a collision state for the enemy to prevent repeated damage. Additionally, if certain conditions are met, coins collected by the character are converted into energy after a short delay.
 *
 * @param {object} enemy - The enemy causing the lateral collision.
 */
function lateralCollision(enemy) {
  character.hit(enemy.constructor.name);
  world.statusBarLife.setPercentageLifes(character.energy);
  enemy.isCollidingWithCharacter = true;
  setTimeout(() => (enemy.isCollidingWithCharacter = false), 1500);
  if (conditionsForTurningCoinsIntoEnergyMet()) {
    setTimeout(() => turnCoinsIntoEnergy(), 750);
  }
}

/**
 * Checks if the conditions for turning collected coins into energy are met.
 *
 * @returns {boolean} Returns true if the conditions are met.
 */
function conditionsForTurningCoinsIntoEnergyMet() {
  return character.energy <= 80 && world.collectedCoins == 5 && !world.gameOver;
}

/**
 * Checks for collisions between the character and collectable objects like bottles and coins.
 */
function checkCollisionWithCollectableObject() {
  setInterval(() => {
    world.level.collectableObjects.forEach((obj, indexOfObj) => {
      if (conditionsForCollectingBottleMet(obj)) collectBottle(indexOfObj);
      if (conditionsForCollectingCoinMet(obj)) {
        collectCoin(indexOfObj);
        if (conditionsForTurningCoinsIntoEnergyMet()) turnCoinsIntoEnergy();
      }
    });
  }, 100);
}

/**
 * Checks if the conditions for collecting a bottle are met.
 *
 * @param {object} obj - The collectable object to check.
 * @returns {boolean} Returns true if the conditions for collecting a bottle are met.
 */
function conditionsForCollectingBottleMet(obj) {
  return (
    obj instanceof CollectableBottle &&
    character.isColliding(obj) &&
    world.collectedBottles < 5
  );
}

/**
 * Collects a bottle, deletes it from the array 'collectableObjects', adding it to the inventory and updating the status bar.
 *
 * @param {number} indexOfObj - The index of the object in the collectable objects array.
 */
function collectBottle(indexOfObj) {
  playCollectBottleSound();
  world.level.collectableObjects.splice(indexOfObj, 1);
  world.collectedBottles += 1;
  world.statusBarBottles.setPercentage(world.collectedBottles * 20);
}

/**
 * Plays the sound effect for collecting a bottle.
 */
function playCollectBottleSound() {
  playSound("collectBottleSound");
}

/**
 * Checks if the conditions for collecting a coin are met.
 *
 * @param {object} obj - The collectable object to check.
 * @returns {boolean} Returns true if the conditions for collecting a coin are met.
 */
function conditionsForCollectingCoinMet(obj) {
  return (
    obj instanceof CollectableCoin &&
    character.isColliding(obj) &&
    world.collectedCoins < 5
  );
}

/**
 * Collects a coin, deletes it from the array 'collectableObjects', adding it to the inventory and updating the status bar.
 *
 * @param {number} indexOfObj - The index of the object in the collectable objects array.
 */
function collectCoin(indexOfObj) {
  playSound("collectCoinSound");
  world.level.collectableObjects.splice(indexOfObj, 1);
  world.collectedCoins += 1;
  world.statusBarCoins.setPercentage(world.collectedCoins * 20);
}

/**
 * Turns collected coins into energy for the character.
 */
function turnCoinsIntoEnergy() {
  setTimeout(() => {
    setCollectedCoinsToZero();
    increaseEnergy();
    animateFyingCoins();
  }, 500);
}

/**
 * Resets the collected coins to zero and updates the status bar.
 */
function setCollectedCoinsToZero() {
  world.collectedCoins = 0;
  world.statusBarCoins.setPercentage(world.collectedCoins * 20);
}

/**
 * Increases the character's energy and updates the life status bar.
 */
function increaseEnergy() {
  character.energy += 20;
  character.energy = Math.min(character.energy, 100);
  world.statusBarLife.setPercentageLifes(character.energy);
}

/**
 * Animates flying coins for turning them into energy.
 */
function animateFyingCoins() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      let coinAnimation = new CoinAnimation();
      world.coinsAnimation.push(coinAnimation);
    }, 200 * i);
  }
}

/**
 * Checks if the character is throwing a bottle, triggering a bottle creation.
 */
function checkThrowBottle() {
  let currentTime = new Date().getTime();
  if (conditionsForThrowingBottleMet(currentTime)) {
    let throwableBottle = new ThrowableBottle(character);
    world.throwableBottles.push(throwableBottle);
    playSound("throwingBottleSound");
    world.lastThrowTime = currentTime;
    world.collectedBottles -= 1;
    world.statusBarBottles.setPercentage(world.collectedBottles * 20);
  }
}

/**
 * Checks if the conditions for throwing a bottle are met.
 *
 * @param {number} currentTime - The current time in milliseconds.
 * @returns {boolean} Returns true if the conditions for throwing a bottle are met.
 */
function conditionsForThrowingBottleMet(currentTime) {
  return (
    !character.recoil &&
    world.keyboard.D &&
    currentTime - world.lastThrowTime >= 500 &&
    world.collectedBottles != 0 &&
    !world.introAnimationEndboss &&
    !character.isHurt() &&
    !character.isDead()
  );
}

/**
 * Checks the collisions between bottles and enemies. When a bottle hits an enemy, the corresponding enemy is injured or killed.
 */
function checkCollisionsBottlesEmemies() {
  setInterval(() => {
    world.throwableBottles.forEach((bottle) => {
      world.level.enemies.forEach((enemy) => {
        if (bottleHitsChickenOrChick(enemy, bottle)) {
          enemy.deadFromCollision(bottle);
        } else if (bottleHitsEndboss(enemy, bottle)) {
          enemy.isHit(bottle);
          // Funktion einfügen durch die der Character zurcük fliegt      
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
function bottleHitsChickenOrChick(enemy, bottle) {
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
function bottleHitsEndboss(enemy, bottle) {
  return enemy instanceof Endboss && bottle.isColliding(enemy);
}

/**
 * Checks if the game is over. If the Endboss is dead or the player loses, the game ends. All intervals are cleared and the end screen is displayed.
 */
function checkGameIsOver() {
  let intervalCheckGameOver = setInterval(() => {
    if (world.endboss.isDead() || gameIsLost()) {
      clearInterval(intervalCheckGameOver);
      checkGameIsWon();
      checkGameIsLost();
      endscreenAndBreakMusic();
    }
  }, 1000 / 60);
}

/**
 * Shows the end screen and plays a sound. The sound is repeated continuously.
 */
function endscreenAndBreakMusic() {
  setTimeout(() => {
    displayEndscreen();
    playSound("mexicanHatDance");
    setInterval(() => {
      if (world.gameOverStopDrawing) playSound("mexicanHatDance");
    }, 37000);
  }, 1000);
}

/**
 * Checks if the game is won. If the Endboss is dead, the game is marked as over. After a timout, all stoppable intervals are cleared.
 */
function checkGameIsWon() {
  if (world.endboss.isDead()) {
    world.gameOver = true;
    setTimeout(() => {
      world.gameOverStopDrawing = true;
      stoppableIntervalIds.forEach(clearInterval);
    }, 600);
  }
}

/**
 * Checks if the game is lost.  If the game is lost, the game is marked as over. After a timout, all stoppable intervals are cleared and the backgroundmusic is paused.
 */
function checkGameIsLost() {
  if (gameIsLost()) {
    world.gameOver = true;
    setTimeout(() => stoppableIntervalIds.forEach(clearInterval), 500);
    setTimeout(() => {
      world.gameOverStopDrawing = true;
      pauseSound("backgroundMusicGame");
    }, 1000);
  }
}
