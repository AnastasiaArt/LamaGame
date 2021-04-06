import { Scene } from '../scene.js'
import {SpriteSheet} from "../sprite-sheet.js";
import {Player} from "../player.js";
import {Obstacle} from "../obstacle";

export class Running extends Scene{
    constructor(game) {
        super(game);
        // this.character = new SpriteSheet({
        //     imageName: 'player',
        //     imageWidth: 240,
        //     imageHeight: 384,
        //     spriteWidth: 62,
        //     spriteHeight: 100
        // })
        // this.player = this.tiles.getSprite(3);
        this.tiles = new SpriteSheet({
            imageName: 'tiles',
            imageWidth: 640,
            imageHeight: 640
        });

        // this.player = this.character.getAnimation([1,2,3,4],150)
        // this.player.setXY(this.game.screen.width/4, this.game.screen.height - this.game.screen.height/1.7);
        this.position =  {
            x: this.game.screen.width,
            y: 0,
        };
        this.player = new Player(this.game.control);
        this.player.x = 250;
        this.player.y = 250;

        this.slime = new Obstacle({
            imageName:'slime',
            imageWidth: 50,
            gameWidth: this.game.screen.width,
        });
        this.slime.x = this.game.screen.width;
        this.slime.y = 300;
        this.plant = new Obstacle({
            imageName:'plant',
            gameWidth: this.game.screen.width,
        });
        this.plant.x = this.game.screen.width +  200;
        this.plant.y = 300;
    }

    init() {
        super.init();
        // если понадобится тайловая карта,
        this.map = this.game.screen.createMap("tiles", this.tiles);
    }

    update(time) {
        this.player.update(time);
        this.slime.update(time);
        this.plant.update(time);
    }

    render(time) {
        this.update(time);
        // если понадобится тайловая карта
        this.game.screen.drawSprite(this.map);
        // если фон будет картинкой
        // this.game.screen.drawImage(0,0, 'menu');
        this.position.x < (0 - (this.game.screen.width + 100)) ? this.position.x = this.game.screen.width : this.position.x -=1;
        this.game.screen.drawImage(this.position.x,0, 'sky');
        this.game.screen.drawSprite(this.player.view);
        this.game.screen.drawSprite(this.slime.view);
        this.game.screen.drawSprite(this.plant.view);
        super.render(time)
    }
}
