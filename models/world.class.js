class World {
    character = new Character();
    statusBarLife = new StatusBarLife();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    directionClouds = Math.random() < 0.5 ? 'left' : 'right';
    throwableBottles = [];
    collectedBottles = 0;
    lastThrowTime = 0;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
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
        obj.drawFrame(this.ctx);

        if (obj.otherDirection) {
            obj.flipImgBack(this.ctx);
        }
    }

    checkEvents(){
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowBottle();
        }, 200);
    }

    checkCollisions(){
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy, 40)) {
                this.character.hit();
                this.statusBarLife.setPersentage(this.character.energy);
            }
        });
        if (this.collectedBottles < 5) {
            this.level.collectibleObjects.forEach(obj => {
                if (this.character.isColliding(obj, 60)) {
                    let index = this.level.collectibleObjects.indexOf(obj);
                    this.level.collectibleObjects.splice(index, 1);
                    this.collectedBottles += 1;
                    this.statusBarBottles.setPersentage(this.collectedBottles * 20);
                }
            });
        }
    }

    checkThrowBottle(){
        let currentTime = new Date().getTime(); // Aktuelle Zeit in Millisekunden
    
        if (this.keyboard.D && currentTime - this.lastThrowTime >= 500) {
            // Flasche nur werfen, wenn 2 Sekunden vergangen sind seit dem letzten Wurf
            let throwableBottle = new ThrowableBottle(this.character);
            this.throwableBottles.push(throwableBottle);  // Füge die Flasche zur Liste hinzu
            this.lastThrowTime = currentTime; // Aktualisiere den letzten Wurfzeitpunkt
        }
    }

    removeThrowableBottle(bottle) {
        let index = this.throwableBottles.indexOf(bottle);
        this.throwableBottles.splice(index, 1);
    }
}