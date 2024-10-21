class DrawableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {};
    currentImage = 0;

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    // draw(ctx){
    //     ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    // }

    draw(ctx){
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading Img', e);
            console.log('cound not load', this.img.src)
        }
        
    }

    drawFrame(ctx){
        if (this instanceof Character || this instanceof Chicken || this instanceof CollectibleObject || this instanceof ThrowableBottle) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // deleteObject(obj){
    //     let index = world.level.collectibleObjects.indexOf(obj);
    //     world.level.collectibleObjects.splice(index, 1);
    // }

}