/**
 * Object containing all image paths organized by category
 */
const imagePaths = {
  character: {
    idle: [
      'img/2_character_pepe/1_idle/idle/I-1.png',
      'img/2_character_pepe/1_idle/idle/I-2.png',
      'img/2_character_pepe/1_idle/idle/I-3.png',
      'img/2_character_pepe/1_idle/idle/I-4.png',
      'img/2_character_pepe/1_idle/idle/I-5.png',
      'img/2_character_pepe/1_idle/idle/I-6.png',
      'img/2_character_pepe/1_idle/idle/I-7.png',
      'img/2_character_pepe/1_idle/idle/I-8.png',
      'img/2_character_pepe/1_idle/idle/I-9.png',
      'img/2_character_pepe/1_idle/idle/I-10.png'
    ],
    longIdle: [
      'img/2_character_pepe/1_idle/long_idle/I-11.png',
      'img/2_character_pepe/1_idle/long_idle/I-12.png',
      'img/2_character_pepe/1_idle/long_idle/I-13.png',
      'img/2_character_pepe/1_idle/long_idle/I-14.png',
      'img/2_character_pepe/1_idle/long_idle/I-15.png',
      'img/2_character_pepe/1_idle/long_idle/I-16.png',
      'img/2_character_pepe/1_idle/long_idle/I-17.png',
      'img/2_character_pepe/1_idle/long_idle/I-18.png',
      'img/2_character_pepe/1_idle/long_idle/I-19.png',
      'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ],
    walk: [
      'img/2_character_pepe/2_walk/W-21.png',
      'img/2_character_pepe/2_walk/W-22.png',
      'img/2_character_pepe/2_walk/W-23.png',
      'img/2_character_pepe/2_walk/W-24.png',
      'img/2_character_pepe/2_walk/W-25.png',
      'img/2_character_pepe/2_walk/W-26.png'
    ],
    jump: [
      'img/2_character_pepe/3_jump/J-31.png',
      'img/2_character_pepe/3_jump/J-32.png',
      'img/2_character_pepe/3_jump/J-33.png',
      'img/2_character_pepe/3_jump/J-34.png',
      'img/2_character_pepe/3_jump/J-35.png',
      'img/2_character_pepe/3_jump/J-36.png',
      'img/2_character_pepe/3_jump/J-37.png',
      'img/2_character_pepe/3_jump/J-38.png',
      'img/2_character_pepe/3_jump/J-39.png'
    ],
    hurt: [
      'img/2_character_pepe/4_hurt/H-41.png',
      'img/2_character_pepe/4_hurt/H-42.png',
      'img/2_character_pepe/4_hurt/H-43.png'
    ],
    dead: [
      'img/2_character_pepe/5_dead/D-51.png',
      'img/2_character_pepe/5_dead/D-52.png',
      'img/2_character_pepe/5_dead/D-53.png',
      'img/2_character_pepe/5_dead/D-54.png',
      'img/2_character_pepe/5_dead/D-55.png',
      'img/2_character_pepe/5_dead/D-56.png',
      'img/2_character_pepe/5_dead/D-57.png'
    ],
    pepe: 'img/2_character_pepe/Pepe.png'
  },
  enemies: {
    chickenNormal: {
      walk: [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
      ],
      dead: 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
      gif: 'img/3_enemies_chicken/chicken_normal/Gallina muestra gif.gif',
      version: 'img/3_enemies_chicken/chicken_normal/Versión Gallinitas.png'
    },
    chickenSmall: {
      walk: [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
      ],
      dead: 'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
      gif: 'img/3_enemies_chicken/chicken_small/Muestra gif.gif',
      version: 'img/3_enemies_chicken/chicken_small/Versión pollitos.png'
    },
    endboss: {
      walk: [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
      ],
      walkGif: 'img/4_enemie_boss_chicken/1_walk/Muestra.gif',
      alert: [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
      ],
      alertGif: 'img/4_enemie_boss_chicken/2_alert/Muestra_alerta.gif',
      alertWalkGif: 'img/4_enemie_boss_chicken/2_alert/Muestra_caminata_alerta.gif',
      attack: [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
      ],
      attackGif: 'img/4_enemie_boss_chicken/3_attack/Muestra_ataque.gif',
      hurt: [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
      ],
      hurtGif: 'img/4_enemie_boss_chicken/4_hurt/Muestra_herida.gif',
      dead: [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
      ],
      deadGif: 'img/4_enemie_boss_chicken/5_dead/Muestra_muerte.gif',
      deadHurtGif: 'img/4_enemie_boss_chicken/5_dead/Muestra_herida_y_muerte.gif',
      allSequencesGif: 'img/4_enemie_boss_chicken/all_sequences.gif',
      portrait: 'img/4_enemie_boss_chicken/Señora_gallina.png'
    }
  },
  background: {
    layers: {
      firstLayer: [
        'img/5_background/layers/1_first_layer/1.png',
        'img/5_background/layers/1_first_layer/2.png',
        'img/5_background/layers/1_first_layer/full.png'
      ],
      secondLayer: [
        'img/5_background/layers/2_second_layer/1.png',
        'img/5_background/layers/2_second_layer/2.png',
        'img/5_background/layers/2_second_layer/full.png'
      ],
      thirdLayer: [
        'img/5_background/layers/3_third_layer/1.png',
        'img/5_background/layers/3_third_layer/2.png',
        'img/5_background/layers/3_third_layer/full.png'
      ],
      clouds: [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png',
        'img/5_background/layers/4_clouds/full.png'
      ],
      air: 'img/5_background/layers/air.png'
    },
    complete: 'img/5_background/complete_background.png',
    firstHalf: 'img/5_background/first_half_background.png',
    secondHalf: 'img/5_background/second_half_background.png'
  },
  bottle: {
    rotation: [
      'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ],
    rotationGif: 'img/6_salsa_bottle/bottle_rotation/rotation_sequences.gif',
    splash: [
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ],
    ground1: 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    ground2: 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    bottle: 'img/6_salsa_bottle/salsa_bottle.png',
    allSequencesGif: 'img/6_salsa_bottle/all_sequences.gif'
  },
  statusbars: {
    coins: {
      blue: [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
      ],
      green: [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
      ],
      orange: [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
      ]
    },
    health: {
      blue: [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
      ],
      green: [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
      ],
      orange: [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
      ]
    },
    bottles: {
      blue: [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
      ],
      green: [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
      ],
      orange: [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
      ]
    },
    endboss: {
      blue: [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
      ],
      green: [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png'
      ],
      orange: [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
      ],
      blueImage: 'img/7_statusbars/2_statusbar_endboss/blue.png',
      greenImage: 'img/7_statusbars/2_statusbar_endboss/green.png',
      orangeImage: 'img/7_statusbars/2_statusbar_endboss/orange.png'
    },
    icons: {
      coin: 'img/7_statusbars/3_icons/icon_coin.png',
      health: 'img/7_statusbars/3_icons/icon_health.png',
      healthEndboss: 'img/7_statusbars/3_icons/icon_health_endboss.png',
      salsaBottle: 'img/7_statusbars/3_icons/icon_salsa_bottle.png'
    },
    barElements: {
      blue: 'img/7_statusbars/4_bar_elements/statusbar_blue.png',
      empty: 'img/7_statusbars/4_bar_elements/statusbar_empty.png',
      green: 'img/7_statusbars/4_bar_elements/statusbar_green.png',
      orange: 'img/7_statusbars/4_bar_elements/statusbar_orange.png'
    },
    examples: [
      'img/7_statusbars/all_statusbars.png',
      'img/7_statusbars/example_1.png',
      'img/7_statusbars/example_2.png',
      'img/7_statusbars/example_3.png',
      'img/7_statusbars/example_4.png'
    ]
  },
  coin: [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png'
  ],
  screens: {
    start: [
      'img/9_intro_outro_screens/start/startscreen_1.png',
      'img/9_intro_outro_screens/start/startscreen_2.png'
    ],
    gameOver: [
      'img/9_intro_outro_screens/game_over/game over.png',
      'img/9_intro_outro_screens/game_over/game over!.png',
      'img/9_intro_outro_screens/game_over/you lost.png',
      'img/9_intro_outro_screens/game_over/oh no you lost!.png',
      'img/9_intro_outro_screens/game_over/example.png'
    ],
    win: [
      'img/9_intro_outro_screens/win/win_1.png',
      'img/9_intro_outro_screens/win/win_2.png',
      'img/9_intro_outro_screens/win/won_1.png',
      'img/9_intro_outro_screens/win/won_2.png'
    ]
  },
  ui: {
    arrowLeft: 'img/arrowLeft.png',
    arrowRight: 'img/arrowRight.png',
    arrowUp: 'img/arrowUp.png',
    circle: 'img/circle.png',
    close: 'img/close.png',
    d: 'img/D.png',
    fullscreen: 'img/fullscreen.png',
    home: 'img/home.png',
    info: 'img/info.png',
    minimize: 'img/minimize.png',
    mute: 'img/mute.png',
    restart: 'img/restart.png',
    space: 'img/space.png',
    unmute: 'img/unmute.png'
  }
};
