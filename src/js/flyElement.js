import {Vector} from "./vector.js";
import {SpriteSheet} from "./sprite-sheet.js";
import {getRandomInt} from "./math.js";

export class FlyElement {
    constructor(x,y, imageName, imageWidth, imageHeight, spriteWidth, spriteHeight, isJumping = false) {
        this.x = x;
        this.y = y;
        this.startPosX = x;
        this.speed = 350;
        this.velocity = new Vector('right', 0);
        this.lastTime = 0;
        this.isJumping = isJumping;
        this.tile = new SpriteSheet({
            imageName: imageName,
            imageWidth: imageWidth,
            imageHeight: imageHeight,
            spriteWidth: spriteWidth,
            spriteHeight: spriteHeight,
        })
        // по умолчанию персонаж идет вправо
        this.isJumping ? this.jump() : this.walk();
        this.startPosY = y
        this.isStoped = false;
        this.startFly = getRandomInt(this.startPosX + 300, this.startPosX + 700);
        this.startWaveFly =  0 - this.tile.spriteWidth;
    }

    // идти
    walk() {
        this.velocity.setDirection('left', this.speed);
        this.view = this.tile.getAnimation([1, 2, 3, 4], 150);
        this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
        this.view.run();
    }

    // прыгать
    jump() {
        this.isJumping = true;
        this.velocity.setDirection('up', this.speed);
        this.view = this.tile.getAnimation([1, 2, 3, 4, 5], 500,);
        this.view.run();
    }

    waveFly(time) {
        if (this.y > 0 && this.y <= this.startPosY) {
            this.x += (time - this.lastTime) * (this.velocity.x / 1000);
            this.y += (time - this.lastTime) * (this.velocity.y / 1000);
            this.velocity.x += 9;
            this.velocity.y -= 1;
        } else {
            if (this.y >= this.startPosY) {
                this.velocity.setDirection('up', this.speed);
                this.velocity.y -= 1;
            } else {
                this.velocity.setDirection('down', this.speed);
                this.velocity.y += 1;
            }
            this.x += (time - this.lastTime) * (this.velocity.x / 1000);
            this.y += (time - this.lastTime) * (this.velocity.y / 1000);
            this.velocity.x += 10;
        }
    }

    fly(time) {
        if (this.x > 0 - this.tile.spriteWidth && this.y > 0) {
            this.x += (time - this.lastTime) * (this.velocity.x / 1000);
            this.y += (time - this.lastTime) * (this.velocity.y / 1000);
            this.velocity.y -= 2;
        } else {
            this.x = this.startFly;
            this.y = getRandomInt(100, 150) + this.x/4;
            this.velocity.y = 0;
        }
    }

    update(time) {
        // пропускаем первый кадр
        if (this.lastTime === 0) {
            this.lastTime = time;
            return;
        }

        if (this.isJumping) {
            if (this.x >= this.startPosX) {
                this.x = this.startWaveFly;
                this.y = 200;
            }
            this.waveFly(time);

        } else {
            this.fly(time);
        }
        this.lastTime = time;
        this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
        this.view.update(time);
    }
}
