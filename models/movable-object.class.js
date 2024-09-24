class MovableObject extends DrawableObject{
    speed;
    speedY = 0;
    acceleration = 3;
    energy = 100;
    lastHit = 0;

    applyGravity(imgTouchesGround){
        setInterval(() => {
            if (this.isAboveGround(imgTouchesGround) || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;                  
            }
        }, 1000 / 25);
    }

    isAboveGround(imgTouchesGround){
        return this.y < imgTouchesGround;
    }

    isColliding (obj, overlap) {
        return  (this.x + this.width - overlap) >= obj.x &&
            (this.x + overlap) <= (obj.x + obj.width) &&
            (this.y + this.height) >= obj.y &&
            this.y <= (obj.y + obj.height)
    }

    hit(){
        this.energy -= 5;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){
        return this.lastHit + 1000 >= new Date().getTime();  //ist in der letztn Sekunde getroffen worden
    } 

    isDead(){
        return this.energy == 0;
    }

    flipImg(ctx){
        ctx.save();
        ctx.translate(this.width, 0);
        ctx.scale(-1, 1);
        this.x = this.x * -1;
    }

    flipImgBack(ctx){
        this.x = this.x * -1;
        ctx.restore();
    }
    
    moveLeft(){
        this.x -= this.speed;
    }
    
    moveRight(){
        this.x += this.speed;
    }
    
    playAnimation(images){
        let i = this.currentImage % images.length; //let i = 7 % (Modulu) 6; 1 Rest 1
        // i = 0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage ++;
    }

    jump(){
        this.speedY = 30;
    }

    characterIsWalking(){
        return world.keyboard.RIGHT || world.keyboard.LEFT;
    }
}