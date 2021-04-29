import {ImageLoader} from "./image-loader.js";
import {Sprite} from "./sprite.js";
import {Screen} from "./screen";

export class AnimateObject  {
    constructor(imageName, x, y, scale= 1, deg=0, context ={}, images={}) {
        this.scale = scale;
        this.deg = deg;
        this.isChangeScale1 = false;
        this.vector1 = {
            x:x,
            y:y
        }
        this.isChangeVectorX1 =false;
        this.isChangeVectorY1 = false;
        this.imageName1 = imageName;
        this.images =images;
        this.context = context;
    }

    drawImageRotated(x, y, start, end, step, rot, isRotate =  true) {
        let scale = this.changeScale(start, end, step)
        this.context.clearRect(0, 0, this.context.width, this.context.height);
        this.context.setTransform(scale , 0, 0, scale, x, y);
        if (isRotate) {
            this.context.rotate(rot);
        }
        this.context.drawImage(this.images[this.imageName1], -this.images[this.imageName1].width /2, -this.images[this.imageName1].height / 2);
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }

    levitation( x, y, scale, end, step) {
        this.context.clearRect(0, 0, this.context.width, this.context.height);
        this.context.setTransform(scale, 0, 0, scale,  this.changeVectorX(x, x - end, step), this.changeVectorY(y, y - end -10, step));
        this.context.drawImage(this.images[this.imageName1], -this.images[this.imageName1].width /2, -this.images[this.imageName1].height / 2);
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }

    changeVectorX(start, end, step) {
        console.log(Math.round(this.vector1.x) )
        console.log(Math.round(start ))
        if(Math.round(this.vector1.x)  === Math.round(start) ) {
            this.isChangeVectorX1 = false;
        }
        if (Math.round(this.vector1.x)  === Math.round(end) ) {
            this.isChangeVectorX1 = true;
        }
        if (Math.round(this.vector1.x) <= Math.round(start)  && !this.isChangeVectorX1) {
            this.vector1.x -=  Math.sin(step);
        }
        if (Math.round(this.vector1.x) >= Math.round(end)  && this.isChangeVectorX1) {
            this.vector1.x += Math.sin(step);
        }
        return this.vector1.x
    }

    changeVectorY(start, end, step) {
        if(Math.round(this.vector1.y) === Math.round(start )) {
            this.isChangeVectorY1 = false;
        }
        if (Math.round(this.vector1.y)  ===  Math.round(end)) {
            this.isChangeVectorY1 = true;
        }
        if (Math.round(this.vector1.y) <= Math.round(start) && !this.isChangeVectorY1) {
            this.vector1.y -= step;
        }
        if (Math.round(this.vector1.y) >= Math.round(end)  && this.isChangeVectorY1) {
            this.vector1.y += step;
        }
        return this.vector1.y
    }


    changeScale(start, end, step) {
        if(this.scale.toFixed(3) === start) {
            this.isChangeScale1 = false;
        }
        if (this.scale.toFixed(3) === end) {
            this.isChangeScale1 = true;
        }
        if (this.scale.toFixed(3) <= start && !this.isChangeScale1) {
            this.scale -= step;
        }
        if (this.scale.toFixed(3) >= end && this.isChangeScale1) {
            this.scale += step;
        }
        return this.scale
    }

    update(time) {

    }
}
