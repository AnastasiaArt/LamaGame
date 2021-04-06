import { Game } from "./game.js";

window.onload = () => {
    const lamaGame = new Game();
    document.getElementById('start-btn').onclick = () => {
        document.querySelector('.start-screen').style.display = 'none';
        lamaGame.run();
    }
};

// var btnRetry = {
//     x:canvas.width/2 - 60,
//     y:canvas.height/2 - 20,
//     w:120,
//     h:40,
//     text:"Retry",
//     state:"default",
//     draw: function(){
//         ctx.font = "20px Arial ";
//         switch(this.state){
//             case "over":
//                 ctx.fillStyle = "darkred";
//                 ctx.fillRect(this.x,this.y,this.w,this.h);
//                 ctx.fillStyle = "black";
//                 ctx.fillText("Retry?",this.x+this.w/2 - ctx.measureText("Retry").width/2,this.y+this.h/2+10 );
//                 break;
//             default:
//                 ctx.fillStyle = "red";
//                 ctx.fillRect(this.x,this.y,this.w,this.h);
//                 ctx.fillStyle = "black";
//                 ctx.fillText("Retry",this.x+this.w/2 - ctx.measureText("Retry").width/2,this.y+this.h/2+10 );
//         }
//     }
// };
// btnRetry.draw();
// canvas.addEventListener("mousedown",function(e){
//     if(checkCollision(e.offsetX,e.offsetY,btnRetry ))
//         alert("Retrying!")
// },false);
//
//
// canvas.addEventListener("mousemove",function(e){
//     btnRetry.state = checkCollision(e.offsetX,e.offsetY,btnRetry )?"over":"def";
//     btnRetry.draw();
// },false);
//
// function checkCollision(x,y,obj){//Проверяет входит ли точка в  прямоугольник
//     return x >= obj.x && x <= obj.x + obj.w &&
//         y >= obj.y && y <= obj.y + obj.h ;
// }

// var view = new Object();
// view.start = function(){
//     this.width = 1000;
//     this.height = 400;
//     this.color = "#e9e9e9";
//     this.canvas = document.createElement('canvas');
//     this.canvas.width = this.width;
//     this.canvas.height = this.height;
//     document.body.prepend(this.canvas);
//     this.c = this.canvas.getContext('2d');
//     this.c.fillStyle = this.color;
//     this.c.fillRect(0, 0, this.width, this.height);
//
//     // Create button. Вот как то так реализовывал.
//     this.create_button = function(name = "Button", func = function(){alert("Button");}, x = 0, y = 0, width = 180, height = 50){
//         let height_text = height * .6;
//         let view_button = function(on = false){
//             this.c.fillStyle = on ? "#ffc500" : "#888";
//             this.c.fillRect(x, y, width, height);
//             this.c.fillStyle = on ? "#000" : this.color;
//             this.c.font = height_text+"pt sans-serif";
//             this.c.fillText(name, x + (width - this.c.measureText(name).width) / 2 , y + (height - height_text) / 2 + height_text);
//         }.bind(this);
//         view_button();
//         let move_button = function(e){
//             view_button(e.offsetX >= x && e.offsetX < x + width && e.offsetY >= y && e.offsetY < y + height);
//         }
//         this.canvas.addEventListener("mousemove", move_button);
//         let click_button = function(e){
//             if(e.offsetX >= x && e.offsetX < x + width && e.offsetY >= y && e.offsetY < y + height)func();
//         }
//         this.canvas.addEventListener("click", click_button);
//         let remove_button = function(){
//             this.c.fillStyle = this.color;
//             this.c.fillRect(x, y, width, height);
//             this.canvas.removeEventListener("mousemove", move_button);
//             this.canvas.removeEventListener("click", click_button);
//         }.bind(this);
//         return remove_button;
//     }.bind(this);
//
//     let remove_button = this.create_button("test", function(){alert("test");}, 10, 150, 120, 50);
//     this.create_button('remove_button "test"', remove_button, 100, 10, 900, 100);
// }
// window.onload = function(){
//     view.start();
// }
