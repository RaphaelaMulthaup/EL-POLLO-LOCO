class StatusBarLife extends StatusBar {

    IMAGES = [
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    constructor(){
        super();
        this.y = 10;
        this.setPercentageLifes(100);
    }

    setPercentageLifes(percentage){
        this.loadImages(this.IMAGES);
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndexLifes()];
        this.img = this.imageCache[path];
    }

    resolveImageIndexLifes(){
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