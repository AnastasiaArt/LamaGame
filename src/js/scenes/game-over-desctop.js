import {Scene} from '../scene.js'
import {Player} from "../player";
import {SpriteSheet} from "../sprite-sheet";
import {AnimateObject} from "@/js/animateObject";
import {Running} from "@/js/scenes/running";
import {FlyElement} from "@/js/flyElement";
import {addCount, getCount} from "@/js/index"

export class GameOver extends Scene {
    constructor(game) {
        super(game)
        this.isShowModal = false;
        this.player = new Player(this.game.screen.canvas.height - 300);
        this.player.tile = new SpriteSheet({
            imageName: 'gameOverPlayer',
            imageWidth: 1341,
            imageHeight: 336,
            spriteWidth: 336,
            spriteHeight: 336
        });
        this.player.view = this.player.tile.getAnimation([1, 2, 3, 4], 150, false);
        this.player.x = this.game.screen.canvas.width / 2 - this.player.view.width/1.5;
        this.player.y = this.game.screen.canvas.height - this.player.view.height;
        this.player.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
        this.player.view.run();
        this.position = {
            x: this.game.screen.canvas.width,
            y: 0,
        };
        this.opacity = 0;
        this.sky1 = null;
        this.sky2 = new AnimateObject('sky1', this.game.screen.canvas.width, 0);
        this.sky3 = null;
        this.sky5 = null;
        this.logoCloud = null;
        this.textGameOver = null;
        this.lama = null;
        this.scale = 0;
        this.isChangeScale = false;
        this.textGameOverY = this.game.screen.canvas.height/2;
        this.isStartLevitation = false;
        this.isShowModal = false;
        this.modalGameOver = document.getElementById('modal-game-over');
        this.modalGameOverText = document.getElementById('modal-text-game-over');
        this.modalGameOverBtns = document.getElementById('modal-game-over__btns');
        this.bestCount=0;
        // this.bird = new FlyElement(this.game.screen.canvas.width/2,0,'bird', 400, 100, 100, 100);
        // this.bird.y = this.game.screen.canvas.height/2;
        // this.mouse = new FlyElement(this.game.screen.canvas.width,200,'mouse', 500, 100, 100, 100, true);
        // this.mouse.x = this.game.screen.canvas.width/2;
        // this.bird.startFly = this.game.screen.canvas.width/2;
        // this.mouse.startWaveFly =  this.game.screen.canvas.width/2;
    }

    // тест при геймовере
    drawText() {
        this.modalGameOver.style.display = "block";
        this.modalGameOverText.innerHTML = 'Упс! <br> Лама заснула! <br> Встретимся завтра <br> или ещё поиграем?';
    }

    showModalRetry() {
        this.modalGameOverBtns.style.display = "flex";
        this.modalGameOver.style.display = "block";
        this.modalGameOverText.innerHTML = 'Лучший результат: <br>' + this.bestCount + '<br> Ваш результат: <br>' + this.game.count;
        console.log('12222222222222222')
        if (this.game.count > this.bestCount) {
            addCount(this.game.count);
        }
    }

