class Level{
    enemies;
    clouds;
    collectibleObjects;
    backgroundObjects;
    level_end_x = 2700;

    constructor(enemies, clouds, collectibleObjects, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.collectibleObjects = collectibleObjects;
        this.backgroundObjects = backgroundObjects;
    }
}