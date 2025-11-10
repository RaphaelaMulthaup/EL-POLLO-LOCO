class BackgroundObject extends MovableObject {
  width = 720;

  /**
   *  This function allows access to 'MovableObject', loads an image and sets its height and position.
   * 
   * @param {string} imgPath - The file path to the image.
   * @param {number} height - The height of the object in pixels.
   * @param {number} x - The x-coordinate for the object's position.
   */
  constructor(imgPath, height, x) {
    super();
    this.loadImg(imgPath);
    this.height = height;
    this.y = 480 - height;
    this.x = x;
  }
}