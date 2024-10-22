class Character extends MovableObject {

    height = 300;
    width = 150;
    y = 145;
    x = 40;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    world;
    speed = 5;
    otherDirection = false;
    walking_sound = new Audio('audio/running.mp3');
    dying_sound = new Audio('audio/dying.mp3');
    numberReductionsY = 0;
    offset = {
        top: 150,
        left: 35,
        right: 45,
        bottom: 15
    };

    constructor(){
        super();
        this.loadImg('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity(145);
        this.walking_sound.volume = 0.4;
        this.bringToLife();
        this.camera();
    }

    camera(){
        setInterval(() => {
            if (this.x < 2200) {
                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 60);
    }

    bringToLife(){
        this.animate();
        this.movement();
        this.playSound();
    }

    animate(){
        this.animateWalking();
        this.animateJumping();
        this.animateHurt();
        this.animateDying(); 
    }

    animateWalking(){
        setInterval(() => {
            if (!this.world.introAnimationEndboss && !this.isDead() && !this.isHurt() && !this.isAboveGround(145) && this.characterIsWalking()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    animateJumping(){
        setInterval(() => {
            if (this.isAboveGround(145) && !this.isDead()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }, 100);
    }

    animateHurt(){
        setInterval(() => {
            if (this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_HURT);
            } 
        }, 100);
    }

    animateDying(){
        let index = 0;
        let intervalCharacterAnimation = setInterval(() => {
            if (this.isDead()) {
                this.img = this.imageCache[this.IMAGES_DEAD[index]];
                index++;
                if (index >= 7) {
                    clearInterval(intervalCharacterAnimation);
                }
            } 
        }, 100); 
    }

    movement(){
        this.movementRight();
        this.movementLeft();
        this.movementJumping();
    }

    movementRight(){
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isHurt() && !this.world.introAnimationEndboss && !this.isDead()) {
                this.moveRight();
                this.otherDirection = false;
            }
        }, 1000 / 60);
    }

    movementLeft(){
        setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > 0 && !this.isHurt() && !this.world.introAnimationEndboss && !this.isDead()) {
                this.moveLeft();
                this.otherDirection = true;
            }
        }, 1000 / 60);
    }

    movementJumping(){
        setInterval(() => {
            if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAboveGround(145) && !this.isHurt() && !this.world.introAnimationEndboss && !this.isDead()) {
                this.jump(30);
            }
        }, 1000 / 60);
    }

    playSound(){
        this.playWalkingSound();
        let intervalCharacterMovement = setInterval(() => {
            if (this.isDead()) {
                setTimeout(() => {
                    if (!this.isAboveGround(145)) {
                    this.jump(10); 
                }  
                }, 200);

                this.dying_sound.play();
                setTimeout(() => {
                    this.dying_sound.pause();
                }, 1610);

                setTimeout(() => {
                    clearInterval(intervalCharacterMovement);
                }, 600);

            }
            
        }, 1000 / 60);
    }

    playWalkingSound(){
        setInterval(() => {
            if (this.characterIsWalking() && this.x > 0 && this.x < this.world.level.level_end_x && !this.isHurt() && !this.isDead() && !this.world.introAnimationEndboss && !this.isAboveGround(145)) {
                this.walking_sound.play();
            } else {
                this.walking_sound.pause();
            }
        }, 200);
    }

    characterIsWalking(){
        return world.keyboard.RIGHT || world.keyboard.LEFT;
    }
}