class BackgroundObject extends MovableObject {
    width = 720;

    constructor(imgPath, height, x){
        super();
        this.loadImg(imgPath);
        this.height = height;
        this.y = 480 - height;
        this.x = x;
    }

}