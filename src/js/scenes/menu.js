import  {Scene} from '../scene.js'

export class Menu extends Scene{
    constructor(game) {
        super(game)
    }

    init() {
        super.init();
        // this.game.screen.drawImage(0,20, 'sky');
    }

    update(time) {
        // console.log(this.game.control.up)
        if(this.game.control.enter) {
            this.finish(Scene.START_GAME)
        }
    }

    render(time) {
        this.update(time);
        this.game.screen.drawImage(0,0, 'menu');
        this.game.screen.drawImage(0,20, 'sky');
        this.game.screen.printText(250, 350, 'Press tab to start game');
        super.render(time)
    }
}
