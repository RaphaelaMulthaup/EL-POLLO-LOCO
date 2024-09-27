class StatusBar extends DrawableObject {
    percentage;

    constructor(){
        super();
        this.x = 20;
        this.width = 220;
        this.height= 58;
    }

    setPercentage(percentage){
        this.loadImages(this.IMAGES);
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
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