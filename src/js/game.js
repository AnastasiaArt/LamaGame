import {Screen} from './screen.js';
import {Loading} from './scenes/loading.js';
import {GameOver} from './scenes/game-over.js';
import {Menu} from './scenes/menu.js';
import {Scene} from './scene.js';
import {Controls} from "./controls.js";
import {Running} from "./scenes/running.js";
import {PreStart} from "./scenes/pre-start.js";

export class Game {
    // ширина и высота по умолчанию 640
    constructor({width = 700, height = 700, isRetry = false} = {}) {
        this.screen = new Screen(width, width);
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
            tree1: 'img/bg/tree1.png',
            tree2: 'img/bg/tree2.png',
            tree3: 'img/bg/tree3.png',
            tree4: 'img/bg/tree4.png',
            tree5: 'img/bg/tree5.png',
            ground: 'img/bg/ground.png',
            sun: 'img/sun_rays.png',
            sunBlur: 'img/sun_rays_blur.png',
            bird: 'img/birds.png',
            mouse: 'img/mouse.png',
            gameOverPlayer: 'img/game-over-player.png',
            moon: 'img/moon.png',
            sky1: 'img/cloud3-180.png',
            sky2: 'img/cloud2-120.png',
            sky3: 'img/cloud1-100.png',
            cloudLogo: 'img/Cloud_with_Plushy_logo-200.png',
            logo: 'img/game-logo.png',
            btnStart: 'img/btns/start-btn.png',
            btnRetry: 'img/btns/retry-btn.png',
            btnClose: 'img/btns/close-btn.png',
            btnStats: 'img/btns/stat-btn.png',
            textGameOver: 'img/text/game-over-text.png',
            textCount: 'img/text/count-text.png',
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
            cloudText: 'img/text/cloud-text.png',
        });
        this.screen.loadAudio({
            crash1: 'sound/Oi.mp3',
            crash2: 'sound/crash3.mp3',
            start: 'sound/Start_Button.mp3',
            jump: 'sound/Pryzhok.mp3',
            intro: 'sound/Lama_Intro.mp3',
            main: 'sound/Lama_Main.mp3',
        })
        this.count = 0;
        this.control = new Controls();
        this.scenes = {
            loading: new Loading(this),
            menu: new Menu(this),
            preStart: new PreStart(this),
            running: new Running(this),
            gameOver: new GameOver(this)
        };
        this.isRetry = isRetry;
        this.currentScene = this.scenes.loading;
        this.currentScene.init();
    }

    resize() {
        // this.screen = new Screen(window.innerWidth, window.innerHeight);
        // this.screen.context.save();
        this.screen.context.scale(innerWidth / this.screen.canvas.width, innerHeight / this.screen.canvas.height);
        // this.screen.context.restore()
    }

    changeScene(status) {
        switch (status) {
            case Scene.LOADED:
                return this.scenes.menu;
            case Scene.PRE_START:
                return this.scenes.preStart;
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
        // window.addEventListener("resize", this.resize);
        // this.resize();

    }
}
