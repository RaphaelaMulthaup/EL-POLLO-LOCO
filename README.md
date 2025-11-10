# Pepe's Desert Adventure 🌵🐔

A 2D **jump-and-run** game programmed in **JavaScript** using an **object-oriented structure**.  
Join Pepe on his adventure through the Mexican desert — dodge angry 🐔 chickens, collect 🍾 bottles and 🪙 coins, and defeat the 🐔 **final boss**!

---

## 🎮 Game Description

Join Pepe on a trip through the Mexican desert.

Along the way, you’ll meet all kinds of chickens that can harm you.  
Jump on them or throw **Tabasco bottles** to defeat them.  
At the end of the level, a powerful **final boss** awaits — save up your bottles to win!

🪙 **Coins** restore some of your energy when you’re hurt.  
🍾 **Bottles** can be collected and thrown at enemies.  
🐔 **Final boss** must be hit three times to be defeated.

---

## 🕹️ Controls

### Keyboard
| Key | Action |
|-----|---------|
| ← / →     | Move left / right |
| ↑ / Space | Jump |
| D         | Throw bottle |
| ESC       | Exit fullscreen |

### Touch (Mobile)
- Arrows: Move  
- 🆙: Jump  
- 🍾: Throw bottle  
- 🔇: Toggle sound  
- 🏠: Restart  

The game automatically detects if you’re on a desktop or mobile device and adjusts the layout accordingly.

---

## ⚙️ Technical Structure

The game is built entirely with **vanilla JavaScript**, no external frameworks.  
It uses the **Canvas API** for rendering and follows a **modular, object-oriented architecture**:

- `World` manages the entire game (canvas, camera, objects)  
- `Character`, `Enemy`, `Endboss`, `StatusBars`, etc. are separate classes  
- A **camera system** smoothly follows the player  
- All game objects receive the shared `world` context for interaction  
- Fully responsive design — works on desktop and mobile  

---

## 🧩 Code Example

Example snippet from the `World` class:

```js
class World {
  level = level1;
  endboss = new Endboss(this);
  character;
  statusBarLife = new StatusBarLife();
  ...
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level.enemies.push(this.endboss);
    this.character = new Character(this);
    this.setWorld();
    this.draw();
    checkEvents();
  }
}
```

---

## 🚀 How to Play

1. Clone or download the repository

2. Open index.html in your browser

3. Click Start ... and the adventure begins!

---

## 🔊 Sound & Storage

- Music and sound effects can be toggled on/off

- The mute status is saved in localStorage, so your preference is remembered next time

---

## 🧠 Developer Notes

- Fully object-oriented class structure

- Continuous game loop handles drawing and logic

- Smooth camera movement following the character

- Subpixel rendering issues are avoided using Math.floor()

---

## 🏁 Goal

Defeat the **final boss** by hitting him 🍾 **three times** to win the game.  
If you lose all your ❤️ life or the boss falls off-screen, it’s **game over**!

---

## 👩‍💻 Author

👩‍💻 **Author:** Raphaela Multhaup  
📧 [Contact](mailto:kontakt@raphaela-multhaup.de)

Developed with ❤️ in JavaScript.
Purpose of this project: practice object-oriented programming, Canvas rendering, and basic game mechanics.

---

## 📄 License

This project is intended for learning and educational purposes.
You may use, modify, and share it freely, as long as credit is given to the original author.
