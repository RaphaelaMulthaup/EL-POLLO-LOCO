let canvas;
let world;
let keyboard = new Keyboard();
let muted = false;
let stoppableIntervalIds = [];
let defaultSounds = [];
let gameStartedOnce = false;

function init(){
    touchDeviceOrKeyboard();
    canvas = document.getElementById('canvas');
    addEventListeners();
    addEventListenersForMobileActionButtons();
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

function touchDeviceOrKeyboard(){
    if ('ontouchstart' in window) {
        checkOrientation();
        document.getElementById('circle').classList.add('fillCircle');
        document.getElementById('polygon').classList.add('fillPolygon');
        document.getElementById('buttons').classList.remove('buttonsDesktop');
        document.getElementById('buttons').classList.add('buttonsMobile');
        document.getElementById('mobileActionButtons').classList.remove('dNone');
        document.getElementById('infoText').classList.remove('infoTextDesktop');
        document.getElementById('infoText').classList.add('infoTextMobile');
        window.addEventListener('orientationchange', checkOrientation);
        document.addEventListener('contextmenu', (event) => {
            event.preventDefault();
          });
    }
}

function checkOrientation() {
    setTimeout(() => {
        let overlay = document.getElementById('orientationOverlay');
        // overlay.style.width = `${window.innerWidth}px`;
        // overlay.style.height = `${window.innerHeight}px`;
        if (window.innerHeight > window.innerWidth) {
            overlay.classList.remove('dNone');
        } else {
            overlay.classList.add('dNone');
        }    

        // const width = document.documentElement.clientWidth;
        // const height = document.documentElement.clientHeight;

        // overlay.style.width = `${width}px`;
        // overlay.style.height = `${height}px`;

        // if (height > width) {
        //     overlay.classList.remove('dNone');
        // } else {
        //     overlay.classList.add('dNone');
        // }
    }, 10);

}

function addEventListeners(){
    document.getElementById('startButton').addEventListener('click', function(event) {
        let clickCircle = event.target.classList.contains('circleStartButton');
        let clickPolygon = event.target.tagName === 'polygon';
        if (clickCircle || clickPolygon) {
            startGame();
        }
    });
}

function addEventListenersForMobileActionButtons(){
    document.getElementById('buttonThrow').addEventListener('touchstart', (e) => {
       keyboard.D = true;  
    })
    document.getElementById('buttonThrow').addEventListener('touchend', (e) => {
        keyboard.D = false;  
    })
    document.getElementById('buttonJump').addEventListener('touchstart', (e) => {
        keyboard.UP = true;  
    })
     document.getElementById('buttonJump').addEventListener('touchend', (e) => {
         keyboard.UP = false;  
    })
    document.getElementById('buttonLeft').addEventListener('touchstart', (e) => {
        keyboard.LEFT = true;  
     })
     document.getElementById('buttonLeft').addEventListener('touchend', (e) => {
         keyboard.LEFT = false;  
     })
     document.getElementById('buttonRight').addEventListener('touchstart', (e) => {
         keyboard.RIGHT = true;  
     })
      document.getElementById('buttonRight').addEventListener('touchend', (e) => {
          keyboard.RIGHT = false;  
     })
}

function startGame(){
    if ('ontouchstart' in window) {
        fullscreen();
    }
    defaultSounds = JSON.parse(JSON.stringify(sounds));
    document.getElementById('startButton').classList.add('dNone');
    document.getElementById('startscreen').classList.add('dNone');
    initLevel();
    world = new World(canvas, keyboard);
    changeBackgroundMusic();
    gameStartedOnce = true;
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

function restart(){
    world.gameOver = true;
    pauseSound('mexicanHatDance');
    resetSounds();
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
    stoppableIntervalIds = [];
    // world = null;
    document.getElementById('endscreen').classList.add('dNone');
    document.getElementById('overlay').classList.add('dNone');
    startGame();
}

function resetSounds() {
    Object.keys(sounds).forEach(sound => {
        sounds[sound].currentVolume = defaultSounds[sound].currentVolume;
        sounds[sound].currentTime = defaultSounds[sound].currentTime;
    });
}

function fullscreen(){
    document.getElementById('fullscreen').classList.add('dNone');
    document.getElementById('minimize').classList.remove('dNone');

    let wrapper = document.getElementById('wrapper');
    if (wrapper.requestFullscreen) {
        wrapper.requestFullscreen();
    } else if (wrapper.mozRequestFullScreen) {
        wrapper.mozRequestFullScreen();
    } else if (wrapper.webkitRequestFullscreen) {
        wrapper.webkitRequestFullscreen();
    } else if (wrapper.msRequestFullscreen) {   
        wrapper.msRequestFullscreen();
    }

    for (let rule of document.styleSheets[0].cssRules) {
        if (rule.style.borderRadius) {
            rule.style.borderRadius = '0';
        }
    }
}

function minimize(){
    document.getElementById('fullscreen').classList.remove('dNone');
    document.getElementById('minimize').classList.add('dNone');

    if (document.fullscreenElement) {
        document.exitFullscreen();
    }

    for (let rule of document.styleSheets[0].cssRules) {
        if (rule.style.borderRadius) {
            rule.style.borderRadius = '2vw';
        }
    }
}

function openInfo(){
    event.stopPropagation();
    document.getElementById('infoText').classList.remove('dNone');
    document.getElementById('clickBarrier').classList.remove('dNone');
    document.getElementById('startButton').classList.add('dNone');
}

function closeInfo(){
    document.getElementById('infoText').classList.add('dNone');
    document.getElementById('clickBarrier').classList.add('dNone');
    if (!gameStartedOnce) {
        document.getElementById('startButton').classList.remove('dNone');
    }
    
}