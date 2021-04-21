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
        this.game.screen.drawImage(0, 20, 'sky1');
        this.game.screen.drawImage(80, 100 + this.game.screen.images.sky1.height , 'sky2');
        this.game.screen.drawImage(0 + this.game.screen.images.sky1.width + 80, 40 + this.game.screen.images.sky1.height , 'sky3');
        this.game.screen.drawImage(this.game.screen.canvas.width - this.game.screen.images.sky3.width, 20 + this.game.screen.images.sky1.height + this.game.screen.images.sky2.height, 'sky1');
        this.game.screen.drawImage(this.game.screen.canvas.width - this.game.screen.images.sky3.width - 80, 80 + this.game.screen.images.sky1.height * 2 + this.game.screen.images.sky2.height , 'sky3');
        this.game.screen.drawImage(0 - this.game.screen.images.sky1.width/2, this.game.screen.canvas.height - 20 - this.game.screen.images.sky1.height, 'sky1');
        this.game.screen.drawImage(this.game.screen.canvas.width/2 - 100, this.game.screen.canvas.height/2 + 40 , 'cloudLogo');
        this.game.screen.drawImage(this.game.screen.canvas.width/2 - this.game.screen.images.logo.width/2, 100 , 'logo');
        this.game.screen.printText(250, 650, 'Press enter to start game', '#000000');
        this.game.screen.drawImage(this.game.screen.canvas.width/2 - this.game.screen.images.btnStart.width/2, this.game.screen.canvas.height - 100 - this.game.screen.images.btnStart.height , 'btnStart');
        super.render(time)
    }
}
