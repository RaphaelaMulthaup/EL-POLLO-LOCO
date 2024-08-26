class MovableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {};
    currentImage = 0;
    speed;

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }
    
    moveLeft(){
        setInterval(() => this.x += -1 * this.speed, 1000 / 60);
    }
    
    moveRight(){
        setInterval(() => this.x += this.speed, 1000 / 60);
    }
    
}