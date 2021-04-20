import {Scene} from '../scene.js'
import {SpriteSheet} from "../sprite-sheet.js";
import {Player} from "../player.js";
import {Obstacle} from "../obstacle.js";
import {getRandomInt} from "../math.js";
import {FlyElement} from "../flyElement";

export class Running extends Scene {
    constructor(game) {
        super(game);
        this.tiles = new SpriteSheet({
            imageName: 'tiles',
            imageWidth: this.game.width,
            imageHeight: this.game.height,
        });

        this.position = {
            x: this.game.screen.width,
            y: 0,
        };

        this.position1 = {
            x: 0,
            y: 0,
        };

        this.backgrounds = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5'];
        this.opacity = 0;
        this.startChange = false;
        this.backgroundsTree = ['tree1', 'tree2', 'tree3', 'tree4', 'tree5'];
        this.player = new Player(this.game.control, this.game.screen.height - 300);
        this.player.x = this.game.screen.width / 2 - this.player.view.width / 2 ;
        this.player.y = this.game.screen.height - 60 - this.player.view.height;
        this.duration = 200;
        this.obstacles = [];
        this.count = 0;
        this.hit = false;
        this.lastTime = 0;
        this.duration = getRandomInt(5000, 7000);
        this.bird = new FlyElement(200,'bird', 400, 100, 100, 100);
        this.bird.x = this.game.screen.canvas.width;
        this.bird.y = 200;
        this.mouse = new FlyElement(200,'mouse', 500, 100, 100, 100, true);
        this.mouse.x = this.game.screen.canvas.width;
        this.mouse.y = 200;
    }

    init() {
        super.init();
        this.addNewObstacle();
        this.player.view.x = this.game.screen.width / 2 - this.player.view.width / 2 ;
        this.player.view.x = this.game.screen.height - 60 - this.player.view.height;
    }

    addNewObstacle() {
        let obs = new Obstacle({index: getRandomInt(1, 36)})
        obs.x = this.game.screen.width;
        obs.view.x = this.game.screen.width;
        obs.y = this.game.screen.height - 60 - obs.view.height;
        obs.view.y = this.game.screen.height - 60 - obs.view.height;
        this.obstacles.push(obs)
    }

    update(time) {
        this.player.update(time);
        this.bird.update(time);
        this.mouse.update(time);
        if (this.lastTime === 0) {
            this.lastTime = time;
            return;
        }
        if (time - this.lastTime > this.duration) {
            this.addNewObstacle();
            this.lastTime = time;
            this.duration = getRandomInt(5000, 7000);
        }

        this.obstacles.forEach((i) => {
            this.hit = this.player.collide(i, this.obstacles, this.deadCount);
            if (i.dead) {
                const index = this.obstacles.indexOf(i);
                this.obstacles.splice(index, 1);
            }

            if (this.hit) {
                this.startChange = true;
                return;
            } else {
                if (Math.round(i.x) === this.player.x) {
                    this.count++
                }
                i.update(time)
            }
        })

        if (this.startChange) {
            if (this.opacity <= 1) {
                this.opacity += 0.01;
            } else if (this.backgrounds.length > 2) {
                this.backgrounds.shift();
                this.backgroundsTree.shift();
                this.startChange = false
                this.opacity = 0;
            }
        }
            if (this.player.deadCount >= 5) {
                this.finish(Scene.GAME_OVER)
        }
    }

    render(time) {
        this.update(time);
        // если понадобится тайловая карта
        // this.game.screen.drawSprite(this.map);
        // если фон будет картинкой

        this.game.screen.context.globalAlpha = 1 - this.opacity;
        this.game.screen.drawImageFullScreen(0, 0, this.backgrounds[0]);
        this.game.screen.context.globalAlpha = this.opacity;
        this.game.screen.drawImageFullScreen(0, 0, this.backgrounds[1]);
        if (this.player.deadCount >= 4) {
            this.game.screen.drawImage(this.game.screen.canvas.width /2, 100  , 'moon');
        }
        this.game.screen.context.globalAlpha = 1;
        if (this.player.deadCount <= 3) {
            this.game.screen.drawImage(this.game.screen.canvas.width / 2 - this.game.screen.images.sun.width / 2, this.game.screen.canvas.height - this.game.screen.images.sun.height / 1.5, 'sun');
        }
        this.game.screen.drawImage(this.position1.x, this.game.screen.canvas.height - 258, this.backgroundsTree[0]);
        this.game.screen.drawImage(this.position1.x, this.game.screen.canvas.height - 258, this.backgroundsTree[1]);

        if ( this.player.deadCount <= 2) {
            this.position.x < (0 - (this.game.screen.width + 100)) ? this.position.x = this.game.screen.canvas.width : this.position.x -= 1;
            this.game.screen.drawImage(this.position.x, 0, 'sky');
            this.game.screen.drawSprite(this.bird.view);
        } else if (this.player.deadCount >= 4) {
            this.game.screen.drawSprite(this.mouse.view);
        }
        this.game.screen.drawSprite(this.player.view);
        this.obstacles.forEach((i) => {
            this.game.screen.drawSprite(i.view);
        })
        this.game.screen.printText(20, 50, `Счет: ${this.count}`, '#000000');
        // this.game.screen.printText(60, 50, this.player.deadCount);
    }
}
