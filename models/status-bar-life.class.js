class StatusBarLife extends StatusBar {
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  constructor() {
    super();
    this.y = 10;
    this.setPercentageLifes(100);
  }

  setPercentageLifes(percentage) {
    this.loadImages(this.IMAGES);
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndexLifes()];
    this.img = this.imageCache[path];
  }

  resolveImageIndexLifes() {
    return Math.max(Math.floor(this.percentage / 20), 0);
  }
}
