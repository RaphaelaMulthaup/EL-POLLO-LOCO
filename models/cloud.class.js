class Cloud extends MovableObject{

    y = 0;
    width = 720;
    height = 480;
    speed = 0.1;

    constructor(minX){
        super().loadImg('../img/5_background/layers/4_clouds/1.png');

        this.x = minX + Math.random() * 200;
        this.animate();
    }

    animate(){
        if (directionClouds == 'left') {
            this.moveLeft();
        } else {
            this.moveRight();
        }
    }
}