import {Scene} from '../scene.js'
import {Player} from "../player.js";
import {Button} from "@/js/button";

export class PreStart extends Scene {
    constructor(game) {
        super(game);
        this.position = {
            x: this.game.screen.width,
            y: 0,
        };

        this.position1 = {
            x: this.game.screen.width,
            y: 0,
        };

        this.player = new Player(this.game.control, this.game.screen.height - 300,100);
        this.player.x = 0 - this.player.view.width / 2;
    }

    init() {
        super.init();
        this.player.view.x = 500;
        this.player.view.y = 500;
        this.player.y = this.game.screen.canvas.height - this.game.screen.images.ground.height/2 - this.player.view.height;
        this.btnClose = new Button(this.game.screen.canvas.width/2 - this.game.screen.canvas.width/6 + this.game.screen.canvas.width/3 -this.game.screen.images.btnClose.width - 20,this.game.screen.canvas.height/8 + 80, this.game.screen.images.btnClose.width, this.game.screen.images.btnClose.height);
        this.game.screen.canvas.addEventListener("mousedown",  (e) => {
            this.game.screen.audios.jump.play();
            if (this.btnClose.checkCollision(e)) {
                this.game.screen.audios.intro.pause();
                this.game.screen.audios.main.volume = 0;
                let interval = setInterval(()=> {
                    if (this.game.screen.audios.main.volume < 0.9) {
                        this.game.screen.audios.main.volume += 0.05;
                    } else {
                        this.game.screen.audios.main.volume = 1;
                        clearInterval(interval)
                    }
                }, 100);
                this.game.screen.audios.main.loop = true;
                this.game.screen.audios.main.play();
                this.finish(Scene.START_GAME)
            }
        }, false);
    }

    update(time) {
        this.player.update(time);
    }

    showModalStart() {
        this.game.screen.drawScaleImage('textBg',this.game.screen.canvas.width/2 - this.game.screen.canvas.width/6, this.game.screen.canvas.height/8 + 60, 0, 0, 82, 108, this.game.screen.canvas.width/3, this.game.screen.canvas.height/2 - 160);
        this.game.screen.drawImage(this.game.screen.canvas.width/2 - this.game.screen.canvas.width/6 + this.game.screen.canvas.width/3 - this.game.screen.images.btnClose.width - 20, this.game.screen.canvas.height/8 + 80 , 'btnClose');
        this.game.screen.printText(245, this.game.screen.canvas.height/8 +  this.game.screen.images.btnClose.height + 110, 'Привет, ламопрыг!', '#000000');
        this.game.screen.printText(245, this.game.screen.canvas.height/8 + 200, ' С возвращением!', '#000000');
    }

    render(time) {
        this.update(time);
        this.game.screen.drawImageFullScreen(0, 0, 'bg1');
        if (this.position1.x >= 0) {
            this.position1.x -= 30;
        }
        this.game.screen.drawImageRotated('sun',this.game.screen.width / 2, this.game.screen.height , this.game.screen.changeScale('1.000', '0.800', 0.002), time/9000);
        this.game.screen.drawImage(0, this.game.screen.canvas.height - this.game.screen.images.tree1.height, 'tree1');
        this.game.screen.drawImage(0, this.game.screen.canvas.height - this.game.screen.images.ground.height, 'ground');

        this.game.screen.drawImage(this.position.x, 20, 'sky1');
        this.game.screen.drawImage(this.position.x - 20, 40 + this.game.screen.images.sky1.height, 'sky2');
        this.game.screen.drawImage(this.position.x + this.game.screen.images.sky1.width + 80, 10 + this.game.screen.images.sky1.height, 'sky3');
        this.position.x < 0 - this.game.screen.images.sky1.width - this.game.screen.images.sky2.width - this.game.screen.images.sky3.width - 160 ? this.position.x = this.game.screen.canvas.width : this.position.x -= 2;
        if (this.position1.x < 0) {
            this.game.screen.drawSprite(this.player.view);
            if (this.player.x <= this.game.screen.width / 2 - this.player.view.width) {
                this.player.x+= 2;
            } else {
                this.showModalStart();
            }
        }
    }
}
