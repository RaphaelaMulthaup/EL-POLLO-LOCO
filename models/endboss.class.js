class Endboss extends MovableObject {

    height = 400;
    width = 343;
    y = 65;
    x = 2600;
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
    world;
    character;

    constructor(world){
        super();
        this.loadImg('../img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.world = world;
        this.character = world.character;
        this.animate();
    }

    setWorld(world){
        this.world = world;
        this.character = world.character;
    }

    animate(){
        if (this.character.x > 2400) {
            setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING);
            }, 200);
        }

    }
}