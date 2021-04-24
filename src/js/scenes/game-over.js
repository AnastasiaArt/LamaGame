import {Scene} from '../scene.js'
import {Player} from "../player";
import {SpriteSheet} from "../sprite-sheet";

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
    }

    drawText() {
        this.game.screen.printText(280, this.game.screen.canvas.height/8 + 70, 'Лама уснула');
        this.game.screen.printText(240, this.game.screen.canvas.height/8 + 100,  'и ты тоже засыпай!')
        this.game.screen.printText(240, this.game.screen.canvas.height/8 + 130, 'Встретимся завтра');
        this.game.screen.printText(260, this.game.screen.canvas.height/8 + 160, 'в этоже время!');
    }

    showModalRetry() {
        this.game.screen.drawScaleImage('textBg',this.game.screen.canvas.width/2 - this.game.screen.canvas.width/6, this.game.screen.canvas.height/8 + 60, 0, 0, 82, 108, this.game.screen.canvas.width/3, this.game.screen.canvas.height/2 - 70);
        this.game.screen.printText(245, this.game.screen.canvas.height/8 + 130, 'Лучший результат:', '#000000');
        this.game.screen.printText(340, this.game.screen.canvas.height/8 + 160, this.game.count, '#000000');
        this.game.screen.printText(270, this.game.screen.canvas.height/8 + 190, 'Ваш результат:', '#000000');
        this.game.screen.printText(320, this.game.screen.canvas.height/8 + 220, this.game.count, '#000000');
        this.game.screen.drawScaleImage('btnRetry',340, this.game.screen.canvas.height/8 + 250, 0, 0, 102, 92, 50, 50);
        this.game.screen.printText(180, this.game.screen.canvas.height/8 + 400, 'Для старта игры нажмите enter', '#000000');
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
        setTimeout(()=> { this.isShowModal = true;}, 2000);
    }

    update(time) {
        this.player.update(time);
        if (this.position.x >= 0) {
            this.position.x -= 3;
        }
        if (this.isShowModal && this.opacity <=1) {
            this.opacity += 0.01;
        }
        if (this.game.control.enter) {
            this.finish(Scene.START_GAME)
        }
    }

    render(time) {
        this.update(time);
        this.game.screen.drawImageFullScreen(0, 0, 'bg5');
        this.game.screen.drawImage(this.game.screen.canvas.width - this.game.screen.images.sky1.width/1.5, -20, 'sky1');
        this.game.screen.drawScaleImage('cloudLogo',50, 70 + this.game.screen.images.sky1.height , 0,0, 251, 250, 200, 200);
        this.game.screen.drawImage(this.game.screen.canvas.width/2 + 60, this.game.screen.images.sky1.height + 60 , 'sky3');
        this.game.screen.drawImage(this.game.screen.canvas.width - this.game.screen.images.sky1.width/1.1, this.game.screen.canvas.height - this.game.screen.images.sky1.height - 40, 'sky1');
        this.game.screen.drawImage(this.game.screen.canvas.width/2 - this.game.screen.images.sky1.width, this.game.screen.canvas.height/2 + this.game.screen.images.sky2.height, 'sky2');
        this.game.screen.drawImage(this.game.screen.canvas.width/2 - this.game.screen.images.textGameOver.width/2, this.game.screen.canvas.height/8 , 'textGameOver');
        this.game.screen.drawSprite(this.player.view);
        super.render(time);
        if (!this.isShowModal) {
            this.game.screen.context.globalAlpha = 1;
            this.drawText();
        } else {
            this.game.screen.context.globalAlpha = 1 - this.opacity;
            if (this.opacity <= 1) {
                this.drawText();
            }
            this.game.screen.context.globalAlpha = this.opacity;
            this.showModalRetry();
        }
    }
}
