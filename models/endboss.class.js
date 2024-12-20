class Endboss extends MovableObject {

    height = 400;
    width = 343;
    y = 65;
    x = 2700;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_DYING = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    world;
    character;
    speed = 3;
    energy = 5;
    isHurt = false;
    initialHit = false;
    randomAttackInterval;
    isAttacking = false;
    endbossHurtSoundIsPlaying = false;
    dyingSoundIsPlaying = false;
    offset = {
        top: 81,
        left: 73,
        right: 67,
        bottom: 112
    };

    constructor(world){
        super();
        this.loadImg('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_HURT);
        this.world = world;
        this.character = world.character;
        this.displayStatusBarEndboss();
        this.bringToLife();
        this.checkFirstEncounter();
        // this.checkPosition();
    }

    setWorld(world){
        this.world = world;
        this.character = world.character;
    }

    bringToLife(){
        this.animate();
        this.endbossMovesLeft();
        this.playSound();   
    }

    animate(){
        this.animateWalking();
        this.animateAlert();
        this.animateAttacking();
        this.animateHurt();
        this.animateDying();
    }

    animateWalking(){
        //as soon as the character has reached the back, but the final boss has not yet reached his position (only happens once)
        setInterval(() => {
            if (this.character.x > 2100 && this.x > 2450) {
                this.playAnimation(this.IMAGES_WALKING); 
            }
            if (!this.isAttacking && !this.isDead() && this.initialHit && !this.isHurt) {
                this.playAnimation(this.IMAGES_WALKING);
            }
  
        }, 200);
    }

    animateAlert(){
        setInterval(() => {
            if (!this.initialHit && this.world.firstEncounterEndbossHappend && this.character.x <= 2150) {
                this.playAnimation(this.IMAGES_ALERT); 
            }    
        }, 200);
    }

    animateAttacking(){
        setInterval(() => {
            if (!this.initialHit && this.world.firstEncounterEndbossHappend && this.character.x > 2150) {
                this.playAnimation(this.IMAGES_ATTACK);
            }
            if (this.isAttacking && !this.isDead()) {
                this.playAnimation(this.IMAGES_ATTACK);
            }
        }, 200);
    }

    animateHurt(){
        setInterval(() => {
            if (this.isHurt) {
                this.initialHit = true;
                clearInterval(this.randomAttackInterval);
                this.playAnimation(this.IMAGES_HURT);
                this.randomAttacks();
            }    
        }, 200);
    }

    animateDying(){
        setInterval(() => {
            if (this.isDead()) {
                this.playDyingAnimation(this.IMAGES_DYING);
            }    
        }, 200);
    }

    endbossMovesLeft(){
        setInterval(() => {
            //as soon as the character has reached the back, but the final boss has not yet reached his position (only happens once)
            if (this.character.x > 2100 && this.x > 2450) {
                this.moveLeft();
            }        
        }, 1000 / 60);
        setInterval(() => {  
            if (!this.isAttacking && !this.isDead() && this.initialHit && !this.isHurt) {
                this.speed = 5;
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    playSound(){
        setStoppableInterval((id) => this.playThreateningSound(id), 200);
        setStoppableInterval((id) => this.playAlertSound(id), 200);
        this.playEndbossBackgroundmusic();
        setStoppableInterval((id) => this.playDyingSound(id), 200);
        setStoppableInterval(() => this.playHurtSound(), 200);
    }

    playThreateningSound(id){
        //as soon as the character has reached the back, but the final boss has not yet reached his position (only happens once)
        if (this.character.x > 2100 && this.x > 2450) {
            clearInterval(id);
            playSound('threateningSound'); 
            pauseSound('backgroundMusicGame');          
        }            
    }

    playAlertSound(id){
        if (!this.initialHit && this.world.firstEncounterEndbossHappend) {
            this.playRandomAlertSound();
            clearInterval(id);
        } 
    }

    playRandomAlertSound(){
        if (!this.initialHit && this.world.firstEncounterEndbossHappend) {
            playSound('endbossAlertSound');
            setTimeout(() => {
                pauseSound('endbossAlertSound');
            }, 1500);
        }
        setTimeout(() => {
            this.playRandomAlertSound();
        }, 2500 + Math.random() * 2500);
    }

    playEndbossBackgroundmusic(){
        let intervalEndbossBackgroundMusic = setInterval(() => {
            if (this.initialHit && !this.threateningSound && !this.isDead()) {
                clearInterval(intervalEndbossBackgroundMusic);
                playSound('endbossBackgroundMusic');
            }
        }, 200);
        setInterval(() => {
            if (this.isDead() || gameIsLost()) {
                sounds.endbossBackgroundMusic.currentVolume = 0;
                setVolume('endbossBackgroundMusic');
            }
        }, 1000);
    }

    playHurtSound(){
        if (this.isHurt && !this.endbossHurtSoundIsPlaying && this.energy >= 0) {
            this.endbossHurtSoundIsPlaying = true;
            playSound('endbossHurtSound');
            setTimeout(() => {
                pauseSound('endbossHurtSound');
            }, 1200);
            setTimeout(() => {
                this.endbossHurtSoundIsPlaying = false;
            }, 2000);
        }
    }

    playDyingSound(id){
        if (this.isDead() && !this.dyingSoundIsPlaying) {
            this.dyingSoundIsPlaying = true;
            playSound('endbossDyingSound');
            setTimeout(() => {
                clearInterval(id);
            }, 5000);
        }
    }

    checkFirstEncounter(){
        setInterval(() => {    
            if (this.x <= 2450) {
                this.world.firstEncounterEndbossHappend = true;   
            }
        }, 200);
        let intervalCheckIntroAnimationEndboss = setInterval(() => {
            if (this.x < 2600) {
                world.introAnimationEndboss = true;
                setTimeout(() => {
                    world.introAnimationEndboss = false;
                    clearInterval(intervalCheckIntroAnimationEndboss);
                }, 1000);
            }
        }, 200);
    }

    displayStatusBarEndboss(){
        let intervalDisplayStatusBarEnndboss = setInterval(() => {
            if (this.character.x > 2100 && this.x > 2450) {
                let statusBarEndboss = new StatusBarEndboss();
                this.world.statusBarEndboss.push(statusBarEndboss);
                clearInterval(intervalDisplayStatusBarEnndboss);
            }
        }, 200);
    }

    isHit(bottle){
        if (!this.isHurt) {
            this.isHurt = true;        
            bottle.collisionWithEnemy = true;
            this.energy -= 1;
            this.world.statusBarEndboss[0].setPercentage(this.energy * 20); 
            setTimeout(() => {
                this.isHurt = false;        
            }, 2000);
        }
    }

    playDyingAnimation(images){
        for (let index = 0; index < 3; index++) {
            let path = images[index];
            this.img = this.imageCache[path];
            this.currentImage ++;
        }
    }

    randomAttacks(){
        this.randomAttackInterval = setInterval(() => {
            this.isAttacking = true;
            setTimeout(() => {
                this.isAttacking = false;
            }, 2500);
        }, 3500 + Math.random() * 1500);
    }

    // checkPosition(){
    //     setInterval(() => {
    //         if (this.x < -1062) {
    //             displayEndscreen();
    //         }
    //     }, 200);
    // }
}