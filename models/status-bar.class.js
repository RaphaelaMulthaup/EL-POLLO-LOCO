class StatusBar extends DrawableObject {
  percentage;

  /**
   * This function allows access to 'DrawableObject', sets the x value and the size.
   */
  constructor() {
    super();
    this.x = 20;
    this.width = 220;
    this.height = 58;
  }

  /**
   * This function sets the percentage of a specific property and updates the displayed image based on the percentage. The images are dynamically loaded and selected from an image cache.
   *
   * @param {number} percentage - The percentage value to set.
   */
  setPercentage(percentage) {
    this.loadImages(this.IMAGES);
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * This function determines the image index corresponding to the current percentage. The index is selected based on defined thresholds for percentage ranges.
   *
   * @returns {number} - The index of the image in the `IMAGES` array that corresponds to the current percentage.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
