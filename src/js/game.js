import {Screen} from './screen.js';
import {Loading} from './scenes/loading.js';
import {GameOver} from './scenes/game-over.js';
import {Menu} from './scenes/menu.js';
import {Scene} from './scene.js';
import {Controls} from "./controls.js";
import {Running} from "./scenes/running.js";

export class Game {
    // ширина и высота по умолчанию 640
    constructor({width = 700, height = 700} = {}) {
        this.screen = new Screen(width, width);
        // window.addEventListener("resize", this.resize);
        // this.resize();
        this.screen.loadImages({
            sky: 'img/sky.png',
            obstacles: 'img/obstacles.png',
            player: 'img/player.png',
            menu: 'img/menu-bg.png',
            tiles: 'img/menu-bg.png',
            bg1: 'img/Bg1(morning).png',
            bg2: 'img/Bg2(day).png',
            bg3: 'img/Bg3(pre_evening).png',
            bg4: 'img/Bg4(evening).png',
            bg5: 'img/Bg5(night).png',
            tree1: 'img/Elements1(morning).png',
            tree2: 'img/Elements2(day).png',
            tree3: 'img/Elements3(pre_evening).png',
            tree4: 'img/Elements4(evening).png',
            tree5: 'img/Elements5(night).png',
            sun: 'img/sun_rays.png',
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
    resize() {
        this.screen = new Screen( window.innerWidth, window.innerHeight);
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
