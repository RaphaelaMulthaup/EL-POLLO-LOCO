class MovableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {};
    currentImage = 0;

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

    moveRight() {
        console.log('moving right');
        
    }

    moveLeft(){

    }
}