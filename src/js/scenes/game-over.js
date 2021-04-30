import {Scene} from '../scene.js'
import {Player} from "../player";
import {SpriteSheet} from "../sprite-sheet";
import { Game } from "../game.js";
import {AnimateObject} from "@/js/animateObject";
import {Button} from "@/js/button";

export class GameOver extends Scene {
    constructor(game) {
        super(game)
        this.isShowModal = false;
        this.player = new Player(this.game.screen.height - 300);
        this.position = {
            x: this.game.screen.width,
            y: 0,
        };
        this.opacity = 0;
        this.sky1 = null;
        this.sky2 = null;
        this.sky3 = null;
        this.sky4 = null;
        this.logoCloud = null;
        this.textGameOver = null;
        this.lama = null;
        this.scale = 0;
        this.isChangeScale = false;
        this.textGameOverY = this.game.screen.canvas.height/2;
        this.btnRetry = null;
    }

    drawText() {
        this.game.screen.printText(330, this.game.screen.canvas.height/8 + 70, 'Упс!');
        this.game.screen.printText(280, this.game.screen.canvas.height/8 + 100,  'Лама заснула!')
        this.game.screen.printText(250, this.game.screen.canvas.height/8 + 130, 'Встретимся завтра');
        this.game.screen.printText(250, this.game.screen.canvas.height/8 + 160, ' или ещё поиграем?');
    }

    showModalRetry() {
        this.game.screen.drawScaleImage('textBg',this.game.screen.canvas.width/2 - this.game.screen.canvas.width/6, this.game.screen.canvas.height/8 + 60, 0, 0, 82, 108, this.game.screen.canvas.width/3, this.game.screen.canvas.height/2 - 70);
        this.game.screen.printText(245, this.game.screen.canvas.height/8 + 130, 'Лучший результат:', '#000000');
        this.game.screen.printText(340, this.game.screen.canvas.height/8 + 160, this.game.count, '#000000');
        this.game.screen.printText(270, this.game.screen.canvas.height/8 + 190, 'Ваш результат:', '#000000');
        this.game.screen.printText(340, this.game.screen.canvas.height/8 + 220, this.game.count, '#000000');
        this.game.screen.drawImage(this.game.screen.canvas.width/2 - this.game.screen.images.btnRetry.width/2, this.game.screen.canvas.height/8 + 250, 'btnRetry');
    }

    init() {
        super.init();
        this.player.tile = new SpriteSheet({
            imageName: 'gameOverPlayer',
            imageWidth: 1341,
            imageHeight: 336,
            spriteWidth: 336,
            spriteHeight: 336
        });
        this.player.view = this.player.tile.getAnimation([1, 2, 3, 4], 150, false);
        this.player.x = this.game.screen.width / 2 - this.player.view.width/1.5;
        this.player.y = this.game.screen.height - this.player.view.height;
        this.player.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
        this.player.view.run();
        setTimeout(()=> { this.isShowModal = true;}, 5000);
        this.btnRetry = new Button(this.game.screen.canvas.width/2 - this.game.screen.images.btnRetry.width/2,this.game.screen.canvas.height/8 + 250, this.game.screen.images.btnRetry.width, this.game.screen.images.btnRetry.height);
        this.game.screen.canvas.addEventListener("mousedown",  (e) => {
            if (this.btnRetry.checkCollision(e)) {
                this.finish(Scene.START_GAME)
            }
        }, false);
    }

