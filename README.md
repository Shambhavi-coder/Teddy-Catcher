
# 🎮 Teddy Catcher - Multiplayer Claw Machine Game

A fully responsive, multiplayer claw machine game built with **React**, **Vanilla JavaScript**, and **CSS**. Players take turns controlling a virtual claw to catch as many teddy bears as possible within a time limit.

---

## 📦 Features

✅ Multiplayer support (1 to 4 players)
✅ Turn-based gameplay with isolated player states
✅ Realistic claw movement and teddy catching logic
✅ Scoring system with sink drop zone
✅ Timer-based challenge per player
✅ Fun visual effects and celebration animations
✅ Full touch screen support for mobile and tablets
✅ Responsive design for all screen sizes
✅ Intuitive controls: Keyboard and on-screen touchpad

---

## 🏗️ Tech Stack

* **React 18**
* **Vanilla JavaScript**
* **CSS for styling**
* **React Router DOM**
* **Vite for fast development**
* **React Hooks for state management**

---

## 🗂️ Project Structure

```
src/
├── App.jsx                # Application router
├── main.jsx               # Entry point
├── types/
│   └── game.js            # Game object definitions (JSDoc style)
├── pages/
│   ├── Index.jsx          # Main game logic and state manager
│   └── NotFound.jsx       # 404 error page
├── components/
│   ├── GameSetup.jsx      # Game setup screen
│   ├── GameBoard.jsx      # Core gameplay logic
│   ├── TouchControls.jsx  # Touch-friendly controls
│   ├── Claw.jsx           # Claw mechanism
│   ├── TeddyBear.jsx      # Teddy bear elements
│   ├── Sink.jsx           # Sink drop zone
│   ├── GameHUD.jsx        # Player HUD (score, timer)
│   ├── PlayerStatus.jsx   # Player status sidebar
│   ├── CollectedTeddies.jsx # Collected teddy display
│   ├── CelebrationPopup.jsx # Celebration effects
│   ├── GameResults.jsx    # Final results screen
├── styles/
│   ├── global.css         # Global styles
│   └── game.css           # Game-specific styles
```

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v14 or newer recommended)

### Installation

```bash
git clone https://github.com/your-username/teddy-catcher.git
cd teddy-catcher
npm install
```

### Run the Game

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🎮 Controls

**Desktop**

* `← ↑ → ↓` : Move the claw
* `Space` or `Enter` : Drop/Release claw

**Mobile/Tablet**

* On-screen directional pad for movement
* Action button for dropping/releasing

---

## 📱 Touch & Mobile Optimized

* Large, accessible touch targets
* Responsive scaling for all devices
* Optimized layouts for small screens
* Smooth gameplay on mobile and tablets

---

## 🎨 Visual Highlights

* Colorful pink & purple theme
* Realistic claw machine styling
* Fun teddy bear animations
* Positive feedback for successful catches

---

## 🏆 Game Flow

1. Setup player names and timer
2. Players take turns operating the claw
3. Catch teddies and drop them in the sink for points
4. Game ends when all players finish
5. View final scores and rankings

---

## 🧸 Credits

Built with love using React and plain CSS.
No external UI libraries used.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

