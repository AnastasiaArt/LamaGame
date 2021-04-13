import { Vector } from "./vector.js";
import {SpriteSheet} from "./sprite-sheet.js";
import {getRandomInt} from "./math.js";

export class Obstacle {
    constructor( {imageName, imageWidth = 32, imageHeight = 32, spriteWidth = imageWidth, spriteHeight = imageHeight, gameWidth=640, gameHeight =640}) {
        this.speed = 40;
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
        this.gameWidth = gameWidth;
        // this.x = this.gameWidth + DX;
        this.x = 0;
        // this.DX = DX;
        this.y = 0;
        // this.y = gameHeight - gameHeight/1.98;
        // по умолчанию персонаж идет влево
        this.walk();
        this.obstaclesName = ['plant', 'slime'];
    }

    // идти
    walk() {
        if (this.isStoped) return;
        // this.velocity.setDirection('left', this.speed, this.x, this.y);
        this.velocity.setDirection('left', this.speed)
        this.view = this.tile.getAnimation([1], 150);
        this.view.run();
        // this.view.setXY(-32, 300);
    }

    // updatePosition(time, tile, callback) {
    //     if (this.x < (0 - (this.tile.spriteWidth))) {
    //            callback()
    //            this.x = this.gameWidth + this.DX;
    //     } else {
    //         this.x += (time - this.lastTime) * (this.velocity.x / 1000);
    //     }
    // }

    // остановится, обнуляем скорость , останавливаем анимацию
    stop() {
        if(this.isStoped) return;
        // this.velocity.setDirection(direction, 0);
        this.view = this.tile.getAnimation([1],150);
        this.view.stop();
    }

    update(time, width) {
        // пропускаем первый кадр
        if (this.lastTime === 0) {
            this.lastTime = time;
            return;
        }

        if (!this.isStoped) {
            if (this.x < (0 - (this.tile.spriteWidth)) ) {
                this.tile = new SpriteSheet({
                    imageName: this.obstaclesName[Math.floor(Math.random() * 2)],
                    imageWidth: 64,
                    imageHeight: 64,
                    spriteWidth: 64,
                    spriteHeight: 64
                });
                // this.view.stop();
                // this.walk();
                this.view = this.tile.getAnimation([1],150);
                // this.view.run();
                const DX = getRandomInt(20, 100);
                this.x = width + DX;
            } else {
                this.x += (time - this.lastTime) * (this.velocity.x / 1000);
            }
            // this.y += (time - this.lastTime) * (this.velocity.y / 1000);
        }
        this.lastTime = time;
        this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
        this.view.update(time);
    }
}
