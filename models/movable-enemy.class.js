class MovableEnemy extends MovableObject {

    world;
    character;
    isCollidingWithCharacter = false;

    constructor(){
        super();
    }

    setWorld(world){
        this.world = world;
        this.character = world.character;
    }

    animate(){
        console.log('animate läuft');
        
        // if (this.character) {
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

        // }
    }
}