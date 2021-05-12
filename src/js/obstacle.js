import {Vector} from "./vector.js";
import {SpriteSheet} from "./sprite-sheet.js";

export class Obstacle {
    constructor({gameWidth = 640, gameHeight = 640, index = 1}) {
        this.speed = 310;
        this.velocity = new Vector('left', 0);
        this.lastTime = 0;
        this.isStoped = false;
        this.tiles = new SpriteSheet({
            imageName: 'obstacles',
            imageWidth: 480,
            imageHeight: 480,
            spriteHeight: 80,
            spriteWidth: 80,
        });
        this.view = this.tiles.getSprite(index)
        this.collisionShape = {x: 20, y: 30, width: 80, height: 80};
        this.gameWidth = gameWidth;
        this.x = 0;
        this.y = 0;
        this.dead = false;
        // по умолчанию персонаж идет влево
        this.walk();
    }

    // идти
    walk() {
        if (this.isStoped) return;
        this.velocity.setDirection('left', this.speed)
    }

    update(time, width) {
        // пропускаем первый кадр
        if (this.lastTime === 0) {
            this.lastTime = time;
            return;
        }

        if (!this.isStoped) {
            if (this.x < (0 - (this.tiles.spriteWidth))) {
                this.dead = true;
            }

            this.x += (time - this.lastTime) * (this.velocity.x / 1000);
            this.y += (time - this.lastTime) * (this.velocity.y / 1000);
            this.lastTime = time;
            this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
        }
    }
}
