class Chick extends MovableEnemy {

    height = 50;
    width = 50;
    y = 380;
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    walking_sound = new Audio('../audio/chick.mp3');

    constructor(){
        super();
        console.log('Chick consructor wird ausgeführt');
        
        this.loadImg('../img/3_enemies_chicken/chicken_small/1_walk/1_w.png');

        this.x = 720 + Math.random() * 4314;
        this.speed = 1 + Math.random();

        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }
}