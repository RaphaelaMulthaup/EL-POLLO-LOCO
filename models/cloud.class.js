class Cloud extends MovableObject{

    y = 0;
    width = 720;
    height = 480;
    speed = 0.1;

    constructor(){
        super().loadImg('../img/5_background/layers/4_clouds/1.png');

        this.x = - 100 + Math.random() * 200;
        this.animate();
    }

    animate(){
        let direction = Math.random() < 0.5 ? 'left' : 'right';
        if (direction == 'left') {
            this.moveLeft();
        } else {
            this.moveRight();
        }
    }
}