import {Screen} from './screen-desctop.js';
import {Loading} from './scenes/loading-desctop.js';
import {GameOver} from './scenes/game-over-desctop.js';
import {Menu} from './scenes/menu-desctop.js';
import {Scene} from './scene.js';
import {Controls} from "./controls.js";
import {Running} from "./scenes/running-desctop.js";
import {PreStart} from "./scenes/pre-start-desctop.js";

export class Game {
    // ширина и высота по умолчанию 700, aspect-ratio:1/1
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
            bgLoading: 'img/scenes/loading/bg.png',
            bgMenu: 'img/scenes/menu/bg-desctop.png',
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
            skyBig: 'img/scenes/menu/cloud1-desctop-600.png',
            skyBig3: 'img/scenes/menu/cloud3-desctop-600.png',
            cloudLogo: 'img/Cloud_with_Plushy_logo-200.png',
            logo: 'img/game-logo.png',
            btnStart: 'img/btns/start-btn.png',
            btnRetry: 'img/btns/retry-btn.png',
            btnClose: 'img/btns/close-btn.png',
            btnStats: 'img/btns/stat-btn.png',
            btnMute: 'img/btns/mute-on.png',
            btnMuteOff: 'img/btns/mute-off.png',
            btnShare: 'img/btns/share-btn.png',
            textGameOver: 'img/text/game-over-text.png',
            textCount: 'img/text/count-text.png',
            collideText1: 'img/text/aych.png',
            collideText2: 'img/text/oh-oh-oh.png',
            collideText3: 'img/text/ups.png',
            collideText4: 'img/text/sorry.png',
            countText1: 'img/text/bombastic.png',
            countText2: 'img/text/fast.png',
            countText3: 'img/text/fluffy.png',
            countText4: 'img/text/teddy.png',
            sleepText: 'img/text/sleeping.png',
            textBg: 'img/text-bg.png',
            cloudText: 'img/text/cloud-text.png',
            progress: 'img/scenes/loading/progress.png',
            progressStart: 'img/scenes/loading/progress-start.png',
            progressWrap: 'img/scenes/loading/progress-wrap.png',
            progressLama: 'img/scenes/loading/progress-lama.png',
            menuLama: 'img/scenes/menu/lama-menu-desctop.png',
            menuLamaSleep: 'img/scenes/menu/lama-sleep-menu-desctop.png',
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
        this.isMute = false;
        // window.addEventListener("resize", this.resize);
    }

    resize() {
        // перенести в cssдолжно все считать при ресайзе
        // this.screen = new Screen(window.innerWidth, window.innerHeight);
        // this.screen.context.save();
        const ratio = innerWidth/innerHeight;
        this.screen.canvas.width = innerHeight*ratio;
        this.screen.canvas.height = innerHeight;
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
