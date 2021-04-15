import {Obstacle} from "./obstacle.js";

export class ActiveObstacle  {
    constructor({obstaclesName = ['plant', 'slime']}) {
        this.duration = 1500;
        this.obstacleName = obstaclesName[1];
        this.obstaclesName = obstaclesName;
        this.lastTime = 0;
        this.obstacles = {};
        this.getAllSpriteSheet();
        // this.currentObstacle = new Obstacle({imageName: this.obstacleName});
    }

    getAllSpriteSheet() {
        this.obstaclesName.forEach(name => {
            this.obstacles[name] = new Obstacle({DX:this.getRandomInt(200, 400),imageName: this.obstacleName})
            // console.log(this.obstacles)
        })
    }

    changeObstacle() {
        this.obstacleName = this.obstaclesName[Math.floor(Math.random()*2)];
        this.currentObstacle = new Obstacle({imageName: this.obstacleName})

    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }

    update(time){
        // if((time - this.lastTime) > this.duration) {
            // this.obstacles.forEach( obstacle => {
            //     console.log(this.obstacles)
            //     if (!this.currentObstacle.isStoped) {
            //         // this.currentObstacle =  this.obstacles[this.obstacleName];
            //         console.log(this.currentObstacle.tile.imageName)
            //         this.currentObstacle.updatePosition(time, this.currentObstacle, () => this.changeObstacle());
            //     }
            // })

        for ( let obstacle in this.obstacles) {
            if (!this.obstacles[obstacle].isStoped) {
                // this.currentObstacle =  this.obstacles[this.obstacleName];
                // console.log(this.currentObstacle.tile.imageName)
                this.obstacles[obstacle].updatePosition(time, this.obstacles[obstacle], () => {
                    // console.log((time - this.lastTime) > this.duration)
                        this.obstacleName = this.obstaclesName[Math.floor(Math.random() * 2)];
                        this.obstacles[obstacle] = new Obstacle({DX:this.getRandomInt(100, 300), imageName: this.obstacleName})

                });
                this.obstacles[obstacle].update(time);
            }
        }
            // this.game.screen.drawSprite(this.obstacles[this.obstacle].view);
            // this.lastTime = time;
        }
    // }
}
