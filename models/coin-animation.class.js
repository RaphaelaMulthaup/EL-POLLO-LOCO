class CoinAnimation extends MovableObject {

  /**
   * This function allows access to 'MovableObject', loads an image, sets its position and size and plays the movement and sound.
   */
  constructor() {
    super();
    this.loadImg("img/8_coin/coin_1.png");
    this.x = 175;
    this.y = 44;
    this.width = 100;
    this.height = 100;
    this.moveUpwarts();
    playSound("flyingCoinSound");
  }

  /**
   * This function decreases y until it is less than or equal to -1. After a small delay the coin will be deleted. In addition, the function will then no longer be executed.
   */
  moveUpwarts() {
    let flyingCoin = setInterval(() => {
      this.y -= 2;
      if (this.y <= -1) {
        clearInterval(flyingCoin);
        setTimeout(() => {
          let index = world.coinsAnimation.indexOf(this);
          world.coinsAnimation.splice(index, 1);
        }, 200);
      }
    }, 1000 / 60);
  }
}
