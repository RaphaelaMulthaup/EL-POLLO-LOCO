let level1;

/**
 * This function initializes the game level by creating and organizing all enemies, collectibles, clouds, and background elements into a Level instance.
 */
function initLevel() {
  level1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chick(),
      new Chick(),
      new Chick(),
      new Chick(),
      new Chick(),
      new Chick(),
    ],
    [new Cloud(-100), new Cloud(620)],
    [
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableCoin(),
      new CollectableCoin(),
      new CollectableCoin(),
      new CollectableCoin(),
      new CollectableCoin(),
      new CollectableCoin(),
      new CollectableCoin(),
      new CollectableCoin(),
      new CollectableCoin(),
      new CollectableCoin(),
    ],
    [
      new BackgroundObject("img/5_background/layers/air.png", 480, -719),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        405,
        -719
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        405,
        -719
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        405,
        -719
      ),

      new BackgroundObject("img/5_background/layers/air.png", 480, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        405,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        405,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        405,
        0
      ),
      new BackgroundObject("img/5_background/layers/air.png", 480, 719),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        405,
        719
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        405,
        719
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        405,
        719
      ),

      new BackgroundObject("img/5_background/layers/air.png", 480, 719 * 2),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        405,
        719 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        405,
        719 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        405,
        719 * 2
      ),
      new BackgroundObject("img/5_background/layers/air.png", 480, 719 * 3),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        405,
        719 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        405,
        719 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        405,
        719 * 3
      ),
    ]
  );
}
