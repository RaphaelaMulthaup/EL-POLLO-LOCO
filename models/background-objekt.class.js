class BackgroundObjekt extends MovableObject {
    width = 720;
    x = 0;

    constructor(imgPath, height){
        super().loadImg(imgPath);
        this.height = height;
        this.y = 480 - height;
    }

}