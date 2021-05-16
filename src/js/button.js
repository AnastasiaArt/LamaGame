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

        // console.log(this.width)
        // console.log(this.height)
        // const ratio = innerHeight/700
        // const difY = innerHeight > 700 ? 0 :700 - innerHeight;
        // const difX = innerWidth > 700 ? 0 : 700 - innerWidth;
        // const difEndY = difY === 0 ? 0 : difY - this.height;
        // const dif = (innerHeight - innerWidth) / 2;
        // console.log( e.offsetY + difY  >= this.y)
        // console.log(e.offsetY)
        // console.log( e.offsetY + difY )
        // console.log(this.y)
        // console.log(this.y + this.height* ratio)
        // console.log(e.offsetY + difY < this.y + this.height* ratio)
        // return difY/2 + e.offsetX >= this.x + (this.width - this.width * ratio)/2 && (e.offsetX + difY/2)  < this.x +  (this.width - this.width * ratio)/2 + (this.width * ratio) && e.offsetY + difY  >= this.y && e.offsetY + difY < this.y + this.height* ratio;
    }
}

