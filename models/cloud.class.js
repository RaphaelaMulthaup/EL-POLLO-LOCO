class Cloud extends MovableObject {
  y = 0;
  width = 720;
  height = 480;
  speed = 0.1;
  world;

  constructor(minX) {
    super();
    this.loadImg("img/5_background/layers/4_clouds/1.png");

    this.x = minX + Math.random() * 200;
    this.waitForWorld();
  }

  setWorld(world) {
    this.world = world;
  }

  waitForWorld() {
    const intervalWaitForWorld = setInterval(() => {
      if (this.world) {
        this.animate();
        clearInterval(intervalWaitForWorld);
      }
    }, 100);
  }

  animate() {
    setInterval(() => {
      this.world.directionClouds === "left"
        ? this.moveLeft()
        : this.moveRight();
    }, 1000 / 60);
  }
}
