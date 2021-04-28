import '../index.css';
import { Game } from "./game.js";

window.onload = () => {
    document.getElementById('start-btn').onclick = () => {
        document.querySelector('.start-screen').style.display = 'none';
        const lamaGame = new Game();
        lamaGame.run();
    }
};

