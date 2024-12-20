class MovableObject extends DrawableObject{
    speed;
    speedY = 0;
    acceleration = 3;
    energy = 100;
    lastHit = 0;
    world;
    character;
    isCollidingWithCharacter = false;
    isAlive = true;
    isBelowFromCharacter = false;

    constructor(){
        super();
        this.isBelowFromCharacterStatusBoolean();
    }

    setWorld(world){
        this.world = world;
        this.character = world.character;
    }

    bringToLife(){
        this.animate();
        this.movement();
        this.playSound();  
    }

    animate(){
        setInterval(() => {
            if (this.isAlive) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
        setInterval(() => {
            if (!this.isAlive) {
                this.playAnimation(this.IMAGE_DYING);
            }
        }, 100);
    }

    movement(){
        setInterval(() => {
            if (this.isAlive) {
                this.moveLeft();
            }
        }, 1000 / 60); 
    }

    playSound(){
        setStoppableInterval(() => this.playWalkingSound(), 5000);
        setStoppableInterval((id) => this.playDyingSound(id), 1000 / 60);
    }

    playWalkingSound(){
        if (this.isAlive && this.x > this.character.x - 60 && this.x < this.character.x + 660) {
            if (this instanceof Chick) {
                playSound('chickWalkingSound');
            }
            if (this instanceof Chicken){
                playSound('chickenWalkingSound');
            }
        }
    }

    playDyingSound(id){
        if (!this.isAlive) {
            clearInterval(id);
            if (this instanceof Chick) {
                playSound('chickDyingingSound');
                setTimeout(() => {
                    pauseSound('chickenDyingingSound');
                }, 500);
            }
            if (this instanceof Chicken) {
                playSound('chickenDyingingSound');
                setTimeout(() => {
                    pauseSound('chickenDyingingSound');
                }, 800);
            }
        }
    }

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

    isColliding (obj) {
        return  (this.x + this.width - this.offset.right) >= (obj.x + obj.offset.left) &&
            (this.x + this.offset.left) <= (obj.x + obj.width - obj.offset.right) &&
            (this.y + this.height - this.offset.bottom) >=(obj.y + obj.offset.top)  &&
            (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom)
    }

    hit(enemyTyp){
        if (enemyTyp == 'Chicken' || enemyTyp == 'Endboss') {
            this.energy -= 20;
        }
        if (enemyTyp == 'Chick') {
            this.energy -= 10;
        }
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();        
        }
    }

    isHurt(){
        return this.lastHit + 1000 >= new Date().getTime();  
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

    jump(speedY){
        this.speedY = speedY;
    }

    deadFromCollision(bottle){
        bottle.collisionWithEnemy = true;
        this.dying();
    }

    dying(){
        if (this.isAlive) {
            this.isAlive = false;
            setTimeout(() => {
                let enemyIndex = this.world.level.enemies.indexOf(this);
                this.world.level.enemies.splice(enemyIndex, 1);   
            }, 1000);
        }
    }

    isBelowFromCharacterStatusBoolean(){
        setInterval(() => {
        if (this.world && (this instanceof Chicken || this instanceof Chick) && this.isBelowFromCharacterFunction()) {
            this.isBelowFromCharacter = true;           
        }
        if (this.isBelowFromCharacter && !this.character.isAboveGround(145)) {
            this.isBelowFromCharacter = false;
        }   
        }, 200);
    }

    isBelowFromCharacterFunction(){
        return (this.y + 20) > (this.world.character.y + this.world.character.height - 13) &&
            (this.x + this.width) > (this.character.x + 20) &&
            (this.x) < (this.character.x + this.character.width - 30)
    }

}