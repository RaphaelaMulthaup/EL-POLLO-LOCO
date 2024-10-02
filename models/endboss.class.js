class Endboss extends MovableObject {

    height = 400;
    width = 343;
    y = 65;
    x = 2700;
    IMAGES_WALKING = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        '../img/4_enemie_boss_chicken/3_attack/G13.png',
        '../img/4_enemie_boss_chicken/3_attack/G14.png',
        '../img/4_enemie_boss_chicken/3_attack/G15.png',
        '../img/4_enemie_boss_chicken/3_attack/G16.png',
        '../img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img/4_enemie_boss_chicken/3_attack/G18.png',
        '../img/4_enemie_boss_chicken/3_attack/G19.png',
        '../img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    world;
    character;
    speed = 3;
    threatening_sound = new Audio('../audio/threatening.mp3');
    endboss_alert_sound = new Audio('../audio/endboss.mp3');

    constructor(world){
        super();
        this.loadImg('../img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.world = world;
        this.character = world.character;
        this.animate();
    }

    setWorld(world){
        this.world = world;
        this.character = world.character;
    }

    animate(){
        // images animation and sound
        setInterval(() => {
            if (this.character.x > 2100 && this.x > 2450) {
                this.playAnimation(this.IMAGES_WALKING);
                this.threatening_sound.play();
                this.world.firstEncounterEndbossHappend = true;
            } else if (this.world.firstEncounterEndbossHappend) {
                if (this.character.x > 2150) {
                    this.playAnimation(this.IMAGES_ATTACK);
                } else {
                    this.playAnimation(this.IMAGES_ALERT);
                }
            }
        }, 200);

        // movement
        setInterval(() => {
            if (this.character.x > 2100 && this.x > 2450) {
                this.moveLeft();
                if (this.character.x > 2200) {
                    this.world.introAnimationEndboss = true;
                    setTimeout(() => {
                        this.world.introAnimationEndboss = false;
                    }, 1000);
                }
            }
        }, 1000 / 60);

        setInterval(() => {
            this.endboss_alert_sound.volume = 0.5;
            if (this.world.firstEncounterEndbossHappend){
                this.endboss_alert_sound.play();
                setTimeout(() => {
                    this.endboss_alert_sound.pause();
                }, 1500);
            }
        }, 2500 + Math.random() * 2500);
    }
}