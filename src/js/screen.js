import {ImageLoader} from "./image-loader.js";
import {Sprite} from "./sprite.js";

export class Screen {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = this.createCanvas(width, height);
        this.context = this.canvas.getContext('2d');
        this.images = {};
        this.isImagesLoaded = false;
        this.scale = 1.000;
        this.isChangeScale = false;
        // this.vector = {
        //     x:this.canvas.width/2,
        //     y:this.canvas.height/3
        // }
        // this.isChangeVectorX =false;
        // this.isChangeVectorY = false
        // this.canvas.width = innerWidth;
        // this.canvas.height = innerHeight;
    }

    createCanvas(width, height) {
        let elements = document.getElementsByTagName('canvas');
        let canvas = elements[0] || document.createElement('canvas');
        document.body.appendChild(canvas);
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }

    createMap(name, tileSet) {
        const mapImage = document.createElement('canvas');
        // если будет тайловая карта в формате json
        // mapImage.width = mapData.width * mapData.tileWidth;
        // mapImage.height = mapData.height * mapData.tileHeight;
        // сейчас это просто картинка
        mapImage.width = tileSet.imageWidth;
        mapImage.height = tileSet.imageHeight;
        const mapContext = mapImage.getContext('2d');

        mapContext.drawImage(this.images[tileSet.imageName], 0, 0, mapImage.width, mapImage.height);
        this.images[name] = mapImage;
        return new Sprite({
            imageName: name,
            sourceX: 0,
            sourceY: 0,
            width: mapImage.width,
            height: mapImage.height,
        });
    }

    fill(color) {
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, this.width, this.height);
    }

    loadImages(imageFiles) {
        const loader = new ImageLoader(imageFiles);
        loader.load().then((names) => {
            this.images = Object.assign(this.images, loader.images);

        });
        let f = new FontFace('CeraRoundPro', 'url(fonts/CeraRoundProDEMO-Regular.woff2)');
        f.load().then(() => {
            this.isImagesLoaded = true;
        }).catch((err) => {
           console.log(err)
        })
    }

    printText(x, y, text, color = "#ffffff") {
        this.context.fillStyle = color;
        this.context.font = '23px CeraRoundPro';
        this.context.fillText(text, x, y);
    }

    drawImage(x, y, imageName, ) {
        this.context.drawImage(this.images[imageName], x, y);
    }

    drawScaleImage(imageName, x, y, sx, sy, sWidth, sHeight,  dWidth, dHeight ) {
        this.context.drawImage(this.images[imageName], sx, sy, sWidth, sHeight, x, y, dWidth, dHeight);
    }

    drawImageFullScreen(x, y, imageName) {
        this.context.drawImage(this.images[imageName], x, y, this.width, this.height);
    }

    drawImageRotated(imageName, x, y, scale, rot, isRotate =  true) {
        this.context.clearRect(0, 0, this.context.width, this.context.height);
        this.context.setTransform(scale, 0, 0, scale, x, y);
        if (isRotate) {
            this.context.rotate(rot);
        }
        this.context.drawImage(this.images[imageName], -this.images[imageName].width /2, -this.images[imageName].height / 2);
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }

    // levitation(imageName, x, y, scale,end, step) {
    //     this.context.clearRect(0, 0, this.context.width, this.context.height);
    //     this.context.setTransform(scale, 0, 0, scale,  this.changeVectorX(x,x, x - end, step), this.changeVectorY(y,y, y - end -10, step));
    //     this.context.drawImage(this.images[imageName], -this.images[imageName].width /2, -this.images[imageName].height / 2);
    //     this.context.setTransform(1, 0, 0, 1, 0, 0);
    // }
    //
    // changeVectorX(x,start, end, step) {
    //     console.log(x)
    //     if(Math.round(x)  === start ) {
    //         this.isChangeVectorX = false;
    //     }
    //     if (Math.round(x)  === end ) {
    //         this.isChangeVectorX = true;
    //     }
    //     if (Math.round(x) <= start  && !this.isChangeVectorX) {
    //         x -=  Math.sin(step);
    //     }
    //     if (Math.round(x) >= end  && this.isChangeVectorX) {
    //         x += Math.sin(step);
    //     }
    //     console.log(x)
    //     return x
    // }
    //
    // changeVectorY(y,start, end, step,) {
    //     if(Math.round(y) === Math.round(start )) {
    //         this.isChangeVectorY = false;
    //     }
    //     if (Math.round(y)  ===  Math.round(end)) {
    //         this.isChangeVectorY = true;
    //     }
    //     if (Math.round(y) <= Math.round(start) && !this.isChangeVectorY) {
    //         y -= step;
    //     }
    //     if (Math.round(y) >= Math.round(end)  && this.isChangeVectorY) {
    //         y += step;
    //     }
    //     return y
    // }


    changeScale(start, end, step) {
        if(this.scale.toFixed(3) === start) {
            this.isChangeScale = false;
        }
        if (this.scale.toFixed(3) === end) {
            this.isChangeScale = true;
        }
        if (this.scale.toFixed(3) <= start && !this.isChangeScale) {
            this.scale -= step;
        }
        if (this.scale.toFixed(3) >= end && this.isChangeScale) {
            this.scale += step;
        }
        return this.scale
    }

    drawSprite(sprite) {

        let spriteX = sprite.x;
        let spriteY = sprite.y;

        if (
            (spriteX >= this.width) ||
            (spriteY >= this.height) ||
            ((spriteX + sprite.width) <= 0) ||
            ((spriteY + sprite.height) <= 0)
        ) {
            return;
        }

        let sourceX = sprite.sourceX + Math.abs(Math.min(0, spriteX));
        let sourceY = sprite.sourceY + Math.abs(Math.min(0, spriteY));
        let width = Math.min(this.width, spriteX + sprite.width) - Math.max(0, spriteX);
        let height = Math.min(this.height, spriteY + sprite.height) - Math.max(0, spriteY);

        this.context.drawImage(this.images[sprite.imageName],
            sourceX,
            sourceY,
            width,
            height,
            Math.max(0, spriteX),
            Math.max(0, spriteY),
            width,
            height);
    }
}
