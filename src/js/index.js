import '../index.css';
import { Game } from "./game.js";

window.onload = () => {
    const lamaGame = new Game();
    lamaGame.run();
    //
    // const startBtn = document.getElementById('start-btn');
    // startBtn.addEventListener("mousedown",  (e) => {
    //     lamaGame.scenes.menu.startGame(e)}, false);
};
