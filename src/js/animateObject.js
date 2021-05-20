import {Vector} from "@/js/vector";

export class AnimateObject  {
    constructor(imageName, x, y, scale= 1, deg= 0, context = {}, images= {}, direction ='left',endX = x, endY = y,) {
        this.scale = scale;
        this.deg = deg;
        this.isChangeScale1 = false;
        this.isChangeDeg1 = false;
        this.velocity = new Vector(direction, 10);
        this.vector1 = {
            x:x,
            y:y
        },
        this.endX = endX,
        this.endY = endY,
        this.isChangeVectorX1 =false;
        this.isChangeVectorY1 = false;
        this.imageName1 = imageName;
        this.images =images;
        this.context = context;
        this.isLevitation = false;
        this.isRotation = false;
        this.isScale = false;
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

    drawImageScale(x, y, scale) {
        this.isScale = true;
        this.context.clearRect(0, 0, this.context.width, this.context.height);
        this.context.setTransform(scale , 0, 0, scale, x, y);
        this.context.drawImage(this.images[this.imageName1], -this.images[this.imageName1].width /2, -this.images[this.imageName1].height / 2);
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }

    drawImageSpriteRotated(x, y, start, end, step, sx, sy, sWidth = 80, sHeight = 80, dWidth = 80, dHeight = 80 ) {
        this.isRotation = true;
        let rot = this.changeDeg(start, end, step)
        this.context.clearRect(0, 0, this.context.width, this.context.height);
        this.context.setTransform(1 , 0, 0, 1, x, y);
        this.context.rotate(rot);
        this.context.drawImage(this.images[this.imageName1], sx, sy, sWidth, sHeight, 0,0, dWidth, dHeight);
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }

    levitation( x, y, scale = 1, end = 40, step = 0.3, sx=0, sy=0,sWidth=this.images[this.imageName1].width, sHeight = this.images[this.imageName1].height,dWidth=this.images[this.imageName1].width, dHeight = this.images[this.imageName1].height) {
        this.isLevitation = true;
        this.context.clearRect(0, 0, this.context.width, this.context.height);
        this.context.setTransform(scale, 0, 0, scale,  this.changeVectorX(x, x - end, step), this.changeVectorY(y, y - end -10, step));
        this.context.drawImage(this.images[this.imageName1], sx, sy, sWidth, sHeight, 0,0, dWidth, dHeight);
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }


     // TODO
    //  объединить в одну все 4 функции
    changeVectorX(start, end, step) {
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

    changeDeg(start, end, step) {
        if(Math.round(this.deg) ===  Math.round(start )) {
            this.isChangeDeg1 = false;
        }
        if (Math.round(this.deg) === Math.round(end)) {
            this.isChangeDeg1 = true;
        }
        if (Math.round(this.deg) <=  Math.round(start ) && !this.isChangeDeg1) {
            this.deg -= step;
        }
        if (Math.round(this.deg) >= Math.round(end) && this.isChangeDeg1) {
            this.deg+= step;
        }
        return this.deg
    }

    run() {
        this.vector1.x += this.velocity.x;
        this.vector1.y += this.velocity.y;
        this.context.drawImage(this.images[this.imageName1], this.vector1.x, this.vector1.y);
    }

    runSprite(sx, sy, sWidth = 80, sHeight = 80, dWidth = 80, dHeight = 80 ) {
        this.vector1.x += this.velocity.x;
        this.vector1.y += this.velocity.y;
        this.context.drawImage(this.images[this.imageName1], sx, sy, sWidth, sHeight, this.vector1.x,this.vector1.y, dWidth, dHeight);
    }

    update(time) {

    }
}
