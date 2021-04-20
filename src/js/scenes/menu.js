import {Scene} from '../scene.js'

export class Menu extends Scene {
    constructor(game) {
        super(game)
    }

    init() {
        super.init();
    }

    update(time) {
        if (this.game.control.enter) {
            this.finish(Scene.START_GAME)
        }
    }

    render(time) {
        this.update(time);
        this.game.screen.drawImageFullScreen(0, 0, 'bg1');
        this.game.screen.drawImage(0, 20, 'sky');
        this.game.screen.printText(250, 350, 'Press enter to start game', '#000000');
        super.render(time)
    }
}
