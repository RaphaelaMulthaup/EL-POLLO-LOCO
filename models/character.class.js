class Character extends MovableObject {

    height = 300;
    width = 150;
    y = 145;
    x = 40;
    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];

    constructor(){
        super().loadImg('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate(){
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; //let i = 7 % (Modulu) 6; 1 Rest 1
            // i = 0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5...
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage ++;
        }, 200);
    }

    jump(){

    }
}