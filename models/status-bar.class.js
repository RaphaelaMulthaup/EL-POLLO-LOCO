class StatusBar extends DrawableObject {

    constructor(){
        super();
        this.x = 20;
        this.width = 220;
        this.height= 58;
    }

    setPersentage(persentage, statusBar){
        statusBar.persentage = persentage;
        let path = statusBar.IMAGES[this.resolveImageIndex(statusBar)];
        statusBar.img = statusBar.imageCache[path];
    }

    resolveImageIndex(statusBar){
        if (statusBar.persentage == 100) {
            return 5;
        } else if (statusBar.persentage > 80) {
            return 4;
        } else if (statusBar.persentage > 60) {
            return 3;
        } else if (statusBar.persentage > 40) {
            return 2;
        } else if (statusBar.persentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}