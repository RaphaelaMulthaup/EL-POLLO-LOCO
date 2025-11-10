class StatusBarLife extends StatusBar {
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  /**
   * This function allows access to 'StatusBar', sets the y value and the percent to hundred.
   */
  constructor() {
    super();
    this.y = 10;
    this.setPercentageLifes(100);
  }

  /**
   * This function sets the percentage of remaining life energy and updates the image accordingly. The images are loaded from an image cache based on the current life percentage.
   *
   * @param {number} percentage - The percentage of remaining life energy.
   */
  setPercentageLifes(percentage) {
    this.loadImages(this.IMAGES);
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndexLifes()];
    this.img = this.imageCache[path];
  }

  /**
   * This function calculates the image index corresponding to the current percentage of life energy. The index is determined based on thresholds for different life levels.
   *
   * @returns {number} - The index of the image in the `IMAGES` array that represents the current life energy.
   */
  resolveImageIndexLifes() {
    if (this.percentage > 80) {
      return 5;
    } else if (this.percentage > 60) {
      return 4;
    } else if (this.percentage > 40) {
      return 3;
    } else if (this.percentage > 20) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }
}
