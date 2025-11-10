class Chicken extends MovableObject {
  height = 75;
  width = 75;
  y = 360;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGE_DYING = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
  offset = {
    top: 23,
    left: 8,
    right: 8,
    bottom: 19,
  };

  /**
   * This function allows access to 'MovableObject', loads images for different aninmations, sets the values ​​for x and speed and brings the chick to life.
   */
  constructor() {
    super();
    this.loadImg("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

    this.x = 200 + Math.random() * 4314;
    this.speed = 0.15 + Math.random() * 0.5;

    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGE_DYING);
    this.bringToLife();
  }
}
