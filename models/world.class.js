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

    addToMap(mo){
        if (mo.otherDirection) {
            mo.flipImg(this.ctx);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            mo.flipImgBack(this.ctx);
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
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarLife.setPersentage(this.character.energy);
            }
        });
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