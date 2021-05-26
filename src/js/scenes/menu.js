import {Scene} from '../scene.js';
import {Button} from '../button.js'
import {AnimateObject} from "@/js/animateObject";

export class Menu extends Scene {
    constructor(game) {
        super(game)
        this.sky1 = null;
        this.sky2 = new AnimateObject('sky1', this.game.screen.canvas.width, 0);
        this.sky3 = null;
        this.sky4 = null;
        this.logo = null;
        this.logoCloud = null;
        this.obstacle1 = null;
        this.obstacle2 = null;
        this.obstacle3 = null;
        this.obstacle4 = null;
        this.obstacle5 = null;
        this.obstacle6 = null;
        this.obstacle7 = null;
        this.lama = null;
        this.isStopAnimation = false;
        this.scale = 0;
        this.btnStart = null;
        this.isShowBtn = false;
        this.startBtn = document.getElementById('start-btn');
        this.muteBtn = document.getElementById('mute-btn');
    }

    init() {
        super.init();
        this.startBtn.style.display = "block";
        this.muteBtn.style.display = "block";
        this.sky1 = new AnimateObject('sky2', this.game.screen.canvas.width, this.game.screen.canvas.height/2, 1, 0, this.game.screen.context, this.game.screen.images, 'left', 50);
        this.logo =  new AnimateObject('logo', this.game.screen.canvas.width/2, this.game.screen.canvas.height/3, 1, 0, this.game.screen.context, this.game.screen.images);
        this.sky3 = new AnimateObject('sky3', this.game.screen.canvas.width, this.game.screen.images.sky1.height, 1, 0, this.game.screen.context, this.game.screen.images, 'left', this.game.screen.canvas.width - this.game.screen.images.sky1.width/2);
        this.sky4 = new AnimateObject('sky1', this.game.screen.canvas.width,  this.game.screen.canvas.height - this.game.screen.images.sky1.height/2 , 1, 0, this.game.screen.context, this.game.screen.images, 'left', this.game.screen.canvas.width - this.game.screen.images.sky1.width);
        this.logoCloud = new AnimateObject('cloudLogo', this.game.screen.canvas.width, this.game.screen.canvas.height/2 , 1, 0, this.game.screen.context, this.game.screen.images, 'left', this.game.screen.canvas.width - this.game.screen.images.cloudLogo.width);
        this.obstacle1 = new AnimateObject('obstacles', this.game.screen.canvas.width/2 + 50, 0, 1, 0, this.game.screen.context, this.game.screen.images, 'down', this.game.screen.canvas.width/2 + 50, this.game.screen.canvas.height/1.5);
        this.obstacle2 = new AnimateObject('obstacles', 20, 0, 1, 0, this.game.screen.context, this.game.screen.images, 'down', 20, this.game.screen.canvas.height/3);
        this.obstacle3 = new AnimateObject('obstacles', 40, 0, 1, 0, this.game.screen.context, this.game.screen.images, 'down', 40, this.game.screen.canvas.height/1.5);
        this.obstacle4 = new AnimateObject('obstacles', this.game.screen.canvas.width/2 + 90, 0, 1, 0, this.game.screen.context, this.game.screen.images, 'down', this.game.screen.canvas.width/2 + 90, this.game.screen.canvas.height/1.2);
        this.obstacle5 = new AnimateObject('obstacles', this.game.screen.canvas.width/2 + 150, 0, 1, 0, this.game.screen.context, this.game.screen.images, 'down', this.game.screen.canvas.width/2 + 150,this.game.screen.canvas.height/3.3);
        this.obstacle6 = new AnimateObject('obstacles', this.game.screen.canvas.width/2 + 80, 0, 1, 0, this.game.screen.context, this.game.screen.images, 'down', this.game.screen.canvas.width/2 + 80, 30);
        this.obstacle7 = new AnimateObject('obstacles', this.game.screen.images.sky1.width - 70, 0, 1, 0, this.game.screen.context, this.game.screen.images, 'down', this.game.screen.images.sky1.width - 70);
        this.lama = new AnimateObject('menuLama', 0, this.game.screen.canvas.height - this.game.screen.images.menuLama.height/1.2, 1, 0, this.game.screen.context, this.game.screen.images, 'right', this.game.screen.canvas.width/6, );
        if (!this.game.isMute) {
            this.game.screen.audios.intro.play();
        }
        this.game.screen.audios.intro.volume = 0.8;
        this.game.screen.audios.intro.loop = true;
    }

