class Cloud extends MovableObject {
  y = 0;
  width = 720;
  height = 480;
  speed = 0.1;
  world;

  /**
   * This function allows access to 'MovableObject', loads the image, sets the values ​​for x and animates the clouds after the world was set.
   */
  constructor(minX) {
    super();
    this.loadImg("img/5_background/layers/4_clouds/1.png");
    this.x = minX + Math.random() * 200;
    this.waitForWorld();
  }

  /**
   * This function sets the world inside cloud.class.js.
   * 
   * @param {class} world - The world of the game.
   */
  setWorld(world) {
    this.world = world;
  }

  /**
   * This function waits until the world is set before calling the animate function and then shutting itself off.
   */
  waitForWorld() {
    const intervalWaitForWorld = setInterval(() => {
      if (this.world) {
        this.animate();
        clearInterval(intervalWaitForWorld);
      }
    }, 100);
  }

  /**
   * This function checks in which direction the clouds should fly and executes the corresponding movement.
   */
  animate() {
    setInterval(() => {
      this.world.directionClouds === "left"
        ? this.moveLeft()
        : this.moveRight();
    }, 1000 / 60);
  }
}
