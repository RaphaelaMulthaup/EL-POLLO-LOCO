class CollectibleCoin extends CollectibleObject {
  offset = {
    top: 38,
    left: 38,
    right: 38,
    bottom: 0,
  };
  
  /**
   * This function allows access to 'CollectibleObject', loads an image, sets its position and size.
   */
  constructor() {
    super();
    this.loadImg("img/8_coin/coin_1.png");
    this.x = 200 + Math.random() * 2200;
    this.setY();
    this.width = 100;
    this.height = 100;
  }

  /**
   * This function randomly sets one of two values ​​for y.
   */
  setY() {
    let coincidence = Math.random();
    this.y = coincidence >= 0.5 ? 110 : 160;
  }
}