    update(time) {
        this.player.update(time);
        if (this.position.x >= 0) {
            this.position.x -= 3;
        }
        if (this.isShowModal && this.opacity <=1) {
            this.opacity += 0.01;
        }
        if(this.sky1 === null) {
            this.sky1 = new AnimateObject('sky1', this.game.screen.canvas.width, -20, 1, 0, this.game.screen.context, this.game.screen.images);
            this.sky2 = new AnimateObject('sky3', this.game.screen.canvas.width, this.game.screen.images.sky1.height + 60 , 1, 0, this.game.screen.context, this.game.screen.images);
            this.sky3 = new AnimateObject('sky1', this.game.screen.canvas.width, this.game.screen.canvas.height - this.game.screen.images.sky1.height - 40, 1, 0, this.game.screen.context, this.game.screen.images);
            this.sky4 = new AnimateObject('sky2', this.game.screen.canvas.width, this.game.screen.canvas.height/2 + this.game.screen.images.sky2.height, 1, 0, this.game.screen.context, this.game.screen.images);
            this.logoCloud = new AnimateObject('cloudLogo', this.game.screen.canvas.width, 70 + this.game.screen.images.sky1.height , 1, 0, this.game.screen.context, this.game.screen.images);
            this.lama = new AnimateObject('menuLama', 0, this.game.screen.canvas.height - this.game.screen.images.menuLama.height/1.2, 1, 0, this.game.screen.context, this.game.screen.images, 'right');
            this.textGameOver = new AnimateObject('textGameOver', this.game.screen.canvas.width/2, this.game.screen.canvas.height/7, 0, 0, this.game.screen.context, this.game.screen.images);

        }
        if (this.game.control.enter) {
            this.game = new Game({isRetry: true});
            this.game.run();
            this.finish(Scene.START_GAME)
        }
    }

    render(time) {
        this.game.screen.context.globalAlpha = 1;
        this.update(time);
        this.game.screen.drawImageFullScreen(0, 0, 'bg5');
        if(this.sky1.vector1.x >= this.game.screen.canvas.width - this.game.screen.images.sky1.width / 1.5 && !this.sky1.isLevitation) {
            this.sky1.run()
        } else {
            this.sky1.levitation(this.game.screen.canvas.width - this.game.screen.images.sky1.width / 1.5, -20, 1, 40, 0.3);
        }
        if(this.logoCloud.vector1.x >= 50 && !this.logoCloud.isLevitation) {
            this.logoCloud.run()
        } else {
            this.logoCloud.levitation(50, 70 + this.game.screen.images.sky1.height, 1, 40, 0.3);
        }
        if(this.sky2.vector1.x >= this.game.screen.canvas.width/2 + 100 && !this.sky2.isLevitation) {
            this.sky2.run()
        } else {
            this.sky2.levitation(this.game.screen.canvas.width/2 + 100, this.game.screen.images.sky1.height + 60, 1, 20, 0.3);
        }
        if(this.sky3.vector1.x >= this.game.screen.canvas.width - this.game.screen.images.sky1.width/1.1 && !this.sky3.isLevitation) {
            this.sky3.run()
        } else {
            this.sky3.levitation(this.game.screen.canvas.width - this.game.screen.images.sky1.width/1.1, this.game.screen.canvas.height - this.game.screen.images.sky1.height - 30, 1, 40, 0.3);
        }
        if(this.sky4.vector1.x >=this.game.screen.canvas.width/2 - this.game.screen.images.sky1.width && !this.sky4.isLevitation) {
            this.sky4.run()
        } else {
            this.sky4.levitation(this.game.screen.canvas.width/2 - this.game.screen.images.sky1.width, this.game.screen.canvas.height - this.game.screen.images.sky1.height - 20, 1, 40, 0.3);
        }
        if (this.scale < 1.5 && !this.isChangeScale) {
            this.scale +=0.03;
        } else if (this.scale.toFixed(1) === '1.5') {
            this.isChangeScale =true;
        }
        if (this.isChangeScale && this.scale > 1 && this.textGameOverY >= this.game.screen.canvas.height/7 ) {
            this.scale -=0.02;
            this.textGameOverY -=10;
        }
        this.textGameOver.drawImageScale(this.game.screen.canvas.width/2, this.textGameOverY, this.scale)
        this.game.screen.drawSprite(this.player.view);
        super.render(time);
        if (this.isChangeScale && this.scale <=1 ) {
            if (!this.isShowModal) {
                this.game.screen.context.globalAlpha = 1;
                this.drawText();
            } else {
                this.game.screen.context.globalAlpha = this.opacity;
                this.showModalRetry();
            }
        }

    }
}
