import '../index.css';
import { Game } from "./game-desctop.js";
VK.init(function() {
    init();
    publish();
}, function() {
    alert('Упс, что пошло не так!')
}, '5.131');
let user = null;
function init() {
    console.log('11111111111111111111')
    VK.api("users.get", {"fields": "first_name, last_name", "v":"5.73"}, function (data) {
        console.log(data)
       const user_name = data.response[0].last_name + data.response[0].first_name;
       console.log(user_name)
    });
}
function publish() {
    let upload_url = '';
    let photo604='';
    VK.api("photos.getWallUploadServer", {"v":"5.73"}, function (data) {
       upload_url = data.response;
    });
    VK.api("apps.get", {"extended": 1,"v":"5.73"}, function (data) {
        photo604 = data.response.items[0].screenshots[0].photo_604;
    });
    let x;

    let xhr  = new XMLHttpRequest();              // create XMLHttpRequest
    let data = new FormData();
    xhr.responseType = "blob";
    xhr.onload = function() {
        data.append("imageFile", xhr.response);
        x = new XMLHttpRequest();
        x.open("POST",upload_url,true);
        x.send(data);
    }// create formData object
    // data.append("photo", image)
    try {
        xhr.open("GET", "https://anastasiaart.github.io/img/scenes/loading/bg.png");     // open connection
        xhr.send(data);
        console.log(data)
        console.log(xhr.response)
    } catch(err) {
        console.log(err)
    }
    VK.api("wall.post", {"message": "Hello!", "attachments": photo_604,"v":"5.73"}, function (data) {
        console.log("Post ID:" + data.response.post_id);
    });
}

function getUser() {
    let user = null;
    VK.api("users.get", {"fields": "first_name, last_name, user_id", "v":"5.73"}, function (data) {
        user = data.response[0];
        console.log(user)
    });
    return user;
}
export function addCount(value=100) {
    const user = getUser();
    VK.api("secure.addAppEvent", {"user_id": user.user_id, "activity_id": 2, "value":  value, "v":"5.73"}, function (data) {
        console.log(data)
    });
}
export function getCount(value=100) {
    const user = getUser();
    let count = 0;
    VK.api("apps.getScore", {"user_id": user.user_id, "v":"5.73"}, function (data) {
        count = data;
        console.log(data)
    });
}

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
