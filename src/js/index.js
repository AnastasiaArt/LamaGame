import '../index.css';
import { Game } from "./game-desctop.js";
VK.init(function() {
    init();
    publish();
}, function() {
    alert('Упс, что пошло не так!')
}, '5.131');
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
    VK.api("photos.getWallUploadServer", {"v":"5.73"}, function (data) {
       upload_url = data.response;
    });
    VK.api("apps.get", {"v":"5.73"}, function (data) {
        console.log(data.response);
    });

    const image = {
        uri: "https://anastasiaart.github.io/img/scenes/loading/bg.png",
        type: 'image/jpeg',
        name: 'imgToWall.png'
    }
    let xhr  = new XMLHttpRequest();              // create XMLHttpRequest
    let data = new FormData();                // create formData object
    data.append("photo", image)
    try {
        xhr.open("post", upload_url);      // open connection
        xhr.send(data);
        console.log(data)
        console.log(xhr.response)
    } catch(err) {
        console.log(err)
    }
    VK.api("wall.post", {"message": "Hello!", "v":"5.73"}, function (data) {
        console.log("Post ID:" + data.response.post_id);
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
