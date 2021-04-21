import {Scene} from '../scene.js'
import {Player} from "../player";
import {SpriteSheet} from "../sprite-sheet";

export class GameOver extends Scene {
    constructor(game) {
        super(game)
        this.player = new Player(this.game.screen.height - 300);
        this.position = {
            x: this.game.screen.width,
            y: 0,
        };
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
        this.player.view = this.player.tile.getAnimation([1, 2, 3, 4], 300, false);
        this.player.x = this.game.screen.width / 2 - this.player.view.width / 2;
        this.player.y = this.game.screen.height - 60 - this.player.view.height;
        this.player.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
        this.player.view.run();
    }

    update(time) {
        this.player.update(time);
        if (this.position.x >= 0) {
            this.position.x -= 3;
        }
    }

    render(time) {
        this.update(time);
        this.game.screen.drawImageFullScreen(0, 0, 'bg5');
        this.game.screen.drawImage(0, 20, 'sky1');
        this.game.screen.drawImage(80, 100 + this.game.screen.images.sky1.height , 'cloudLogo');
        this.game.screen.drawImage(0 + this.game.screen.images.sky1.width + 80, 40 + this.game.screen.images.sky1.height , 'sky3');
        this.game.screen.drawImage(this.game.screen.canvas.width - this.game.screen.images.sky3.width, 20 + this.game.screen.images.sky1.height + this.game.screen.images.sky2.height, 'sky1');
        this.game.screen.drawImage(this.game.screen.canvas.width - this.game.screen.images.sky3.width - 80, 80 + this.game.screen.images.sky1.height * 2 + this.game.screen.images.sky2.height , 'sky3');
        this.game.screen.drawImage(0 - this.game.screen.images.sky1.width/2, this.game.screen.canvas.height - 20 - this.game.screen.images.sky1.height, 'sky1');
        this.game.screen.drawImage(this.game.screen.canvas.width/2 - this.game.screen.images.textGameOver.width/2, 100 , 'textGameOver');
        this.game.screen.printText(270, 250, 'Лама уснула');
        this.game.screen.printText(270, 270,  'и ты тоже засыпай!')
        this.game.screen.printText(270, 290, 'Встретимся завтра');
        this.game.screen.printText(270, 310, 'в этоже время!');
        this.game.screen.drawSprite(this.player.view);
        super.render(time)
    }
}
