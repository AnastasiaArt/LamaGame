export class Button {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    //Проверяем входит ли точка в  область кнопки
    checkCollision(e) {
        return e.offsetX >= this.x && e.offsetX < this.x + this.width && e.offsetY >= this.y && e.offsetY < this.y + this.height;
        // return difY/2 + e.offsetX >= this.x + (this.width - this.width * ratio)/2 && (e.offsetX + difY/2)  < this.x +  (this.width - this.width * ratio)/2 + (this.width * ratio) && e.offsetY + difY  >= this.y && e.offsetY + difY < this.y + this.height* ratio;
    }
}

