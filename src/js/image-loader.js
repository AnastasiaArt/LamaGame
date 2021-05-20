export class ImageLoader {
    constructor(imageFiles) {
        this.imageFiles = imageFiles;
        this.images = {};
    }

    async load() {
        for (let name in this.imageFiles) {
            if (this.imageFiles.hasOwnProperty(name)) {
                await this.loadImage(name, this.imageFiles[name]);
                console.log('1')
            }
        }
        console.log('2')
    }

    loadImage(name, src) {
        const image = new Image();
        this.images[name] = image;
        image.src = src;
    }
}
