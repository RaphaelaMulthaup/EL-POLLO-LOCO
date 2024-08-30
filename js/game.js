let canvas;
let world;
let keyboard = new Keyboard();
let directionClouds;

function init(){
    canvas = document.getElementById('canvas');
    directionClouds = Math.random() < 0.5 ? 'left' : 'right';
    world = new World(canvas, keyboard);
    console.log('My character is ', world.character);
}


window.addEventListener('keydown', (event) => {
    console.log(event);
    
    if (event.code == 'Space') {
        keyboard.SPACE = true;
    }
    if (event.code == 'ArrowUp') {
        keyboard.UP = true;
    }
    if (event.code == 'ArrowDown') {
        keyboard.DOWN = true;
    }
    if (event.code == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (event.code == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.code == 'Space') {
        keyboard.SPACE = false;
    }
    if (event.code == 'ArrowUp') {
        keyboard.UP = false;
    }
    if (event.code == 'ArrowDown') {
        keyboard.DOWN = false;
    }
    if (event.code == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (event.code == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
});

