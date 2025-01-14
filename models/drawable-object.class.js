class DrawableObject {
  x;
  y;
  img;
  height;
  width;
  imageCache = {};
  currentImage = 0;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * This function creates a new image and uses the path provided as the source.
   *
   * @param {string} path - The file path of the image.
   */
  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * For each path in the array this function creates a new image and uses the path as the source. The image is then saved in the image cache.
   *
   * @param {array} arr - An array of image pathes.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * This function draws an image on the specified artboard.
   *
   * @param {CanvasRenderingContext2D} ctx - The 2D drawing context of the canvas on which the image is drawn.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
