class StatusBar extends DrawableObject {
    persentage;

    constructor(){
        super();
        this.x = 20;
        this.width = 220;
        this.height= 58;
    }

    setPersentage(persentage){
        this.loadImages(this.IMAGES);
        this.persentage = persentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
        if (this.persentage == 100) {
            return 5;
        } else if (this.persentage >= 80) {
            return 4;
        } else if (this.persentage >= 60) {
            return 3;
        } else if (this.persentage >= 40) {
            return 2;
        } else if (this.persentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}