import {Scene} from '../scene.js';

export class Loading extends Scene {
    constructor(game) {
        super(game);
        this.loadedAt = 0;
        this.isPressed = false;
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
        if (this.loadedAt !== 0 && (time - this.loadedAt) > 3000) {
            if (this.isPressed) {
                this.finish(Scene.LOADED);
            }
        }
    }

    render(time) {
        this.update(time);
        this.game.screen.fill('#00000');
        this.game.screen.printText(this.game.screen.canvas.width/2 - 70, this.game.screen.canvas.height/2, "Loading.....",'30px', '#ffffff')
        if (!this.isPressed) {
            this.game.screen.printText(this.game.screen.canvas.width/2 - 150, this.game.screen.canvas.height - 50, "Нажмите на лю бую  кнопку", '23px', '#ffffff')
        }
        super.render(time)
    }
}
