import {Scene} from '../scene.js';

export class Loading extends Scene {
    constructor(game) {
        super(game);
        this.loadedAt = 0;
        this.isPressed = false;
        this.persent = 0;
        this.progressWidth = 300;
        this.duration = 4000; // 4 секунды для расчета и отрисовки всех элемнтов
    }

    init() {
        super.init();
        this.loadedAt = 0;
        document.addEventListener('keydown', (event) => {
            this.isPressed = true;
        });
        document.addEventListener('mousedown', (event) => {
            this.isPressed = true;
        });
    }

    update(time) {
        if (this.loadedAt === 0 && this.game.screen.isImagesLoaded && this.game.screen.isAudiosLoaded ) {
            this.loadedAt = time;
        }
        if (time <= this.loadedAt + 4000 && this.persent <= this.progressWidth ) {
            this.persent = (time - this.loadedAt)*this.progressWidth / 4000;
        }
        if (this.loadedAt !== 0 && (time - this.loadedAt) > 4000) {
            this.persent = this.progressWidth;
            if (this.isPressed) {
                this.finish(Scene.LOADED);
            }
        }
    }

    renderProgressBar() {
        const width = this.game.screen.canvas.width/2 - this.progressWidth/2;
        const height = this.game.screen.canvas.height/1.5 + 70;
        this.game.screen.drawScaleImage('progressWrap', width , height, 0,0, 300, 36, this.progressWidth, 36);
        this.game.screen.drawImage(width , height, 'progressStart');
        this.game.screen.drawScaleImage('progress', width+22, height, 0,0, 285, 36, this.persent, 36 );
        this.game.screen.drawScaleImage('progressLama',width + this.persent - 50 , height -  50, 0,0,232,232,100,100);
        this.game.screen.printText(width + this.progressWidth + 50, height + 27, `${Math.floor(this.persent/3)} %`,'23px', '#ffffff')
    }

    render(time) {
        this.update(time);
        this.game.screen.drawScaleImage('bgLoading', -(this.game.screen.canvas.height*1.666-this.game.screen.canvas.width)/2,0, 0,0, 2000, 1200, this.game.screen.canvas.height*1.666, this.game.screen.canvas.height );
        this.renderProgressBar();
        if (!this.isPressed) {
            this.game.screen.printText(this.game.screen.canvas.width/2 - 150, this.game.screen.canvas.height - 50, "Нажмите на лю бую  кнопку")
        }
        super.render(time)
    }
}
