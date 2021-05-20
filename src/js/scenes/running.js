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
            x: this.game.screen.canvas.width,
            y: 0,
        };

        this.position1 = {
            x: 0,
            y: 0,
        };

        this.positionText = {
            x: this.game.screen.canvas.width,
            y: 0,
        };
        this.positionGround = {
            x: 0,
            y:  this.game.screen.canvas.height
        }
        this.positionGround1 = {
            x: 0,
            y:  this.game.screen.canvas.height
        }
        this.positionTree = {
                x: 0,
                y:  this.game.screen.canvas.height
        }
        this.positionTree1 = {
            x: 0,
            y:  this.game.screen.canvas.height
        }
        this.positionMoon = {
            x: this.game.screen.canvas.width,
            y: this.game.screen.canvas.height/2,
        };

        this.backgrounds = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5'];
        this.opacity = 0;
        this.isCollide = false;
        this.backgroundsTree = ['tree1', 'tree2', 'tree3', 'tree4', 'tree5'];
        this.duration = 200;
        this.obstacles = [];
        this.count = 0;
        this.hit = false;
        this.lastTime = 0;
        this.duration = 5000;
        this.bird = new FlyElement(this.game.screen.canvas.width,200,'bird', 400, 100, 100, 100);
        this.bird.x = this.game.screen.canvas.width;
        this.bird.y = 200;
        this.mouse = new FlyElement(this.game.screen.canvas.width,200,'mouse', 500, 100, 100, 100, true);
        this.mouse.x = 0;
        this.mouse.y = 200;
        this.collideText = ['collideText1', 'collideText2', 'collideText3', 'collideText4'];
        this.countText = ['countText1', 'countText2', 'countText3', 'countText4'];
        this.imgText = 'collideText1';
        this.isAddCount = false;
        this.lastTimeCountText = 0;
        this.sunHeight = this.game.screen.canvas.height;
        this.isSunRays = false;
        this.crashAudios = ['crash1', 'crash2'];
        this.player = new Player(this.game.control);
        this.player.x = this.game.screen.canvas.width / 2 - this.player.view.width;
        this.startPosXCountText = innerWidth > 700 ? 20 : (700 - innerWidth) /2 + 20;
    }

    init() {
        super.init();
        this.addNewObstacle();
        this.game.isRetry = false;
        this.player.deadCount = 0;
        if (!this.game.isMute) {
            this.player.jumpAudio = this.game.screen.audios.jump;
        }
        this.player.view.x = this.game.screen.canvas.width / 2 - this.player.view.width;
        this.player.view.y = this.game.screen.canvas.height - this.game.screen.images.ground.height/2 - this.player.view.height;
        this.player.y = this.game.screen.canvas.height - this.game.screen.images.ground.height/2 - this.player.view.height;
        this.player.startPosY = this.game.screen.canvas.height - this.game.screen.images.ground.height/2 - this.player.view.height;
        this.bird.view.x = this.game.screen.canvas.width;
        this.bird.view.y = 200;
        this.mouse.view.x = 0;
        this.mouse.view.y = 200;
        this.positionGround.y =  this.game.screen.canvas.height - this.game.screen.images.ground.height;
        this.positionGround1.y =  this.game.screen.canvas.height - this.game.screen.images.ground.height;
        this.positionGround1.x =  this.game.screen.images.ground.width;
        this.positionTree1.x = this.game.screen.images[this.backgroundsTree[0]].width;
        this.positionTree.y = this.game.screen.canvas.height - this.game.screen.images.tree1.height;
        this.positionTree1.y = this.game.screen.canvas.height - this.game.screen.images.tree1.height;
    }

    addNewObstacle() {
        let obs = new Obstacle({index: getRandomInt(1, 36)})
        obs.x = this.game.screen.canvas.width;
        obs.view.x = this.game.screen.canvas.width;
        obs.y = this.game.screen.canvas.height - this.game.screen.images.ground.height/2 - obs.view.height;
        obs.view.y = this.game.screen.canvas.height - this.game.screen.images.ground.height/2 -  obs.view.height;
        this.obstacles.push(obs)
    }

    collide(time) {
        const audio = this.crashAudios[Math.floor(Math.random() * 2)];
        this.game.screen.audios[audio].play();

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
        if (this.player.deadCount >= 4) {
            this.mouse.update(time);
        }
        if (this.lastTime === 0) {
            this.lastTime = time;
            return;
        }
        if (this.lastTimeCountText === 0) {
            this.lastTimeCountText = time;
            return;
        }
        // добавление нового препятсвия, через время не меньше времени duration
        if (time - this.lastTime > this.duration) {
            // добавить проверку у обсталес из нот стопед
            this.addNewObstacle();
            this.lastTime = time;
            this.duration = getRandomInt(1200, 4500);
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
                if (i.dead && !i.isCrash) {
                   this.addCount(time);
                }
                i.update(time)
            }
        })
        // при столкновении меняем фон и деревья
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

    renderClouds() {
        this.game.screen.drawScaleImage('sky1', this.position.x, 20, 0,0, 301, 181, 180, 100 );
        this.game.screen.drawScaleImage('sky2',this.position.x - 20, this.game.screen.images.sky1.height, 0,0, 225, 120, 150, 80);
        this.game.screen.drawScaleImage( 'sky3',this.position.x - 20 + this.game.screen.images.sky1.width, this.game.screen.images.sky1.height - 40, 0,0, 177, 100, 142, 80);
        this.position.x < 0 - this.game.screen.images.sky1.width - this.game.screen.images.sky2.width - this.game.screen.images.sky3.width - 160 ? this.position.x = this.game.screen.canvas.width : this.position.x -= 2;
    }

    renderMoon() {
        if (this.player.deadCount >= 4) {
            if (this.positionMoon.x > this.game.screen.canvas.width / 2 + 40) {
                this.positionMoon.x -=1;
            }
            if (this.positionMoon.y > 50) {
                this.positionMoon.y -=1;
            }
            this.game.screen.drawImage(this.positionMoon.x , this.positionMoon.y , 'moon');
        }
    }

    renderSun(time) {
        if (this.player.deadCount <= 5) {
            if (this.player.deadCount === 3 &&  this.sunHeight < this.game.screen.canvas.height + 100) {
                this.sunHeight += 1;
                this.isSunRays= true;
            }
            if (this.player.deadCount >= 4 &&  this.sunHeight < 1200) {
                this.sunHeight += 1;
            }

            this.isSunRays ?
                this.game.screen.drawImageRotated('sunBlur', this.game.screen.canvas.width / 2, this.sunHeight, this.game.screen.changeScale('1.000', '0.800', 0.002), time / 9000) :
                this.game.screen.drawImageRotated('sun', this.game.screen.canvas.width / 2, this.sunHeight, this.game.screen.changeScale('1.000', '0.800', 0.002), time / 9000);
        }
    }

    renderCountCloudText() {
        if (this.isAddCount || this.isCollide) {
            if (this.positionText.x >= this.game.screen.canvas.width/2 ) {
                this.positionText.x -= 10;
            }
            this.game.screen.drawImage(this.positionText.x - this.game.screen.images.cloudText.width/ 2,this.game.screen.canvas.height/4 - this.game.screen.images.cloudText.height/2, 'cloudText')
            this.game.screen.drawImage(this.positionText.x - this.game.screen.images[this.imgText].width/ 2, this.game.screen.canvas.height/4 - this.game.screen.images[this.imgText].height/2, this.imgText)
        } else {
            this.positionText.x = this.game.screen.canvas.width;
        }
    }

    render(time) {
        this.update(time);
         // плавная смена фона
        this.game.screen.context.globalAlpha = 1 - this.opacity;
        this.game.screen.drawImageFullScreen(0, 0, this.backgrounds[0]);
        this.game.screen.context.globalAlpha = this.opacity;
        this.game.screen.drawImageFullScreen(0, 0, this.backgrounds[1]);

        this.game.screen.context.globalAlpha = 1;
        this.renderMoon();
        this.renderSun(time);

        // плавная смена деревьев
        this.game.screen.context.globalAlpha = 1 - this.opacity;
        this.game.screen.drawImage(this.positionTree.x, this.positionTree.y, this.backgroundsTree[0]);
        this.game.screen.drawImage(this.positionTree1.x, this.positionTree1.y, this.backgroundsTree[0]);
        this.game.screen.context.globalAlpha = this.opacity;
        this.game.screen.drawImage(this.positionTree.x, this.positionTree.y, this.backgroundsTree[1]);
        this.game.screen.drawImage(this.positionTree1.x, this.positionTree1.y, this.backgroundsTree[1]);
        // теперь проверим, не ушел ли объект фона «за кадр»
        if (this.positionTree.x + this.game.screen.images[this.backgroundsTree[1]].width < 0) { // если ушел
            this.positionTree.x = this.positionTree1.x + this.game.screen.images[this.backgroundsTree[1]].width; // перемещаем его сразу за вторым
        }
        // аналогично для второго
        if (this.positionTree1.x + this.game.screen.images[this.backgroundsTree[1]].width < 0) { // если ушел
            this.positionTree1.x = this.positionTree.x + this.game.screen.images[this.backgroundsTree[1]].width; // перемещаем его сразу за вторым
        }

        this.game.screen.context.globalAlpha = 1;
        this.game.screen.drawImage(this.positionGround.x, this.positionGround.y, 'ground');
        this.game.screen.drawImage(this.positionGround1.x , this.positionGround.y, 'ground');
        if (!this.isCollide) {
            this.positionGround.x -= 2;
            this.positionGround1.x -= 2;
            this.positionTree.x -=1;
            this.positionTree1.x -=1;
            // теперь проверим, не ушел ли объект фона «за кадр»
            if (this.positionGround.x + this.game.screen.images.ground.width < 0) { // если ушел
                this.positionGround.x = this.positionGround1.x + this.game.screen.images.ground.width; // перемещаем его сразу за вторым
            }

            // аналогично для второго
            if (this.positionGround1.x + this.game.screen.images.ground.width < 0) {
                this.positionGround1.x = this.positionGround.x + this.game.screen.images.ground.width; // позиционируем за первым
            }
        }

        // отрисовка элементов неба(облака, птичка, мышь)
        if (this.player.deadCount <= 2) {
            this.renderClouds();
            this.game.screen.drawSprite(this.bird.view)
        } else if (this.player.deadCount >= 4) {
            this.game.screen.drawSprite(this.mouse.view);
        }

        // отрисовка розовых облаков с текстом при столкновении или удачном перепрыгивании
        this.renderCountCloudText();

        this.game.screen.drawSprite(this.player.view);

        // отрисовка препятсвий
        this.obstacles.forEach((i) => {
            this.game.screen.drawSprite(i.view);
        })
        this.game.screen.drawImage( this.startPosXCountText, 20, 'textCount');
        this.game.screen.printText(this.startPosXCountText + this.game.screen.images.textCount.width + 20, this.game.screen.images.textCount.height + 12, this.count, '24px');
    }
}
