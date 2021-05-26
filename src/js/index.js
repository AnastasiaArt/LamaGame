import '../index.css';
import { Game } from "./game-desctop.js";
VK.init(function() {
    init();

}, function() {
    alert('Упс, что пошло не так!')
}, '5.131');
let userGlobal = null;
let globalCount = 0;

function init() {
    console.log('11111111111111111111')
    VK.api("users.get", {"fields": "first_name, last_name, id", "v":"5.73"}, function (data) {
        console.log(data)
        userGlobal = data.response[0];
       console.log(userGlobal)
        if (data.response) {
           getCount();
        }

    });
}
function publish() {
    let upload_url = '';
    let photo='';
    let owner_id = '';
    // VK.api("photos.getWallUploadServer", {"v":"5.73"}, function (data) {
    //     console.log(data)
    //    upload_url = data.response;
    //    console.log(upload_url)
    // });
    VK.api("apps.get", {"extended": 1,"v":"5.73"}, function (data) {
        console.log(data.response)
        console.log(data.response.items)
        console.log(data.response.items[0])
        console.log(data.response.items[0].screenshots[0])
        photo = data.response.items[0].screenshots[0].id;
        owner_id = data.response.items[0].screenshots[0].owner_id

        console.log(photo)
        console.log(owner_id)
    });
    // let x;
    //
    // let xhr  = new XMLHttpRequest();              // create XMLHttpRequest
    // let data = new FormData();
    // xhr.responseType = "blob";
    // xhr.onload = function() {
    //     data.append("photo", xhr.response);
    //     x = new XMLHttpRequest();
    //     x.open("POST",upload_url.upload_url,true);
    //     x.send(data);
    // }// create formData object
    // // data.append("photo", image)
    //     xhr.open("GET", "https://anastasiaart.github.io/img/scenes/loading/bg.png");     // open connection
    //     xhr.send();
    //     console.log(data)
    //     console.log(xhr.response)
    // console.log(x.response)
    console.log(`photo-${owner_id}_${photo}`)
    VK.api("wall.post", {"message": "Hello!", "attachments": `photo${owner_id}_${photo}`,"v":"5.73"}, function (data) {
        console.log("Post ID:" + data.response.post_id);
    });
}

function getUser() {
    let user = null;
    VK.api("users.get", {"fields": "first_name, last_name, id", "v":"5.73"}, function (data) {
        user = data.response[0];
        console.log(user)
    });
    return user;
}
export function addCount(value) {
    VK.api("utils.getServerTime", {"v":"5.73"}, function (data) {
        console.log(data)
        if(data.response) {
            VK.api("secure.addAppEvent", {
                "user_id": userGlobal.id,
                "activity_id": 2,
                "value": value,
                "v": "5.73"
            }, function (data) {
                console.log(data)
                console.log(data)
            });
        }
    });
}
export function getCount() {
    VK.api("apps.getScore", {"user_id": userGlobal.id, "v": "5.73"}, function (data) {
        globalCount = data.response;
        console.log(data)
    });
    return  globalCount;

}
// function wallPost(message, image, user_id) {
//     VK.api('photos.getWallUploadServer', {
//         uid: user_id
//     }, function (data) {
//         if (data.response) {
//             $.post('/upload/', {  // url на ВАШЕМ сервере, который будет загружать изображение на сервер контакта (upload_url)
//                 upload_url: data.response.upload_url,
//                 image: image,
//             }, function (json) {
//                 VK.api("photos.saveWallPhoto", {
//                     server: json.server,
//                     photo: json.photo,
//                     hash: json.hash,
//                     uid: user_id
//                 }, function (data) {
//                     VK.api('wall.post', {
//                         message: message,
//                         attachments: data.response['0'].id
//                     });
//                 });
//             }, 'json');
//         }
//     });

window.onload = () => {
    const lamaGame = new Game();
    lamaGame.run();

    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener("mousedown",  (e) => {
        lamaGame.scenes.menu.startGame()}, false);

    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener("mousedown",  (e) => {
        lamaGame.scenes.preStart.setCloseBtn()}, false);

    const retryBtn = document.getElementById('retry-btn');
    retryBtn.addEventListener("mousedown",  (e) => {
        lamaGame.scenes.gameOver.retry()}, false);
    const shareBtn = document.getElementById('share-btn');
    shareBtn.addEventListener("mousedown",  (e) => {
        publish()}, false);

    const toggleMuteBtn = document.getElementById('mute-btn');
    toggleMuteBtn.style.backgroundImage = lamaGame.isMute ? "url('img/btns/mute-off.png')" : "url('img/btns/mute-on.png')";
    toggleMuteBtn.addEventListener("mousedown",  (e) => {
        lamaGame.isMute = !lamaGame.isMute;
        toggleMuteBtn.style.backgroundImage = lamaGame.isMute ? "url('img/btns/mute-off.png')" : "url('img/btns/mute-on.png')";
            for (let audio in lamaGame.screen.audios) {
                if (lamaGame.isMute) {
                lamaGame.screen.audios[audio].volume = 0
            } else {
                   lamaGame.screen.audios[audio].volume = 0.8
            }
        }
    }, false);
};