    init() {
        super.init();
        this.bestCount = getCount();
        this.modalGameOverBtns.style.display = "none";
        this.sky1 = new AnimateObject('sky2', this.game.screen.canvas.width, this.game.screen.canvas.height/2, 1, 0, this.game.screen.context, this.game.screen.images, 'left', this.game.screen.canvas.width/2 - 470);
        this.sky5 = new AnimateObject('sky3', this.game.screen.canvas.width, 50, 1, 0, this.game.screen.context, this.game.screen.images, 'left',  this.game.screen.canvas.width/2 - 50);
        this.logo =  new AnimateObject('logo', this.game.screen.canvas.width/2, this.game.screen.canvas.height/2, 1, 0, this.game.screen.context, this.game.screen.images);
        this.sky3 = new AnimateObject('sky2', this.game.screen.canvas.width, this.game.screen.images.sky1.height/1.5, 1, 0, this.game.screen.context, this.game.screen.images, 'left', this.game.screen.canvas.width - 100);
        this.skyBig = new AnimateObject('skyBig', -50, this.game.screen.canvas.height - 150, 1, 0, this.game.screen.context, this.game.screen.images, 'right', -50);
        this.skyBig2 = new AnimateObject('skyBig', this.game.screen.canvas.width-250, this.game.screen.canvas.height - 150, 1, 0, this.game.screen.context, this.game.screen.images, 'left', this.game.screen.canvas.width/2 - 150);
        this.obstacle1 = new AnimateObject('obstacles', this.game.screen.canvas.width/2 + 50, 0, 1, 0, this.game.screen.context, this.game.screen.images, 'down', this.game.screen.canvas.width/2 + 50, this.game.screen.canvas.height/1.5);
        this.obstacle2 = new AnimateObject('obstacles', 20, 0, 1, 0, this.game.screen.context, this.game.screen.images, 'down', 20, this.game.screen.canvas.height/3);
        this.obstacle3 = new AnimateObject('obstacles', 40, 0, 1, 0, this.game.screen.context, this.game.screen.images, 'down', 40, this.game.screen.canvas.height/1.5);
        this.obstacle4 = new AnimateObject('obstacles', this.game.screen.canvas.width/2 + 90, 0, 1, 0, this.game.screen.context, this.game.screen.images, 'down', this.game.screen.canvas.width/2 + 90, this.game.screen.canvas.height/1.2);
        this.obstacle5 = new AnimateObject('obstacles', this.game.screen.canvas.width/2 + 150, 0, 1, 0, this.game.screen.context, this.game.screen.images, 'down', this.game.screen.canvas.width/2 + 150,this.game.screen.canvas.height/3.3);
        this.obstacle6 = new AnimateObject('obstacles', this.game.screen.canvas.width/2 + 80, 0, 1, 0, this.game.screen.context, this.game.screen.images, 'down', this.game.screen.canvas.width/2 + 80, 30);
        this.obstacle7 = new AnimateObject('obstacles', this.game.screen.images.sky1.width - 70, 0, 1, 0, this.game.screen.context, this.game.screen.images, 'down', this.game.screen.images.sky1.width - 70);
        this.lama = new AnimateObject('menuLama', -400, this.game.screen.canvas.height - this.game.screen.images.menuLama.height/1.5, 1, 0, this.game.screen.context, this.game.screen.images, 'right', -150, );
        this.lamaSleep = new AnimateObject('menuLamaSleep', this.game.screen.canvas.width , this.game.screen.canvas.height - this.game.screen.images.menuLamaSleep.height/1.5, 1, 0, this.game.screen.context, this.game.screen.images, 'left', this.game.screen.canvas.width - 250);

        this.textGameOver = new AnimateObject('textGameOver', this.game.screen.canvas.width/2, this.game.screen.canvas.height/7, 0, 0, this.game.screen.context, this.game.screen.images);

        setTimeout(()=> { this.isShowModal = true;}, 5000);
    }

    retry(){
            this.modalGameOverBtns.style.display = "none";
            this.modalGameOver.style.display = "none";
            this.isShowModal = false;
            this.game.currentScene = new Running(this.game);
            this.game.currentScene.init();
            this.game.screen.canvas.removeEventListener("mousedown",this.retry)
    }

    update(time) {
        // this.bird.update(time);
        // this.mouse.update(time);
        if(Object.keys(this.sky2.images).length <=0) {
            this.sky2.images = this.game.screen.images;
            this.sky2.context = this.game.screen.context;
        }
        if (this.position.x >= 0) {
            this.position.x -= 3;
        }
        if (this.isShowModal && this.opacity <=1) {
            this.opacity += 0.01;
        }
    }

    renderClouds() {
        if(this.sky2.vector1.x >= -150 && !this.sky2.isLevitation || this.isStopAnimation) {
            this.sky2.run()
        } else {
            this.sky2.levitation(-150, 0);
        }
        if(this.sky1.vector1.x >= this.sky1.endX && !this.sky1.isLevitation || this.isStopAnimation) {
            this.sky1.run()
        } else {
            this.sky1.levitation(this.sky1.endX, this.sky1.endY);
        }
        if(this.sky3.vector1.x > this.sky3.endX && !this.sky3.isLevitation || this.isStopAnimation ) {
            this.sky3.run()
        } else {
            this.sky3.levitation(this.sky3.endX , this.sky3.endY);
        }
        if(this.sky5.vector1.x > this.sky5.endX && !this.sky5.isLevitation || this.isStopAnimation ) {
            this.sky5.run()
        } else {
            this.sky5.levitation(this.sky5.endX , this.sky5.endY);
        }
    }

