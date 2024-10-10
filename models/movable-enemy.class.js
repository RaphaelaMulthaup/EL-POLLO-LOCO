class MovableEnemy extends MovableObject {

    world;
    character;
    isCollidingWithCharacter = false;
    isAlive = true;

    constructor(){
        super();
    }

    setWorld(world){
        this.world = world;
        this.character = world.character;
    }

    animate(){

        // movement
        setInterval(() => {
            if (this.isAlive) {
                this.moveLeft();
            }
        }, 1000 / 60); 
        
        // sound
        setInterval(() => {
            if (this.isAlive) {
                this.walking_sound.volume = 0.3;
                if (this.x > this.character.x - 60 && this.x < this.character.x + 660) {
                    this.walking_sound.play();
                }
            } else {
                this.dying_sound.play();
            }
        }, 5000);

        // img animation
        setInterval(() => {
            if (this.isAlive) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGE_DYING);
            }
        }, 200);
    }
}
