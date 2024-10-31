let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusicStartScreen;
let backgroundMusicGame;
let sounds = {
    backgroundMusicStartScreenData: {
        audio: new Audio('audio/backgroundmusic_startscreen.mp3'),
        currentVolume: 0.3
    },
    backgroundMusicGameData: {
        audio: new Audio('audio/backgroundmusic_game.mp3'),
        currentVolume: 0.1
    },
    collectBottleSoundData: {
        audio: new Audio('audio/bottle_collect_1000ms.mp3'),
        currentVolume: 0.4
    }
};
let muted = false;


function init(){
    canvas = document.getElementById('canvas');
    addEventListeners();
    playSound('backgroundMusicStartScreen', 'backgroundMusicStartScreenData');
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
            sounds.backgroundMusicStartScreenData.currentVolume -= 0.03;
            setVolume(backgroundMusicStartScreen, 'backgroundMusicStartScreenData');
            index --;   
        }
    }, 50);
    setTimeout(() => {
        backgroundMusicStartScreen.pause(); 
    }, 1000);
    backgroundMusicGame = sounds.backgroundMusicGameData.audio;
    setVolume(backgroundMusicGame, 'backgroundMusicGameData');
    backgroundMusicGame.play();
}

function muteUnmute(){
    let img = document.getElementById('muteUnmute');
    if (img.src.includes('img/mute.png')) {
        mute(img);
    } else {
        unmute(img);
    }
}

function mute(img){
    img.src = 'img/unmute.png';
    muted = true;
    Object.keys(sounds).forEach(sound => {
        sounds[sound].audio.volume = 0;
    });
}

function unmute(img){
    img.src = 'img/mute.png';
    muted = false;
    Object.keys(sounds).forEach(sound => {
        sounds[sound].audio.volume = sounds[sound].currentVolume;
    });
}

function playSound(soundName, soundData){
    let currentSound = globalThis[soundName];
    currentSound = sounds[soundData].audio;
    setVolume(currentSound, soundData);
    currentSound.play();
}

function setVolume(sound, soundData){
    if (!muted) {
        sound.volume = sounds[soundData].currentVolume;
    } else {
        sound.volume = 0;
    }
}