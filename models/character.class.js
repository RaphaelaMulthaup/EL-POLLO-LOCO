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
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    world;
    speed = 5;
    otherDirection = false;
    yawning_sound = new Audio('audio/yawn_1605ms.mp3');
    numberReductionsY = 0;
    offset = {
        top: 150,
        left: 37,
        right: 56,
        bottom: 15
    };
    idleTime = 0;
    isYawning = false;
    characterHurtSoundIsPlaying = false;
    characterJumpingSoundIsPlaying = false;

    constructor(){
        super();
        this.loadImg('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity(145);
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
        this.animateIdle();
        this.animateLongIdle();
        this.animateWalking();
        this.animateJumping();
        this.animateHurt();
        this.animateDying(); 
    }

    animateIdle(){
        setInterval(() => {
            if (!this.isDead() && !this.isHurt() && !this.isAboveGround(145) && !this.characterIsWalking()) {
                if (this.idleTime < 15000) {
                    this.playAnimation(this.IMAGES_IDLE); 
                }
                this.idleTime += 200;
            } else {
                this.idleTime = 0;
            }
        }, 200);
    }

    animateLongIdle(){
        setInterval(() => {
            if (this.idleTime >= 15000) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
            }
        }, 200);
    }

    animateWalking(){
        setInterval(() => {
            if (!this.world.introAnimationEndboss && !this.isDead() && !this.isHurt() && !this.isAboveGround(145) && this.characterIsWalking()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    animateJumping(){
        let index;
        setInterval(() => {
            if (!this.isAboveGround(145)) {
                index = 0;   
            }
        }, 100);
        setInterval(() => {
            if (this.isAboveGround(145) && !this.isDead()) {
                this.img = this.imageCache[this.IMAGES_JUMPING[index]];
                index ++;
                if (index > 8) {
                    index = 0;
                }
            }
        }, 90);
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
        let intervalJumpingWhileDying = setInterval(() => {
            if (this.isDead() && !this.isAboveGround(145)) {
                setTimeout(() => {
                    this.jump(10);
                    clearInterval(intervalJumpingWhileDying);
                }, 200);
            }   
        }, 1000 / 60);
    }

    playSound(){
        this.playYawningSound();
        this.playWalkingSound();
        this.playJumpingSound();
        this.playHurtSound();
        this.playDyingSound();
    }

    playYawningSound(){
        setInterval(() => {
            if (this.idleTime >= 15000 && !this.isYawning) {
                this.isYawning = true;
                this.yawningSoundActive();
            }
            if (this.idleTime < 1500) {
                this.isYawning = false;
            }
        }, 200);;
    }

    yawningSoundActive(){
        if (this.isYawning) {
            this.yawning_sound.volume = 0.2;
            this.yawning_sound.play();
            setTimeout(() => {
                this.yawning_sound.pause();
            }, 1605);
            setTimeout(() => {
                this.yawningSoundActive();
            }, 4000);
        }
    }

    playWalkingSound(){
        setInterval(() => {
            if (this.characterIsWalking() && this.x > 0 && this.x < this.world.level.level_end_x && !this.isHurt() && !this.isDead() && !this.world.introAnimationEndboss && !this.isAboveGround(145)) {
                playSound('characterWalkingSound');
            } else {
                pauseSound('characterWalkingSound');
            }
        }, 200);
    }

    playJumpingSound(){
        setInterval(() => {
            if (this.speedY > 0 && !this.isDead() && !this.characterJumpingSoundIsPlaying) {
                this.characterJumpingSoundIsPlaying = true;
                playSound('characterJumpingSound');
            }
            if (this.speedY <= 0) {
                pauseSound('characterJumpingSound');
                this.characterJumpingSoundIsPlaying = false;
            }
        }, 200);
    }

    playHurtSound(){
        setInterval(() => {
            if (this.isHurt() && !this.isDead() && !this.characterHurtSoundIsPlaying) {
                this.characterHurtSoundIsPlaying = true;
                playSound('characterHurtSound');
                setTimeout(() => {
                    this.characterHurtSoundIsPlaying = false;
                }, 1000);
            }
        }, 200);
    }

    playDyingSound(){
        let intervalDyingSound = setInterval(() => {
            if (this.isDead()) {
                clearInterval(intervalDyingSound);
                playSound('characterDyingSound');
                setTimeout(() => {
                    pauseSound('characterDyingSound');
                }, 1610);
            }
        }, 1000 / 60);
    }

    characterIsWalking(){
        return world.keyboard.RIGHT || world.keyboard.LEFT;
    }
}