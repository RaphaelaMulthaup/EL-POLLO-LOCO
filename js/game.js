let canvas;
let world;
let keyboard = new Keyboard();
let muted = false;
let stoppableIntervalIds = [];

function init(){
    canvas = document.getElementById('canvas');
    addEventListeners();
    playSound('backgroundMusicStartScreen');
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
            sounds.backgroundMusicStartScreen.currentVolume -= 0.03;
            setVolume('backgroundMusicStartScreen');
            index --;   
        }
    }, 50);
    setTimeout(() => {
        pauseSound('backgroundMusicStartScreen');
    }, 1000);
    playSound('backgroundMusicGame');
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

function playSound(soundName){
    let currentSound = setSound(soundName);
    currentSound.play();
}

function setSound(soundName){
    let currentSound = setVolume(soundName);
    currentSound.currentTime = sounds[soundName].currentTime;
    return currentSound;
}

function setVolume(soundName){
    let currentSound = sounds[soundName].audio;
    if (!muted) {
        currentSound.volume = sounds[soundName].currentVolume;
    } else {
        currentSound.volume = 0;
    }
    return currentSound;
}

function pauseSound(soundName){
    let currentSound = sounds[soundName].audio;
    currentSound.pause(); 
}

function setStoppableInterval(fn, time){
    let id = setInterval(() => fn(id), time);
    stoppableIntervalIds.push(id);
}

function displayEndscreen(){
    let endscreen = document.getElementById('endscreen');
    if (world.level.enemies[world.level.enemies.length - 1].energy == 0) {
        endscreen.src = 'img/9_intro_outro_screens/win/win_1.png';
        endscreen.classList.remove('dNone', 'endscreenGameOver');
        endscreen.classList.add('endscreenYouWin');
        document.getElementById('overlay').classList.remove('dNone');
    }
    if (world.character.isDead()) {
        endscreen.src = 'img/9_intro_outro_screens/game_over/game over.png';
        endscreen.classList.remove('dNone', 'endscreenYouWin');
        endscreen.classList.add('endscreenGameOver');
    }
}