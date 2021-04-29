import {Scene} from '../scene.js'
import {SpriteSheet} from "@/js/sprite-sheet";
import {AnimateObject} from "@/js/animateObject";

export class Menu extends Scene {
    constructor(game) {
        super(game)
        this.sky1 = null;
        this.sky2 = new AnimateObject('sky1', 60, 100);
        this.sky3 = null;
        this.sky4 = null;
        this.logo = null;
        this.logoCloud = null;
    }

    init() {
        super.init();
    }

    update(time) {
        if (this.game.control.enter) {
            this.finish(Scene.START_GAME)
        }
        if(Object.keys(this.sky2.images).length <=0) {
            this.sky2.images = this.game.screen.images;
            this.sky2.context = this.game.screen.context;
        }
        if(this.sky1 === null) {
            this.sky1 = new AnimateObject('sky2', 120, this.game.screen.canvas.height/4 + this.game.screen.images.sky1.height, 1, 0, this.game.screen.context, this.game.screen.images);
            this.logo =  new AnimateObject('logo', this.game.screen.width/2, this.game.screen.height/3, 1, 0, this.game.screen.context, this.game.screen.images);
            this.sky3 = new AnimateObject('sky3', this.game.screen.canvas.width - this.game.screen.images.sky1.width/2, this.game.screen.images.sky1.height, 1, 0, this.game.screen.context, this.game.screen.images);
            this.sky4 = new AnimateObject('sky1', this.game.screen.canvas.width - this.game.screen.images.sky1.width/2,  this.game.screen.canvas.height - this.game.screen.images.sky1.height/2, 1, 0, this.game.screen.context, this.game.screen.images);
            this.logoCloud = new AnimateObject('cloudLogo', this.game.screen.canvas.width - this.game.screen.images.cloudLogo.width/2, this.game.screen.canvas.height/1.8 , 1, 0, this.game.screen.context, this.game.screen.images);
        }
    }

    render(time) {
        this.update(time);
        this.game.screen.drawImageFullScreen(0, 0, 'bg1');
        this.game.screen.drawImageRotated('sun',this.game.screen.width/1.5, this.game.screen.height/1.1 , this.game.screen.changeScale('1.000', '0.800', 0.002), time/9000)
        // this.game.screen.drawImage(this.game.screen.canvas.width / 2 - this.game.screen.images.sun.width / 2.5, this.game.screen.canvas.height - this.game.screen.images.sun.height / 1.5, 'sun');
        this.game.screen.drawScaleImage('obstacles',this.game.screen.images.sky1.width - 70, 30, 80, 400, 80, 80,  80, 80)
        // this.game.screen.drawImageRotated('sky1',this.game.screen.images.sky1.width/2, 20 , this.game.screen.changeScale('1.000', '0.901', 0.0001), time/500, false);
        // this.game.screen.drawImage(60, 100 + this.game.screen.images.sky1.height , 'sky2');
        this.sky2.levitation(80, 100, 1,40,0.3);
        this.sky1.levitation(140, this.game.screen.canvas.height/4 + this.game.screen.images.sky1.height, 1,30,0.3);
        this.sky3.levitation(this.game.screen.canvas.width - this.game.screen.images.sky1.width/2, this.game.screen.images.sky1.height , 1, 50, 0.5);
        this.game.screen.drawScaleImage('obstacles',this.game.screen.canvas.width/2 + 50, this.game.screen.canvas.height/2, 400, 320, 80, 80,  80, 80)
        this.logoCloud.levitation(this.game.screen.canvas.width - this.game.screen.images.cloudLogo.width/2, this.game.screen.canvas.height/1.8, 1, 30, 0.4 );
        // this.game.screen.drawImage(this.game.screen.canvas.width - this.game.screen.images.sky3.width - 80, this.game.screen.images.sky1.height * 1.7 , 'cloudLogo');
        this.logo.drawImageRotated(this.game.screen.width/2, this.game.screen.height/3, '1.000', '0.800', 0.002, 0, false)
        this.sky4.levitation(this.game.screen.canvas.width - this.game.screen.images.sky1.width/2,  this.game.screen.canvas.height - this.game.screen.images.sky1.height/2, 1, 30, 0.5);
        this.game.screen.drawScaleImage('menuLama',this.game.screen.images.menuLama.width/4, this.game.screen.canvas.height - this.game.screen.images.menuLama.height/1.2,10,0,305, 348, 320, 370);
        this.game.screen.printText(220, 650, 'Press enter to start game', '#000000');
        this.game.screen.drawImage(this.game.screen.canvas.width/2 - this.game.screen.images.btnStart.width/2, this.game.screen.canvas.height - 100 - this.game.screen.images.btnStart.height , 'btnStart');
        this.game.screen.drawScaleImage('obstacles',20, this.game.screen.canvas.height/3, 320, 320, 80, 80,  80, 80);
        this.game.screen.drawScaleImage('obstacles',40, this.game.screen.canvas.height/1.5, 320, 400, 80, 80,  80, 80);
        this.game.screen.drawScaleImage('obstacles',this.game.screen.canvas.width/2 + 90, this.game.screen.canvas.height/1.35, 80, 400, 80, 80,  80, 80)
        this.game.screen.drawScaleImage('obstacles',this.game.screen.canvas.width/2 + 150, this.game.screen.canvas.height/3.3, 240, 400, 80, 80,  80, 80)
        this.game.screen.drawScaleImage('obstacles',this.game.screen.canvas.width/2 + 80, 0, 160, 400, 80, 80,  80, 80)
        super.render(time)
    }
}
