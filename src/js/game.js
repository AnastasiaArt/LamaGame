import {Screen} from './screen.js';
import {Loading} from './scenes/loading.js';
import {GameOver} from './scenes/game-over.js';
import {Menu} from './scenes/menu.js';
import {Scene} from './scene.js';
import {Controls} from "./controls.js";
import {Running} from "./scenes/running.js";

export class Game {
    // ширина и высота по умолчанию 640
    constructor({width = 640, height = 640} = {}) {
        this.screen = new Screen(width, width);
        this.screen.loadImages({
            sky: 'img/sky.png',
            plant: 'img/plant.png',
            slime: 'img/slime.png',
            plant1: 'img/plant.png',
            slime1: 'img/slime.png',
            player: 'img/run-sm.png',
            menu: 'img/menu-bg.png',
            tiles: 'img/menu-bg.png',
            jump: 'img/jump-sm.png',
            crash: 'img/crash-sm.png',
        });
        this.control = new Controls();
        this.scenes = {
            loading: new Loading(this),
            menu: new Menu(this),
            running: new Running(this),
            gameOver: new GameOver(this)
        };
        this.currentScene = this.scenes.loading;
        this.currentScene.init();
    }

    changeScene(status) {
        switch (status) {
            case Scene.LOADED:
                return this.scenes.menu;
            case Scene.START_GAME:
                return this.scenes.running;
            case Scene.STOP_GAME:
                return this.currentScene.status = Scene.STOP_GAME;
            case Scene.GAME_OVER:
                return this.scenes.gameOver;
            default:
                return this.scenes.menu;
        }
    }

    frame(time) {
        if (this.currentScene.status !== Scene.WORKING && this.currentScene.status !== Scene.STOP_GAME) {
            this.currentScene = this.changeScene(this.currentScene.status);
            this.currentScene.init();
        }

        if (this.currentScene.status !== Scene.STOP_GAME) {
            this.currentScene.render(time);
            requestAnimationFrame((time) => this.frame(time));
        }
    }

    run() {
        requestAnimationFrame((time) => this.frame(time));
    }
}
