class CollectibleCoin extends CollectibleObject {
    constructor(){
        super();
        this.loadImg('../img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * 2200;
        this.setY();
        this.width = 100;
        this.height = 100;
    }

    setY(){
        let coincidence = Math.random();
        if (coincidence >= 0.5) {
            this.y = 110;
        } else {
            this.y = 160;
        }
    }
}