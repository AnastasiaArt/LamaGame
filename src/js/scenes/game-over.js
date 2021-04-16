import {Scene} from '../scene.js'

export class GameOver extends Scene {
    constructor(game) {
        super(game)
    }

    init() {
        super.init();
    }

    update(time) {
    }

    render(time) {
        this.update(time);
        this.game.screen.drawImageFullScreen(0, 0, 'menu');
        this.game.screen.drawImage(0, 20, 'sky');
        this.game.screen.printText(250, 350, 'Game Over!!!!!!!!!!!!!!');
        super.render(time)
    }
}
