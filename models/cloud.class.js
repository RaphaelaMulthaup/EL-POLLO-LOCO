class Cloud extends MovableObject{

    y = 0;
    width = 720;
    height = 480;
    direction;

    constructor(){
        super().loadImg('../img/5_background/layers/4_clouds/1.png');

        this.x = - 100 + Math.random() * 200;
        this.animate();
    }

    animate(){
        this.direction = Math.random() < 0.5 ? -1 : 1;
        setInterval(() => this.x += this.direction * 0.1, 1000 / 60);
    }
}