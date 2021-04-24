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
        this.isCollide = false;
        this.backgroundsTree = ['tree1', 'tree2', 'tree3', 'tree4', 'tree5'];
        this.player = new Player(this.game.control, this.game.screen.height - 300);
        this.player.x = this.game.screen.width / 2 - this.player.view.width ;
        this.player.y = this.game.screen.height - 60 - this.player.view.height;
        this.duration = 200;
        this.obstacles = [];
        this.count = 0;
        this.hit = false;
        this.lastTime = 0;
        this.duration = getRandomInt(4000, 6000);
        this.bird = new FlyElement(200,'bird', 400, 100, 100, 100);
        this.bird.x = this.game.screen.canvas.width;
        this.bird.y = 200;
        this.mouse = new FlyElement(200,'mouse', 500, 100, 100, 100, true);
        this.mouse.x = this.game.screen.canvas.width;
        this.mouse.y = 200;
        this.collideText = ['collideText1', 'collideText2', 'collideText3', 'collideText4'];
        this.countText = ['countText1', 'countText2', 'countText3', 'countText4'];
        this.imgText = 'collideText1';
        this.isAddCount = false;
        this.lastTimeCountText = 0;
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

    collide(time) {
        this.isCollide = true;
        if(this.player.deadCount + 1 < 4) {
            this.imgText = this.collideText[Math.floor(Math.random() * 4)];
        } else if(this.player.deadCount + 1 === 4){
            this.imgText = 'sleepText';
        } else {
            this.isCollide = false;
            this.imgText = 'sleepText';
        }
        this.lastTimeCountText = time;
    }

    addCount(time) {
        this.count++;
        this.imgText = this.countText[Math.floor(Math.random() * 4)];
        this.isAddCount = true;
        this.lastTimeCountText = time;
    }

    update(time) {
        this.player.update(time);
        this.bird.update(time);
        this.mouse.update(time);
        if (this.lastTime === 0) {
            this.lastTime = time;
            return;
        }
        if (this.lastTimeCountText === 0) {
            this.lastTimeCountText = time;
            return;
        }

        if (time - this.lastTime > this.duration) {
            // добавить проверку у обсталес из нот стопед
            this.addNewObstacle();
            this.lastTime = time;
            this.duration = getRandomInt(4000, 6000);
        }

        this.obstacles.forEach((i) => {
            this.hit = this.player.collide(i, this.obstacles, this.deadCount);
            if (i.dead) {
                const index = this.obstacles.indexOf(i);
                this.obstacles.splice(index, 1);
            }

            if (this.hit) {
                this.collide(time);
                return;
            } else {
                if (Math.round(i.x) === this.player.x) {
                   this.addCount(time);
                }
                i.update(time)
            }
        })

        if (this.isCollide) {
            if (this.opacity <= 1) {
                this.opacity += 0.01;
            } else if (this.backgrounds.length > 2) {
                this.backgrounds.shift();
                this.backgroundsTree.shift();
                this.isCollide = false
                this.opacity = 0;
            } else {
                this.isCollide = false;
            }
        }
        if (this.player.deadCount >= 5) {
            this.game.count = this.count;
            this.finish(Scene.GAME_OVER)
        }

        if (time - this.lastTimeCountText > 1400) {
            this.isAddCount = false;
        }
    }

    render(time) {
        this.update(time);
        //  плавная смена фона
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
        if (this.player.deadCount <= 2) {
            this.game.screen.drawImage(this.position.x, 20, 'sky1');
            this.game.screen.drawImage(this.position.x - 20 , 40 + this.game.screen.images.sky1.height , 'sky2');
            this.game.screen.drawImage(this.position.x + this.game.screen.images.sky1.width + 80, 10 + this.game.screen.images.sky1.height , 'sky3');
            this.position.x < 0 - this.game.screen.images.sky1.width - this.game.screen.images.sky2.width - this.game.screen.images.sky3.width - 160 ? this.position.x = this.game.screen.canvas.width : this.position.x -= 1;
            this.game.screen.drawSprite(this.bird.view);

        } else if (this.player.deadCount >= 4) {
            this.game.screen.drawSprite(this.mouse.view);
        }
        this.game.screen.drawSprite(this.player.view);
        this.obstacles.forEach((i) => {
            this.game.screen.drawSprite(i.view);
        })
        this.game.screen.printText(20, 50, `Счет: ${this.count}`, '#000000');
        if (this.isAddCount || this.isCollide) {
            this.game.screen.drawImage(this.game.screen.canvas.width / 2 - this.game.screen.images[this.imgText].width/ 2, this.game.screen.canvas.height/3, this.imgText)
        }
    }
}
