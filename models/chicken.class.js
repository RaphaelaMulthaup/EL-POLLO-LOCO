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

    constructor(){
        super().loadImg('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 500;

        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    setWorld(world){
        this.world = world;
        this.character = world.character;
    }

    animate(){
        this.moveLeft();

        if (this.x > this.character.x - 60 && this.x < this.character.x + 660) {
            // HIer den Ton einfügen
        }

        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; //let i = 7 % (Modulu) 6; 1 Rest 1
            // i = 0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5...
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage ++;
        }, 200);
    }

}