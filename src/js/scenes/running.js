import {Scene} from '../scene.js'
import {SpriteSheet} from "../sprite-sheet.js";
import {Player} from "../player.js";
import {Obstacle} from "../obstacle.js";
import {getRandomInt} from "../math.js";

export class Running extends Scene {
    constructor(game) {
        super(game);
        this.tiles = new SpriteSheet({
            imageName: 'tiles',
            imageWidth: 640,
            imageHeight: 640
        });

        this.position = {
            x: this.game.screen.width,
            y: 0,
        };
        this.player = new Player(this.game.control, this.game.screen.height - this.game.screen.height / 1.7);
        this.player.x = this.game.screen.width / 4;
        this.player.y = this.game.screen.height - this.game.screen.height / 1.7;
        this.duration = 200;
        this.obstacles = [];
        this.obstaclesName = ['plant', 'slime', 'plant1', 'slime1'];
        this.count = 0;
        this.hit = false;
        this.lastTime = 0;
        this.duration = getRandomInt(3000, 5000);
        this.hasDead = false;
    }

    init() {
        super.init();
        this.addNewObstacle();
        // если понадобится тайловая карта,
        this.map = this.game.screen.createMap("tiles", this.tiles);
    }


    addNewObstacle() {
        let obs = new Obstacle({imageName: this.obstaclesName[Math.floor(Math.random() * 4)]})
        obs.x = this.game.screen.width;
        obs.y = this.game.screen.height - this.game.screen.height / 2;
        this.obstacles.push(obs)
    }

    update(time) {
        this.player.update(time);
        if (this.lastTime === 0) {
            this.lastTime = time;
            return;
        }
        if (time - this.lastTime > this.duration) {
            this.addNewObstacle();
            this.lastTime = time;
            this.duration = getRandomInt(3000, 5000);
        }

        this.obstacles.forEach((i) => {
            this.hit = this.player.collide(i, this.obstacles, this.deadCount);
            if (i.dead) {
                const index = this.obstacles.indexOf(i);
                this.obstacles.splice(index, 1);
            }

            if (this.hit) {
                console.log("Вы врезались!");
                return;
            } else {
                if (Math.round(i.x) === this.player.x) {
                    this.count++
                }
                i.update(time)
            }
        })

        if (this.player.deadCount >= 5) {
            this.finish(Scene.GAME_OVER)
        }
    }

    render(time) {
        this.update(time);
        // если понадобится тайловая карта
        this.game.screen.drawSprite(this.map);
        // если фон будет картинкой
        // this.game.screen.drawImage(0,0, 'menu');
        this.position.x < (0 - (this.game.screen.width + 100)) ? this.position.x = this.game.screen.width : this.position.x -= 1;
        this.game.screen.drawImage(this.position.x, 0, 'sky');
        this.game.screen.drawSprite(this.player.view);
        this.obstacles.forEach((i) => {
            this.game.screen.drawSprite(i.view);
        })
        this.game.screen.printText(20, 50, this.count);
        this.game.screen.printText(60, 50, this.player.deadCount);
    }
}
