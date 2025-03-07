class StatusBarEndboss extends StatusBar {
  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

  /**
   * This function allows access to 'StatusBar', sets the position and the percent to hundred.
   */
  constructor() {
    super();
    this.y = 18;
    this.x = 470;
    this.setPercentage(100);
  }
}
