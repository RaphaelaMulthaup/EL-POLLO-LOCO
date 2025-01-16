class Level {
  enemies;
  clouds;
  collectibleObjects;
  backgroundObjects;
  level_end_x = 2700;

  /**
   * This function assigns different arrays to variables in the Level class.
   * 
   * @param {array} enemies - array with enemies
   * @param {array} clouds - array with clouds
   * @param {array} collectibleObjects - array with collectible objects
   * @param {array} backgroundObjects - array with background objects
   */
  constructor(enemies, clouds, collectibleObjects, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.collectibleObjects = collectibleObjects;
    this.backgroundObjects = backgroundObjects;
  }
}
