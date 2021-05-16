import {Scene} from '../scene.js'
import {Player} from "../player";
import {SpriteSheet} from "../sprite-sheet";
import { Game } from "../game.js";
import {AnimateObject} from "@/js/animateObject";
import {Button} from "@/js/button";
import {Running} from "@/js/scenes/running";

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
        this.sky2 = null;
        this.sky3 = null;
        this.sky4 = null;
        this.logoCloud = null;
        this.textGameOver = null;
        this.lama = null;
        this.scale = 0;
        this.isChangeScale = false;
        this.textGameOverY = this.game.screen.canvas.height/2;
        this.btnRetry = null;
        this.isStartLevitation = false;
    }
    // тест при геймовере
    drawText() {
        // this.game.screen.drawScaleImage('textBg',this.game.screen.canvas.width/2 - 150, this.game.screen.canvas.height/2 - 300, 0, 0, 82, 108, 300, 300);
        this.game.screen.printText(this.game.screen.canvas.width/2 - 30, this.game.screen.canvas.height/2 - 280 + 100, 'Упс!');
        this.game.screen.printText(this.game.screen.canvas.width/2 - 90, this.game.screen.canvas.height/2 - 280 + 130,  'Лама заснула!')
        this.game.screen.printText(this.game.screen.canvas.width/2 - 110, this.game.screen.canvas.height/2 - 280 + 160, 'Встретимся завтра');
        this.game.screen.printText(this.game.screen.canvas.width/2 - 110, this.game.screen.canvas.height/2 - 280 + 190, 'или ещё поиграем?');
    }

    showModalRetry() {
        this.game.screen.drawScaleImage('textBg',this.game.screen.canvas.width/2 - 150, this.game.screen.canvas.height/2 - 300, 0, 0, 82, 108, 300, 340);
        this.game.screen.printText(this.game.screen.canvas.width/2 - 100, this.game.screen.canvas.height/2 - 300 + 120, 'Лучший результат:');
        this.game.screen.printText(this.game.screen.canvas.width/2 - 10, this.game.screen.canvas.height/2 - 300+ 160, this.game.count, '28px');
        this.game.screen.printText(this.game.screen.canvas.width/2 - 80, this.game.screen.canvas.height/2 - 300 + 200, 'Ваш результат:');
        this.game.screen.printText(this.game.screen.canvas.width/2 - 10, this.game.screen.canvas.height/2 - 300 + 240, this.game.count, '28px');
        this.game.screen.drawImage(this.game.screen.canvas.width/2 - this.game.screen.images.btnRetry.width - 10, this.game.screen.canvas.height/2 - 300 +  260, 'btnRetry');
        this.game.screen.drawImage(this.game.screen.canvas.width/2 + 10, this.game.screen.canvas.height/2 - 300 +  260 , 'btnStats');
        this.textGameOver.drawImageScale(this.game.screen.canvas.width/2, this.textGameOverY, this.scale)
    }

    init() {
        super.init();
        this.sky1 = new AnimateObject('sky1', this.game.screen.canvas.width, -20, 1, 0, this.game.screen.context, this.game.screen.images, 'left',this.game.screen.canvas.width - this.game.screen.images.sky1.width / 1.5);
        this.sky2 = new AnimateObject('sky3', this.game.screen.canvas.width, this.game.screen.images.sky1.height + 60 , 1, 0, this.game.screen.context, this.game.screen.images, 'left',  this.game.screen.canvas.width/2 + 100);
        this.sky3 = new AnimateObject('sky1', this.game.screen.canvas.width, this.game.screen.canvas.height - this.game.screen.images.sky1.height - 40, 1, 0, this.game.screen.context, this.game.screen.images, 'left', this.game.screen.canvas.width - this.game.screen.images.sky1.width/1.1);
        this.sky4 = new AnimateObject('sky2', this.game.screen.canvas.width, this.game.screen.canvas.height/2 + this.game.screen.images.sky2.height, 1, 0, this.game.screen.context, this.game.screen.images, 'left', this.game.screen.canvas.width/2 - this.game.screen.images.sky1.width);
        this.logoCloud = new AnimateObject('cloudLogo', this.game.screen.canvas.width, 70 + this.game.screen.images.sky1.height , 1, 0, this.game.screen.context, this.game.screen.images);
        this.lama = new AnimateObject('gameOverPlayer', this.game.screen.canvas.width / 2 - this.player.view.width/1.5, this.game.screen.canvas.height - this.player.view.height, 1, 0, this.game.screen.context, this.game.screen.images, 'right');
        this.textGameOver = new AnimateObject('textGameOver', this.game.screen.canvas.width/2, this.game.screen.canvas.height/7, 0, 0, this.game.screen.context, this.game.screen.images);

        setTimeout(()=> { this.isShowModal = true;}, 5000);
        this.btnRetry = new Button(this.game.screen.canvas.width/2 - this.game.screen.images.btnRetry.width - 10, this.game.screen.canvas.height/2 - 300 +  260, this.game.screen.images.btnRetry.width, this.game.screen.images.btnRetry.height);
        this.game.screen.canvas.addEventListener("mousedown",  (e) => {
            this.retry(e);
        }, false);
    }

    retry(e){
        if (this.btnRetry.checkCollision(e)) {
            this.game.currentScene = new Running(this.game);
            this.game.currentScene.init();
            this.game.screen.canvas.removeEventListener("mousedown",this.retry)
        }
    }

    update(time) {
        this.player.update(time);
        if (this.position.x >= 0) {
            this.position.x -= 3;
        }
        if (this.isShowModal && this.opacity <=1) {
            this.opacity += 0.01;
        }
    }

    renderClouds() {
        if(this.sky1.vector1.x >= this.sky1.endX && !this.sky1.isLevitation) {
            this.sky1.run()
        } else {
            this.sky1.levitation(this.sky1.endX, this.sky1.endY);
        }
        if(this.logoCloud.vector1.x >= 50 && !this.logoCloud.isLevitation) {
            this.logoCloud.run()
        } else {
            this.logoCloud.levitation(50, 70 + this.game.screen.images.sky1.height);
        }

        if(this.sky2.vector1.x >= this.sky2.endX && !this.sky2.isLevitation) {
            this.sky2.run()
        } else {
            this.sky2.levitation(this.sky2.endX, this.sky2.endY, 1, 20);
        }
        if(this.sky3.vector1.x >= this.sky3.endX && !this.sky3.isLevitation) {
            this.sky3.run()
        } else {
            this.sky3.levitation(this.sky3.endX, this.sky3.endY);
        }
        if(this.sky4.vector1.x >= this.sky4.endX && !this.sky4.isLevitation) {
            this.sky4.run()
        } else {
            this.sky4.levitation(this.sky4.endX, this.sky4.endY);
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
            this.textGameOverY -=15;
        }
        this.textGameOver.drawImageScale(this.game.screen.canvas.width/2, this.textGameOverY, this.scale);
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

    render(time) {
        this.game.screen.context.globalAlpha = 1;
        this.update(time);
        this.game.screen.drawImageFullScreen(0, 0, 'bg5');
        this.renderClouds();
        this.renderGameOverImg();

        this.player.view.onEnd = () => {
            this.isStartLevitation = true;
        }
        if(this.isStartLevitation) {
            this.lama.levitation(this.game.screen.canvas.width / 2 - this.player.view.width/1.5, this.game.screen.canvas.height - this.player.view.height, 1, 20, 0.3, 1000, 0, 336, 336, 336, 336)
        } else {
            this.game.screen.drawSprite(this.player.view);
        }
        super.render(time);
        this.renderGameOverModal();
    }
}