    startGame() {
        if (!this.game.isMute) {
            this.game.screen.audios.start.play();
        }
            this.isStopAnimation = true;
    }

    update(time) {
        this.game.screen.audios.intro.muted = false;
        if(Object.keys(this.sky2.images).length <=0) {
            this.sky2.images = this.game.screen.images;
            this.sky2.context = this.game.screen.context;
        }

        if (this.obstacle7.vector1.y > this.game.screen.canvas.height && this.sky4.vector1.x < 0 && this.isStopAnimation ) {
            this.startBtn.style.display = "none";
            this.finish(Scene.PRE_START)
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

    renderLama() {
        if(this.lama.vector1.x <= this.lama.endX && !this.sky4.isLevitation || this.isStopAnimation) {
            this.lama.run()
        } else {
            this.lama.levitation(this.lama.endX, this.lama.endY)
        }
    }

    renderLogo() {
        if (this.scale < 1 && !this.isStopAnimation) {
            this.scale +=0.05;
            this.logo.drawImageScale(this.logo.vector1.x, this.logo.vector1.y, this.scale)
        } else if(!this.isStopAnimation) {
            this.logo.drawImageRotated(this.logo.vector1.x, this.logo.vector1.y, '1.000', '0.800', 0.002, 0, false)
        }
        if (this.isStopAnimation && this.scale >= 0) {
            this.scale -= 0.05;
            this.logo.drawImageScale(this.logo.vector1.x, this.logo.vector1.y, this.scale)
        }
    }

    render(time) {
        this.update(time);
        this.game.screen.drawImageFullScreen(0, 0, 'bg1');
        this.game.screen.drawImageRotated('sun',this.game.screen.canvas.width/1.5, this.game.screen.canvas.height/1.1 , this.game.screen.changeScale('1.000', '0.800', 0.002), time/9000)
        if(this.obstacle7.vector1.y <= this.obstacle7.endY || this.isStopAnimation) {
            this.obstacle7.runSprite(80, 400)
        } else {
            this.obstacle7.drawImageSpriteRotated(this.obstacle7.endX, this.obstacle7.endY, 0, -2, 0.005, 80, 400)
        }
        if(this.sky2.vector1.x >= 20 && !this.sky2.isLevitation || this.isStopAnimation) {
           this.sky2.run()
        } else {
            this.sky2.levitation(20, 0);
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
        if(this.obstacle1.vector1.y <= this.obstacle1.endY && !this.obstacle1.isRotation || this.isStopAnimation) {
            this.obstacle1.runSprite(400, 320)
        } else {
            this.obstacle1.drawImageSpriteRotated(this.obstacle1.endX, this.obstacle1.endY, 0, -2, 0.002, 400, 320)
        }
        if(this.logoCloud.vector1.x >= this.logoCloud.endX && !this.logoCloud.isLevitation || this.isStopAnimation) {
            this.logoCloud.run();
        } else {
            this.logoCloud.levitation(this.logoCloud.endX, this.logoCloud.endY);
        }

        this.renderLogo();

        if(this.sky4.vector1.x >= this.sky4.endX && !this.sky4.isLevitation || this.isStopAnimation) {
            this.sky4.run()
        } else {
            this.sky4.levitation(this.sky4.endX, this.sky4.endY, 1, 30);
        }

        this.renderLama();

        this.renderFrontObstacles();
        super.render(time)
    }
}
