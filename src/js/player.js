import {Vector} from "./vector.js";
import {SpriteSheet} from "./sprite-sheet.js";

export class Player {
    // constructor({imageName, speed, imageWidth, imageHeight, spriteWidth, spriteHeight, control}) {
    constructor(control, y) {
        this.x = 0;
        this.y = 0;
        this.speed = 250;
        this.velocity = new Vector('right', 0);
        this.lastTime = 0;
        this.isJumping = false;
        this.tile = new SpriteSheet({
            imageName: 'player',
            imageWidth: 1680,
            imageHeight: 720,
            spriteWidth: 240,
            spriteHeight: 240
        })
        // по умолчанию персонаж идет вправо
        this.walk();
        this.control = control;
        this.startPosY = y
        this.isStoped = false;
        this.deadCount = 0;
        this.collisionShape = {x: 35, y: 0, width: 170, height: 240};
    }

    // идти
    walk() {
        if (this.isJumping) return;
        // this.velocity.setDirection(direction, this.speed);
        this.view = this.tile.getAnimation([4, 5, 6, 7], 300);
        this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
        this.view.run();
    }

    // прыгать
    jump() {
        if (this.isJumping || this.isStoped) return;
        this.isJumping = true;
        this.view = this.tile.getAnimation([15, 16, 17, 18, 19, 20, 21], 600, false);
        this.velocity.setDirection('up', this.speed);
        this.view.onEnd = () => {
            this.walk()
        }
        this.view.run();
    }

    // столкновение
    crash(obstacle, obstacles) {
        if (this.isStoped) return;
        this.stop();
        this.isStoped = true;
        this.velocity.y = 10;
        this.y = this.startPosY;
        this.view = this.tile.getAnimation([11, 12, 13, 14], 300, false);
        this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
        obstacles.forEach(i => {
            i.isStoped = true;
        });
        obstacle.x = 0 - obstacle.view.width;
        obstacle.view.setXY(Math.trunc(obstacle.x), Math.trunc(obstacle.x));
        this.view.onEnd = () => {
            this.isStoped = false;
            obstacles.forEach(i => {
                i.isStoped = false;
            })
            this.walk();
            this.deadCount++;
        }
        this.view.run();
    }

    // остановится, обнуляем скорость , останавливаем анимацию
    stop() {
        if (this.isJumping) return;
        // this.velocity.setDirection(direction, 0);
        this.view = this.tile.getAnimation([4], 150);
        this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
        this.view.stop();
    }

    updatePosition(time) {
        this.x += (time - this.lastTime) * (this.velocity.x / 1000);
        this.y += (time - this.lastTime) * (this.velocity.y / 1000);
        this.velocity.y += 2.2;

        // не ниже значения, чтоб не провалился под землю при прыжке
        if (this.y >= this.startPosY) {
            this.isJumping = false;
            this.view.run();
        }
    }

    collide(obs, obstacles) {
        let hit = false;
        //Если объекты находятся на одной линии по горизонтали{
        if (this.y < obs.y + obs.view.height - obs.collisionShape.y && this.y + this.view.height > obs.y - obs.collisionShape.y) {
            //Если объекты находятся на одной линии по вертикали
            if (this.x + this.view.width - this.collisionShape.x > obs.x && this.x + this.collisionShape.x < obs.x + obs.view.width + obs.collisionShape.x) {
                hit = true;
                this.crash(obs, obstacles);
            }
        }
        return hit;
    }

    update(time) {
        // пропускаем первый кадр
        if (this.lastTime === 0) {
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
