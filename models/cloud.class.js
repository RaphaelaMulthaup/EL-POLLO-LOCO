class Cloud extends MovableObject{

    y = 0;
    width = 720;
    height = 480;
    speed = 0.1;
    world;

    constructor(minX){
        super();
        this.loadImg('img/5_background/layers/4_clouds/1.png');

        this.x = minX + Math.random() * 200;
        this.waitForWorld();
    }

    setWorld(world){
        this.world = world;
    }

    waitForWorld() {
        const interval = setInterval(() => {
            if (this.world) {  // Warten, bis die Welt gesetzt ist
                this.animate();
                clearInterval(interval);  // Stoppe die Überprüfung, wenn die Welt gesetzt ist
            }
        }, 100);
    }

    animate(){
        if (this.world.directionClouds == 'left') {
            setInterval(() => {
                this.moveLeft();
            }, 1000 / 60);
        } else {
            setInterval(() => {
                this.moveRight(); 
            }, 1000 / 60);
        }
    }
}