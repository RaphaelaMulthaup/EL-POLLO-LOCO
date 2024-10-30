let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusicStartScreen = new Audio('audio/backgroundmusic_startscreen.mp3');
let backgroundMusicGame = new Audio('audio/backgroundmusic_game.mp3');

function init(){
    canvas = document.getElementById('canvas');
    addEventListeners();
    backgroundMusicStartScreen.volume = 0.3;
    backgroundMusicStartScreen.play();
}


window.addEventListener('keydown', (event) => {
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
    if (event.code == 'KeyD') {
        keyboard.D = true;        
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
    if (event.code == 'KeyD') {
        keyboard.D = false;
    }

});

function addEventListeners(){
    document.getElementById('startButton').addEventListener('click', function(event) {
        let clickCircle = event.target.classList.contains('circleStartButton');
        let clickPolygon = event.target.tagName === 'polygon';

        if (clickCircle || clickPolygon) {
            startGame();
        }
    });
}

function startGame(){
    document.getElementById('startButton').classList.add('dNone');
    document.getElementById('startscreen').classList.add('dNone');
    initLevel();
    world = new World(canvas, keyboard);
    changeBackgroundMusic();
}

function changeBackgroundMusic(){
    let index = 10
    setInterval(() => {
        if (index > 0) {
            backgroundMusicStartScreen.volume -= 0.03
            index --;   
        }
    }, 50);
    setTimeout(() => {
        backgroundMusicStartScreen.pause(); 
    }, 1000);
    backgroundMusicGame.volume = 0.1;
    backgroundMusicGame.play();
}