import { Scene } from '../scene.js'
import {SpriteSheet} from "../sprite-sheet.js";
import {Player} from "../player.js";
import {Obstacle} from "../obstacle.js";
import {getRandomInt} from "../math.js";

export class Running extends Scene{
    constructor(game) {
        super(game);
        this.tiles = new SpriteSheet({
            imageName: 'tiles',
            imageWidth: 640,
            imageHeight: 640
        });

        this.position =  {
            x: this.game.screen.width,
            y: 0,
        };
        this.player = new Player(this.game.control);
        this.player.x = this.game.screen.width/4;
        this.player.y = this.game.screen.height - this.game.screen.height/1.7;
        this.duration = 200;
        this.obstacles = {};
        this.obstaclesName = ['plant', 'slime', 'plant1', 'slime1'];
        this.DX = 0;
        this.obstaclesName.forEach(name => {
            this.DX += getRandomInt(250, 400)
            this.obstacles[name] = new Obstacle({imageName: name})
            this.obstacles[name].x = this.DX + this.game.screen.width;
            this.obstacles[name].y = this.game.screen.height - this.game.screen.height/2;
        })
    }

    init() {
        super.init();
        // если понадобится тайловая карта,
        this.map = this.game.screen.createMap("tiles", this.tiles);
        // for(let i in  this.obstacles.obstacles) {
        //     this.obstacles.obstacles[i].x = this.game.screen.width + this.getRandomInt(200, 400);
        //     this.obstacles.obstacles[i].y = this.game.screen.height - this.game.screen.height/1.7;
        //     this.obstacles.obstacles[i].view.x = this.game.screen.width + this.getRandomInt(200, 400);
        //     this.obstacles.obstacles[i].view.y = this.game.screen.height - this.game.screen.height/1.7;
        // }
    }

    update(time) {
        this.player.update(time);
        console.log(this.DX)
        for(let i in  this.obstacles) {
            if (this.obstacles.hasOwnProperty(i)) {
                this.obstacles[i].update(time, this.DX + this.game.screen.width + this.duration);
            }
        }
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
        for(let i in  this.obstacles) {
            this.game.screen.drawSprite(this.obstacles[i].view);
        }
    }
}
