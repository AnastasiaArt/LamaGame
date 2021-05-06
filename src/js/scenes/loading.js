import {Scene} from '../scene.js';

export class Loading extends Scene {
    constructor(game) {
        super(game);
        this.loadedAt = 0;
    }

    init() {
        super.init();
        this.loadedAt = 0;
    }

    update(time) {
        if (this.loadedAt === 0 && this.game.screen.isImagesLoaded && this.game.screen.isAudiosLoaded ) {
            this.loadedAt = time;
        }
        if (this.loadedAt !== 0 ) {
            this.finish(Scene.LOADED);
        }
    }

    render(time) {
        this.update(time);
        this.game.screen.fill('#00000');
        this.game.screen.printText(100, 100, "Loading.....")
        super.render(time)
    }
}
