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
        this.game.screen.drawImage(this.position.x, 0, 'sky');
        this.game.screen.printText(250, 250, 'Game Over!!!!!!!!!!!!!!');
        this.game.screen.drawSprite(this.player.view);
        super.render(time)
    }
}
