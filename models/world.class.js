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
    checkEvents();
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
    this.addObjectsToMap(this.level.collectableObjects);
  }
}
