class CoinAnimation extends MovableObject {

    constructor(){
        super();
        this.loadImg('img/8_coin/coin_1.png');
        this.x = 175;
        this.y = 44;
        this.width = 100;
        this.height = 100;
        this.moveUpwarts();
        playSound('flyingCoinSound');
    }

    moveUpwarts(){
        let flyingCoin = setInterval(() => {
            this.y -= 2;
            if (this.y <= -1) {
                clearInterval(flyingCoin);
                setTimeout(() => {
                    let index = world.coinsAnimation.indexOf(this);
                    world.coinsAnimation.splice(index, 1);
                }, 200);
            }
        }, 1000 / 60);
    }
}