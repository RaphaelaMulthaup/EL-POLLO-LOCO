class Chick extends MovableObject {

    height = 50;
    width = 50;
    y = 380;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGE_DYING = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    offset = {
        top: 12,
        left: 12,
        right: 18,
        bottom: 12
    };

    constructor(){
        super();
        
        this.loadImg('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');

        this.x = 720 + Math.random() * 4314;
        this.speed = 1 + Math.random();

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DYING);
        this.bringToLife();
    }
}