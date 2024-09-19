class Chicken extends MovableObject{

    height = 75;
    width = 75;
    y = 360;
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    speed = 0.15 + Math.random() * 0.5;
    world;
    character;
    walking_sound = new Audio('../audio/chicken.mp3');


    constructor(){
        super();
        this.loadImg('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 4314;

        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    setWorld(world){
        this.world = world;
        this.character = world.character;
    }

    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setTimeout(() => {
            this.walking_sound.volume = 0.3;
            if (this.x > this.character.x - 60 && this.x < this.character.x + 660) {
                this.walking_sound.play();
                }
            setInterval(() => {
                if (this.x > this.character.x - 60 && this.x < this.character.x + 660) {
                    this.walking_sound.play();
                }
            }, 10000);
        }, Math.random() * 10000);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

}