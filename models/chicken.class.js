class Chicken extends MovableEnemy{

    height = 75;
    width = 75;
    y = 360;
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    walking_sound = new Audio('../audio/chicken.mp3');


    constructor(){
        super();
        this.loadImg('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 4314;
        this.speed = 0.15 + Math.random() * 0.5;

        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }
}