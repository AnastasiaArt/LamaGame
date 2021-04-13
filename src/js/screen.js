import {ImageLoader} from "./image-loader.js";
import  {Sprite} from "./sprite.js";

export class Screen {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = this.createCanvas(width, height);
        this.context = this.canvas.getContext('2d');
        this.images = {};
        this.isImagesLoaded = false;
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

        mapContext.drawImage(this.images[tileSet.imageName], 0, 0, mapImage.width, mapImage.height );
        this.images[name] = mapImage;
        return new Sprite({
            imageName: name,
            sourceX: 0,
            sourceY: 0,
            width: mapImage.width,
            height: 640,
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
            this.isImagesLoaded = true;
        });
    }

    printText(x, y, text) {
        this.context.fillStyle = "#ffffff";
        this.context.font = "22px Georgia";
        this.context.fillText(text, x, y);
    }

    drawImage(x, y, imageName) {
        this.context.drawImage(this.images[imageName], x, y);
    }

    drawImageFullScreen(x, y, imageName) {
        this.context.drawImage(this.images[imageName], x, y, this.width, this.height);
    }

    drawSprite(sprite) {

        let spriteX = sprite.x;
        let spriteY = sprite.y;

        if(
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