    renderGameOverImg() {
        if (this.scale < 1.5 && !this.isChangeScale) {
            this.scale +=0.03;
        } else if (this.scale.toFixed(1) === '1.5') {
            this.isChangeScale =true;
        }

        if (this.isChangeScale && this.scale > 1.2 && this.textGameOverY >= this.game.screen.canvas.height/7 ) {
            this.scale -=0.02;
            this.textGameOverY -=14;
        } else {
            this.game.screen.images.textGameOver.width -=30;
            this.game.screen.images.textGameOver.height -=10;
        }
            this.textGameOver.drawImageScale(this.game.screen.canvas.width / 2, this.textGameOverY, this.scale,this.game.screen.images.textGameOver.width, this.game.screen.images.textGameOver.height);
    }

    renderGameOverModal() {
        if (this.isChangeScale && this.scale <=1.2 ) {
            if (!this.isShowModal) {
                this.game.screen.context.globalAlpha = 1;
                this.drawText();
            } else {
                this.game.screen.context.globalAlpha = this.opacity;
                this.showModalRetry();
            }
        }
    }
    renderLama() {
        if(this.lama.vector1.x <= this.lama.endX && !this.lama.isLevitation || this.isStopAnimation) {
            this.lama.run()
        } else {
            this.lama.levitation(this.lama.endX, this.lama.endY)
        }
        if(this.lamaSleep.vector1.x >= this.lamaSleep.endX && !this.lamaSleep.isLevitation || this.isStopAnimation) {
            this.lamaSleep.run()
        } else {
            this.lamaSleep.levitation(this.lamaSleep.endX, this.lamaSleep.endY, 1, 30)
        }
    }
    renderFrontObstacles() {
        if(this.obstacle2.vector1.y <= this.obstacle2.endY && !this.obstacle2.isRotation || this.isStopAnimation) {
            this.obstacle2.runSprite(320, 320)
        } else {
            this.obstacle2.drawImageSpriteRotated(this.obstacle2.endX, this.obstacle2.endY, 0, -2, 0.005, 320, 320)
        }
        if(this.obstacle3.vector1.y <= this.obstacle3.endY && !this.obstacle3.isRotation || this.isStopAnimation) {
            this.obstacle3.runSprite(320, 400)
        } else {
            this.obstacle3.drawImageSpriteRotated(this.obstacle3.endX, this.obstacle3.endY, 0, -2, 0.005, 320, 400)
        }
        if(this.obstacle4.vector1.y <= this.obstacle4.endY && !this.obstacle4.isRotation || this.isStopAnimation) {
            this.obstacle4.runSprite(80, 400)
        } else {
            this.obstacle4.drawImageSpriteRotated(this.obstacle4.endX, this.obstacle4.endY, 0, -2, 0.005, 80, 400)
        }
        if(this.obstacle5.vector1.y <= this.obstacle5.endY && !this.obstacle5.isRotation || this.isStopAnimation) {
            this.obstacle5.runSprite(240, 400)
        } else {
            this.obstacle5.drawImageSpriteRotated(this.obstacle5.endX, this.obstacle5.endY, 0, -2, 0.005, 240, 400)
        }
        if(this.obstacle6.vector1.y <= this.obstacle6.endY && !this.obstacle6.isRotation || this.isStopAnimation) {
            this.obstacle6.runSprite(160, 400)
        } else {
            this.obstacle6.drawImageSpriteRotated(this.obstacle6.endX, this.obstacle6.endY, 0, -2, 0.002, 160, 400)
        }
    }

    render(time) {
        this.game.screen.context.globalAlpha = 1;
        this.update(time);
        this.game.screen.drawImageFullScreen(0, 0, 'bgMenu');
        this.renderClouds();
        this.renderGameOverImg();
        this.skyBig.levitation(this.skyBig.endX, this.skyBig.endY,1,40,0.3,0,0,600,340,400,240);
        this.skyBig2.levitation(this.skyBig2.endX, this.skyBig2.endY,1,40,0.3,0,0,600,340,400,240);
        this.renderFrontObstacles();
        // this.game.screen.drawSprite(this.bird.view);
        // this.game.screen.drawSprite(this.mouse.view);
        this.renderLama();
        super.render(time);
        this.renderGameOverModal();
    }
}
