class MovableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {};
    currentImage = 0;
    speed;
    speedY = 0;
    acceleration = 3;

    applyGravity(){
        setInterval(() => {
            if (this.isAboveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;  
            }
        }, 1000 / 25);
    }

    isAboveGround(){
        return this.y < 145;
    }

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
    
    playAnimation(images){
        let i = this.currentImage % images.length; //let i = 7 % (Modulu) 6; 1 Rest 1
        // i = 0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage ++;
    }
}