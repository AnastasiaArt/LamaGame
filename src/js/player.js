import { Vector } from "./vector.js";
import {SpriteSheet} from "./sprite-sheet.js";

export class Player {
    // constructor({imageName, speed, imageWidth, imageHeight, spriteWidth, spriteHeight, control}) {
    constructor(control) {
        this.x = 0;
        this.y = 0;
        // колличество пикселей в секунду
        this.speed = 500;
        this.velocity = new Vector('right', 0);
        this.lastTime = 0;
        this.collisionShape = {x: 18, y: 15, width: 28, height: 49};
        this.isJumping = false;
        this.tile = new SpriteSheet({
            imageName: 'player',
            imageWidth: 240,
            imageHeight: 384,
            spriteWidth: 62,
            spriteHeight: 100
        })
        // по умолчанию персонаж идет вправо
        this.walk();
        this.control = control;
    }

    // идти
    walk() {
        if(this.isJumping) return;
        // this.velocity.setDirection(direction, this.speed);
        this.view = this.tile.getAnimation([1,2,3,4],150);
        this.view.run();
    }

    // прыгать
    jump() {
        if(this.isJumping) return;
        this.isJumping = true;
        this.velocity.setDirection('up', this.speed);
        // this.view = this.tile.getAnimation([1],150, );
        this.view.stop();
    }


    // остановится, обнуляем скорость , останавливаем анимацию
    stop() {
        if(this.isJumping) return;
        // this.velocity.setDirection(direction, 0);
        this.view = this.tile.getAnimation([1,2,3,4],150);
        this.view.stop();
    }

    updatePosition(time) {
        this.x += (time - this.lastTime) * (this.velocity.x / 1000);
        this.y += (time - this.lastTime) * (this.velocity.y / 1000);
        this.velocity.y += 10;

        // не ниже значения, чтоб не провалился под землю при прыжке
        if (this.y >=250) {
            this.isJumping = false;
            // this.view.stop()
            // this.view = this.tile.getAnimation([1,2,3,4],150);
            this.view.run();
        }
    }

    update(time) {
        // пропускаем первый кадр
        if(this.lastTime === 0) {
            this.lastTime = time;
            return;
        }

        if (this.control.jump) {
            this.jump();
        } else if (this.control.down) {
            this.stop();
        }

        if (this.isJumping) {
            this.updatePosition(time);
        }
        this.lastTime = time;
        this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));

        this.view.update(time);
    }
}
