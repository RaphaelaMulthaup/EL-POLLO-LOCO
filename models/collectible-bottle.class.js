class CollectibleBottle extends CollectibleObject {
    offset = {
        top: 13,
        left: 31,
        right: 31,
        bottom: 9
    };
    collect_bottle_sound;

    constructor(){
        super();
        this.chooseImg();
        this.x = 200 + Math.random() * 2240;
        this.y = 370;
        this.width = 70;
        this.height = 70;
    }

    chooseImg(){
        let coincidence = Math.random();
        let path;
        if (coincidence >= 0.5) {
            path = 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png';
        } else {
            path = 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png';
        }
        this.loadImg(path);
    }
}