import {Scene} from '../scene.js'
import {SpriteSheet} from "@/js/sprite-sheet";

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
        this.game.screen.drawImage(this.game.screen.canvas.width / 2 - this.game.screen.images.sun.width / 2.5, this.game.screen.canvas.height - this.game.screen.images.sun.height / 1.5, 'sun');
        this.game.screen.drawScaleImage('obstacles',this.game.screen.images.sky1.width - 70, 30, 100, 500, 100, 100,  80, 80)
        this.game.screen.drawImage(0, 20, 'sky1');
        this.game.screen.drawImage(60, 100 + this.game.screen.images.sky1.height , 'sky2');
        this.game.screen.drawImage(this.game.screen.canvas.width - this.game.screen.images.sky1.width + 80, this.game.screen.images.sky1.height , 'sky3');
        this.game.screen.drawImage(this.game.screen.canvas.width - this.game.screen.images.sky3.width - 80,  this.game.screen.images.sky1.height + this.game.screen.images.sky2.height, 'sky1');
        this.game.screen.drawScaleImage('obstacles',this.game.screen.canvas.width/2 + 50, this.game.screen.canvas.height/2, 500, 400, 100, 100,  80, 80)
        this.game.screen.drawImage(this.game.screen.canvas.width - this.game.screen.images.sky3.width - 80, this.game.screen.images.sky1.height * 1.7 , 'cloudLogo');
        this.game.screen.drawImage(this.game.screen.canvas.width/2 - this.game.screen.images.logo.width/2, 100 , 'logo');
        this.game.screen.drawScaleImage('menuLama',this.game.screen.images.menuLama.width/4, this.game.screen.canvas.height - this.game.screen.images.menuLama.height/1.2,10,0,305, 348, 320, 370);
        this.game.screen.drawImage(this.game.screen.canvas.width - this.game.screen.images.sky1.width/1.1, this.game.screen.canvas.height + 20 - this.game.screen.images.sky1.height, 'sky1');
        this.game.screen.printText(220, 650, 'Press enter to start game', '#000000');
        this.game.screen.drawImage(this.game.screen.canvas.width/2 - this.game.screen.images.btnStart.width/2, this.game.screen.canvas.height - 100 - this.game.screen.images.btnStart.height , 'btnStart');
        this.game.screen.drawScaleImage('obstacles',20, this.game.screen.canvas.height/3, 400, 400, 100, 100,  50, 50);
        this.game.screen.drawScaleImage('obstacles',40, this.game.screen.canvas.height/1.5, 400, 500, 100, 100,  80, 80);
        this.game.screen.drawScaleImage('obstacles',this.game.screen.canvas.width/2 + 90, this.game.screen.canvas.height/1.35, 100, 500, 100, 100,  80, 80)
        this.game.screen.drawScaleImage('obstacles',this.game.screen.canvas.width/2 + 150, this.game.screen.canvas.height/3.3, 300, 500, 100, 100,  80, 80)
        this.game.screen.drawScaleImage('obstacles',this.game.screen.canvas.width/2 + 80, 0, 200, 500, 100, 100,  80, 80)
        super.render(time)
    }
}
