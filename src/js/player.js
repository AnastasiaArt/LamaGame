import {Vector} from "./vector.js";
import {SpriteSheet} from "./sprite-sheet.js";

export class Player {
    // constructor({imageName, speed, imageWidth, imageHeight, spriteWidth, spriteHeight, control}) {
    constructor(control, y) {
        this.x = 0;
        this.y = 0;
        // колличество пикселей в секунду
        this.speed = 500;
        this.velocity = new Vector('right', 0);
        this.lastTime = 0;
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
        this.startPosY = y
        this.isStoped = false;
        this.deadCount = 0;
    }

    // идти
    walk() {
        if (this.isJumping) return;
        // this.velocity.setDirection(direction, this.speed);
        this.view = this.tile.getAnimation([1, 2, 3, 4], 150);
        this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
        this.view.run();
    }

    // прыгать
    jump() {
        if (this.isJumping || this.isStoped) return;
        this.isJumping = true;
        this.view = this.tileJump.getAnimation([1, 2, 3], 150);
        this.velocity.setDirection('up', this.speed);
        this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
        this.view.onEnd = () => {
            this.walk()
        }
        // this.view = this.tile.getAnimation([1],150, );
        this.view.stop();
    }

    // столкновение
    crash(obstacle, obstacles) {
        if (this.isStoped) return;
        this.stop();
        this.isStoped = true;
        this.view = this.tileCrash.getAnimation([1, 2, 3, 4], 300, false);
        this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
        obstacles.forEach(i => {
            i.isStoped = true;
        })
        this.view.onEnd = () => {
            this.isStoped = false;
            obstacle.x = 0 - (this.tile.spriteWidth);
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
        this.view = this.tile.getAnimation([1], 150);
        this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
        this.view.stop();
    }

    updatePosition(time) {
        this.x += (time - this.lastTime) * (this.velocity.x / 1000);
        this.y += (time - this.lastTime) * (this.velocity.y / 1000);
        this.velocity.y += 10;

        // не ниже значения, чтоб не провалился под землю при прыжке
        if (this.y >= this.startPosY) {
            this.isJumping = false;
            // this.view.stop()
            // this.view = this.tile.getAnimation([1,2,3,4],150);
            this.view.run();
        }
    }

    collide(car, obstacles) {
        let hit = false;
        //Если объекты находятся на одной линии по горизонтали{
        if (this.y < car.y + car.view.height && this.y + this.view.height > car.y) {
            //Если объекты находятся на одной линии по вертикали
            if (this.x + this.view.width > car.x && this.x < car.x + car.view.width) {
                hit = true;
                this.crash(car, obstacles);
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
