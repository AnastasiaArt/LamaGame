export class Scene {
    constructor(game) {
        this.game = game;
        this.status = this.constructor.WORKING;
    }

    static get WORKING() {
        return 'WORKING';
    }

    static get LOADED() {
        return 'LOADED';
    }

    static get PRE_START() {
        return 'PRE_START';
    }

    static get START_GAME() {
        return 'START_GAME';
    }

    static get STOP_GAME() {
        return 'STOP_GAME'
    }

    static get GAME_OVER() {
        return 'GAME_OVER';
    }

    static get FINISHED() {
        return 'FINISHED';
    }

    init() {
        this.status = this.constructor.WORKING;
    }

    finish(status) {
        this.status = status;
    }

    resize() {
        this.game.screen.context.save();
        this.game.screen.context.scale(innerWidth / this.game.screen.canvas.width, innerHeight / this.game.screen.canvas.height);
        this.game.screen.context.restore();
    }

    render(time) {
        // window.addEventListener("resize", this.resize);
        this.resize();
    }
}
