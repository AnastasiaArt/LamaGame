import '../index.css';
import { Game } from "./game.js";

window.onload = () => {
    const lamaGame = new Game();
    lamaGame.run();

    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener("mousedown",  (e) => {
        lamaGame.scenes.menu.startGame()}, false);

    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener("mousedown",  (e) => {
        lamaGame.scenes.preStart.setCloseBtn()}, false);

    const retryBtn = document.getElementById('retry-btn');
    retryBtn.addEventListener("mousedown",  (e) => {
        lamaGame.scenes.gameOver.retry()}, false);

    const toggleMuteBtn = document.getElementById('mute-btn');
    toggleMuteBtn.style.backgroundImage = lamaGame.isMute ? "url('img/btns/mute-off.png')" : "url('img/btns/mute-on.png')";
    toggleMuteBtn.addEventListener("mousedown",  (e) => {
        lamaGame.isMute = !lamaGame.isMute;
        toggleMuteBtn.style.backgroundImage = lamaGame.isMute ? "url('img/btns/mute-off.png')" : "url('img/btns/mute-on.png')";
            for (let audio in lamaGame.screen.audios) {
                if (lamaGame.isMute) {
                lamaGame.screen.audios[audio].volume = 0
            } else {
                   lamaGame.screen.audios[audio].volume = 0.8
            }
        }
    }, false);
};
