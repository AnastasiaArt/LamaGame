import { Vector } from "./vector.js";
import {SpriteSheet} from "./sprite-sheet.js";
export class Obstacle {
    constructor( {imageName, imageWidth = 32, imageHeight = 32, spriteWidth = imageWidth, spriteHeight = imageHeight, gameWidth}) {
        this.x = 0;
        this.y = 0;
        // колличество пикселей в секунду
        this.speed = 80;
        this.velocity = new Vector('left', 0);
        this.lastTime = 0;
        this.isStoped = false;
        this.tile = new SpriteSheet({
            imageName: imageName,
            imageWidth: imageWidth,
            imageHeight: imageHeight,
            spriteWidth: spriteWidth,
            spriteHeight: spriteHeight
        })
        // по умолчанию персонаж идет влево
        this.walk();
        this.gameWidth = gameWidth;
    }

    // идти
    walk() {
        if(this.isStoped) return;
        this.velocity.setDirection('left', this.speed);
        this.view = this.tile.getAnimation([1],150);
        console.log(this.view)
        this.view.run();
    }

    // остановится, обнуляем скорость , останавливаем анимацию
    stop() {
        if(this.isStoped) return;
        // this.velocity.setDirection(direction, 0);
        this.view = this.tile.getAnimation([1],150);
        this.view.stop();
    }

    update(time) {
        // пропускаем первый кадр
        if(this.lastTime === 0) {
            this.lastTime = time;
            return;
        }

        if (!this.isStoped) {
            this.x < (0 - (this.tile.spriteWidth)) ?
                this.x = this.gameWidth + (Math.random()*200) :
                this.x += (time - this.lastTime) * (this.velocity.x / 1000);
            this.y += (time - this.lastTime) * (this.velocity.y / 1000);
        }
        this.lastTime = time;
        this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
        // console.log(this.view)
        this.view.update(time);
    }
}
