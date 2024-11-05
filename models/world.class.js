class World {
    character = new Character();
    endboss = new Endboss(this);
    statusBarLife = new StatusBarLife();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    statusBarEndboss = [];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    directionClouds = Math.random() < 0.5 ? 'left' : 'right';
    throwableBottles = [];
    collectedBottles = 0;
    collectedCoins = 0;
    lastThrowTime = 0;
    coinsAnimation = [];
    introAnimationEndboss = false;
    firstEncounterEndbossHappend = false;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level.enemies.push(this.endboss);  
        this.setWorld();
        this.draw();
        this.checkEvents();
    }

    setWorld(){
        this.character.world = this;
        this.level.clouds.forEach(cloud => cloud.setWorld(this));
        this.level.enemies.forEach(enemy => enemy.setWorld(this));
    }

    draw() {
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        // -------- space for fixed objects --------
        this.addToMap(this.statusBarLife);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addObjectsToMap(this.statusBarEndboss);
        this.addObjectsToMap(this.coinsAnimation);
        this.ctx.translate(this.camera_x, 0);


        this.addToMap(this.character);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableBottles);

        this.addObjectsToMap(this.level.collectibleObjects);

        this.ctx.translate(-this.camera_x, 0);

        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(obj){
        if (obj.otherDirection) {
            obj.flipImg(this.ctx);
        }
        obj.draw(this.ctx);
        // obj.drawFrame(this.ctx);

        if (obj.otherDirection) {
            obj.flipImgBack(this.ctx);
        }
    }

    checkEvents(){
        this.checkCollisions();
        this.checkThrowBottle();
        this.checkCollisionsBottlesEmemies();
    }

    checkCollisions(){
        this.checkCollisionWithEnemys();
        this.checkCollisionWithCollectibleObject();
    }

    checkCollisionWithEnemys(){
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if ((enemy instanceof Chicken || enemy instanceof Chick) && this.characterIsLandingOn(enemy) && !enemy.isCollidingWithCharacter) {
                    enemy.dying();
                } else if (this.character.isColliding(enemy) && enemy.isAlive && !enemy.isCollidingWithCharacter) {
                    this.lateralCollision(enemy);
                }
            });
        }, 50);
    }

    characterIsLandingOn(enemy){
        return this.character.isColliding(enemy) &&
            enemy.isBelowFromCharacter &&
            this.character.speedY < 0
    }

    lateralCollision(enemy){
        this.character.hit(enemy.constructor.name);
        this.statusBarLife.setPercentageLifes(this.character.energy);
        enemy.isCollidingWithCharacter = true;
        setTimeout(() => {
            enemy.isCollidingWithCharacter = false;
        }, 1500);
    }

    checkCollisionWithCollectibleObject(){
        setInterval(() => {
            this.level.collectibleObjects.forEach((obj, indexOfObj) => {
                if (obj instanceof CollectibleBottle && this.character.isColliding(obj) && this.collectedBottles < 5) {
                    this.collectBottle(indexOfObj);
                }
                if (obj instanceof CollectibleCoin && this.character.isColliding(obj) && this.collectedCoins < 5) {
                    this.collectCoin(indexOfObj);
                    if (this.collectedCoins == 5) {
                        this.turnCoinsIntoEnergy();
                    }
                }
            });
        }, 200);
    }

    collectBottle(indexOfObj){
        this.playCollectBottleSound();
        this.level.collectibleObjects.splice(indexOfObj, 1);
        this.collectedBottles += 1;
        this.statusBarBottles.setPercentage(this.collectedBottles * 20);
    }

    playCollectBottleSound(){
        playSound('collectBottleSound');
    }

    collectCoin(indexOfObj){
        playSound('collectCoinSound');
        this.level.collectibleObjects.splice(indexOfObj, 1);
        this.collectedCoins += 1;
        this.statusBarCoins.setPercentage(this.collectedCoins * 20);
    }

    turnCoinsIntoEnergy(){
        setTimeout(() => {
            this.setCollectedCoinsToZero();
            this.increaseEnergy();
            this.animateFyingCoins();  
        }, 500);
    }

    setCollectedCoinsToZero(){
        this.collectedCoins = 0;
        this.statusBarCoins.setPercentage(this.collectedCoins * 20);
    }

    increaseEnergy(){
        this.character.energy += 20;
        if (this.character.energy > 100) {
            this.character.energy = 100;    
        }
        this.statusBarLife.setPercentageLifes(this.character.energy);
    }

    animateFyingCoins(){
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                let coinAnimation = new CoinAnimation();
                this.coinsAnimation.push(coinAnimation);
            }, 200 * i);
        }
    }

    checkThrowBottle(){
        setInterval(() => {
            let currentTime = new Date().getTime();
        
            if (this.keyboard.D && currentTime - this.lastThrowTime >= 500 && this.collectedBottles != 0  && !this.introAnimationEndboss && !this.character.isHurt() && !this.character.isDead()) {
                let throwableBottle = new ThrowableBottle(this.character);
                this.throwableBottles.push(throwableBottle);
                this.playThrowingBottleSound(throwableBottle);
                this.lastThrowTime = currentTime;
                this.collectedBottles -= 1;
                this.statusBarBottles.setPercentage(this.collectedBottles * 20);
            }
        }, 1000 / 60);
    }

    playThrowingBottleSound(throwableBottle){
        throwableBottle.throwing_bottle_sound.currentTime = 0.053;
        throwableBottle.throwing_bottle_sound.play();
    }

    checkCollisionsBottlesEmemies(){
        setInterval(() => {
            this.throwableBottles.forEach((bottle) => {
                this.level.enemies.forEach((enemy) => {
                    if (enemy instanceof Chicken && bottle.isColliding(enemy)) {
                        enemy.deadFromCollision(bottle);
                    } else if (enemy instanceof Chick && bottle.isColliding(enemy)) {
                        enemy.deadFromCollision(bottle);
                    } else if (enemy instanceof Endboss && bottle.isColliding(enemy)) {
                        enemy.isHit(bottle);
                    } 
                });
            });
        }, 1000 / 60);
    }

}