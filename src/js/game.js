import {Screen} from './screen.js';
import {Loading} from './scenes/loading.js';
import {GameOver} from './scenes/game-over.js';
import {Menu} from './scenes/menu.js';
import {Scene} from './scene.js';
import {Controls} from "./controls.js";
import {Running} from "./scenes/running.js";

export class Game {
    // ширина и высота по умолчанию 640
    constructor({width = 700, height = 700, isRetry = false} = {}) {
        this.screen = new Screen(width, width);
        // window.addEventListener("resize", this.resize);
        // this.resize();
        this.screen.loadImages({
            obstacles: 'img/obstacles.png',
            player: 'img/player.png',
            menu: 'img/menu-bg.png',
            tiles: 'img/menu-bg.png',
            bg1: 'img/bg/Bg1(morning).png',
            bg2: 'img/bg/Bg2(day).png',
            bg3: 'img/bg/Bg3(pre_evening).png',
            bg4: 'img/bg/Bg4(evening).png',
            bg5: 'img/bg/Bg5(night).png',
            tree1: 'img/bg/Elements1(morning).png',
            tree2: 'img/bg/Elements2(day).png',
            tree3: 'img/bg/Elements3(pre_evening).png',
            tree4: 'img/bg/Elements4(evening).png',
            tree5: 'img/bg/Elements5(night).png',
            sun: 'img/sun_rays.png',
            bird: 'img/birds.png',
            mouse: 'img/mouse.png',
            gameOverPlayer: 'img/game-over-player.png',
            moon: 'img/moon.png',
            sky1: 'img/cloud3-180.png',
            sky2: 'img/cloud2-120.png',
            sky3: 'img/cloud1-100.png',
            cloudLogo: 'img/Cloud_with_Plushy_logo-200.png',
            logo: 'img/game-logo.png',
            btnStart: 'img/start-btn.png',
            btnRetry: 'img/retry-btn.png',
            textGameOver: 'img/game-over-text.png',
            menuLama: 'img/menu-lama.png',
            collideText1: 'img/text/aych.png',
            collideText2: 'img/text/oh-oh-oh.png',
            collideText3: 'img/text/ups.png',
            collideText4: 'img/text/upsy.png',
            countText1: 'img/text/bombastic.png',
            countText2: 'img/text/fast.png',
            countText3: 'img/text/fluffy.png',
            countText4: 'img/text/teddy.png',
            sleepText: 'img/text/sleeping.png',
            textBg: 'img/text-bg.png',
        });
        this.count = 0;
        this.control = new Controls();
        this.scenes = {
            loading: new Loading(this),
            menu: new Menu(this),
            running: new Running(this),
            gameOver: new GameOver(this)
        };
        this.currentScene = isRetry ? this.scenes.running : this.scenes.loading;
        this.currentScene.init();
    }

    resize() {
        this.screen = new Screen(window.innerWidth, window.innerHeight);
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
