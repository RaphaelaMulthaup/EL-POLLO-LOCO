class CollectableBottle extends CollectableObject {
  offset = {
    top: 13,
    left: 31,
    right: 31,
    bottom: 9,
  };

  /**
   * This function allows access to 'CollectableObject', sets an image, its position and size.
   */
  constructor() {
    super();
    this.chooseImg();
    this.x = 200 + Math.random() * 2240;
    this.y = 370;
    this.width = 70;
    this.height = 70;
  }

  /**
   * This function randomly selects an image and loads it.
   */
  chooseImg() {
    let coincidence = Math.random();
    let path;
    path =
      coincidence >= 0.5
        ? "img/6_salsa_bottle/1_salsa_bottle_on_ground.png"
        : "img/6_salsa_bottle/2_salsa_bottle_on_ground.png";
    this.loadImg(path);
  }
}
