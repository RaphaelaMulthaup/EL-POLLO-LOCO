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

    // Diese Funktion später noch auseinander nehmen, wenn alle Collisionen gecoded sind. Eventuell auch etwas auseinandern nehmen und per Funktionsparameter individuallisiern.
    checkCollisions(){
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy, 40, 0)) {
                    if (!enemy.isCollidingWithCharacter) {                       
                        this.character.hit(enemy.constructor.name);
                        this.statusBarLife.setPercentageLifes(this.character.energy);
                        enemy.isCollidingWithCharacter = true;
                    } 
                } else {
                        enemy.isCollidingWithCharacter = false;
                    }
            });
            this.level.collectibleObjects.forEach(obj => {
                if (obj instanceof CollectibleBottle && this.character.isColliding(obj, 60, 0) && this.collectedBottles < 5) {
                    let index = this.level.collectibleObjects.indexOf(obj);
                    this.level.collectibleObjects.splice(index, 1);
                    this.collectedBottles += 1;
                    this.statusBarBottles.setPercentage(this.collectedBottles * 20);
                }
                if (obj instanceof CollectibleCoin && this.character.isColliding(obj, 50, 180) && this.collectedCoins < 5) {
                    let index = this.level.collectibleObjects.indexOf(obj);
                    this.level.collectibleObjects.splice(index, 1);
                    this.collectedCoins += 1;
                    this.statusBarCoins.setPercentage(this.collectedCoins * 20);
                    if (this.collectedCoins == 5) {
                        setTimeout(() => {
                            this.collectedCoins = 0;
                            this.statusBarCoins.setPercentage(this.collectedCoins * 20);
                            this.character.energy += 20;
                            if (this.character.energy > 100) {
                                this.character.energy = 100;    
                            }
                            this.statusBarLife.setPercentageLifes(this.character.energy);
                            for (let i = 0; i < 5; i++) {
                                setTimeout(() => {
                                    let coinAnimation = new CoinAnimation();
                                    this.coinsAnimation.push(coinAnimation);
                                }, 200 * i);
                            }
                        }, 500);
                    }
                }
            });
        }, 200);
    }

    checkThrowBottle(){
        setInterval(() => {
            let currentTime = new Date().getTime(); // Aktuelle Zeit in Millisekunden
        
            if (this.keyboard.D && currentTime - this.lastThrowTime >= 500 && this.collectedBottles != 0  && !this.introAnimationEndboss) {
                let throwableBottle = new ThrowableBottle(this.character);
                this.throwableBottles.push(throwableBottle);  // Füge die Flasche zur Liste hinzu
                this.lastThrowTime = currentTime; // Aktualisiere den letzten Wurfzeitpunkt
                this.collectedBottles -= 1;
                this.statusBarBottles.setPercentage(this.collectedBottles * 20);
            }
        }, 1000 / 60);
    }

    checkCollisionsBottlesEmemies(){
        setInterval(() => {
            this.throwableBottles.forEach((bottle) => {
                this.level.enemies.forEach((enemy) => {
                    if (bottle.isColliding(enemy, 40, 0)) {
                        bottle.collisionWithEnemy = true;
                        if (enemy.isAlive && (enemy instanceof Chick || enemy instanceof Chicken)) {
                            enemy.isAlive = false; // Setze den Gegner auf "tot"
                            setTimeout(() => {
                                let enemyIndex = this.level.enemies.indexOf(enemy);
                                this.level.enemies.splice(enemyIndex, 1);   
                            }, 1000);
                        }
                    }
                });
            });
        }, 1000 / 60);
    }

    removeThrowableBottle(bottle) {
        let index = this.throwableBottles.indexOf(bottle);
        this.throwableBottles.splice(index, 1);
    }
}