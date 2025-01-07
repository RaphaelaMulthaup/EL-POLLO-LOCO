class StatusBar extends DrawableObject {
  percentage;

  constructor() {
    super();
    this.x = 20;
    this.width = 220;
    this.height = 58;
  }

  setPercentage(percentage) {
    this.loadImages(this.IMAGES);
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    return this.percentage === 100
      ? 5
      : Math.max(Math.floor((this.percentage - 1) / 20), 0);
  }
}
