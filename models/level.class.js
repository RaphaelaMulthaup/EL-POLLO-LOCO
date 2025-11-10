class Level {
  enemies;
  clouds;
  collectableObjects;
  backgroundObjects;
  level_end_x = 2700;

  /**
   * This function assigns different arrays to variables in the Level class.
   * 
   * @param {array} enemies - array with enemies
   * @param {array} clouds - array with clouds
   * @param {array} collectableObjects - array with collectable objects
   * @param {array} backgroundObjects - array with background objects
   */
  constructor(enemies, clouds, collectableObjects, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.collectableObjects = collectableObjects;
    this.backgroundObjects = backgroundObjects;
  }
}
