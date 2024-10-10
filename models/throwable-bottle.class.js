class ThrowableBottle extends MovableObject{

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    speed = 5;
    otherDirection;
    collisionWithEnemy = false;


    constructor(character){
        super();
        this.otherDirection = character.otherDirection;
        this.x = character.x + 40;
        this.y = character.y + 140;
        this.height = 70;
        this.width = 70;
        this.speedY = 30;
        this.loadImg(this.IMAGES_ROTATION[0]);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.applyGravity(365);
        this.animate();    
    }

    animate(){
        let rotation = setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);

            if (!this.isAboveGround(365) || this.collisionWithEnemy) {
                clearInterval(rotation);
                clearInterval(movement);
                this.playSplashAnimation();
            }
        }, 100);

        let movement = setInterval(() => {
            if (this.characterIsWalking()) {
                this.speed = 7;
            }
            if (this.otherDirection) {
                this.moveLeft();
            } else {
                this.moveRight()
            }
        }, 1000 / 60);
    }

    playSplashAnimation() {
        let index = 0;
    
        let splashInterval = setInterval(() => {
            if (index < this.IMAGES_SPLASH.length) {
                this.img = this.imageCache[this.IMAGES_SPLASH[index]];
                index++;
            } else {
                clearInterval(splashInterval);
                setTimeout(() => {
                    world.removeThrowableBottle(this);
                }, 50);
            }
        }, 35);
    }
}