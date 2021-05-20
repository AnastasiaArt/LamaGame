import {Scene} from '../scene.js';

export class Loading extends Scene {
    constructor(game) {
        super(game);
        this.loadedAt = 0;
        this.isPressed = false;
        this.persent = 0;

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
        if (time <= this.loadedAt + 4000 && this.persent <= 200 ) {
            this.persent = (time - this.loadedAt)*200 / 4000;
        }
        if (this.loadedAt !== 0 && (time - this.loadedAt) > 4000) {
            this.persent = 200;
            if (this.isPressed) {
                this.finish(Scene.LOADED);
            }
        }
    }

    renderProgressBar() {
        const width = this.game.screen.canvas.width/2;
        const height = this.game.screen.canvas.height/1.5;
        this.game.screen.drawScaleImage('progressWrap', width - 150, height, 0,0, 354, 53, 300, 50 );
        this.game.screen.drawScaleImage('progress', width - 145, height + 5, 0,0, 354, 57, this.persent, 40 );
        this.game.screen.drawScaleImage('progressLama', width - 145 + this.persent, height -  this.game.screen.images.progressLama.height/2, 0,0, 109, 135, 109, 135 );
        this.game.screen.printText(width + 170, height + 27, `${Math.floor(this.persent/2)} %`,'23px', '#ffffff')
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
