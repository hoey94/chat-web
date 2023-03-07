let lastClickTime = 0;
// 间隔时间10秒
let intervalTime = 1000 * 10;
var chatbotPic = "./assert/chatgpt.png";
var chatbotName = "GPT-3.5";
var userPic = "./assert/user.svg";
var userName = "小可爱";
var socket = new WebSocket("ws://" + location.host + "/chat");


// window.addEventListener("load", setDocumentHeight);

setInterval(function () {
    if (socket.readyState === WebSocket.OPEN) {
        console.log('websocket is open');
    }else{
        console.log('websocket is not open, reconnect...');
        socket = new WebSocket("ws://" + location.host + "/chat");
    }
}, 5000);

socket.onopen = function (event) {
    $('#chatbox').append(getWelComeContent());
};

socket.onmessage = function (event) {
    $('#chatbox').append(getChatContent(event.data));
    lastClickTime = 0;
};

function sendMeg() {
    // console.log('click');
    var message = $('#chatInput').val().trim();
    if (message === undefined || message === null || message === '') {
        return;
    }

    // 如果正在频繁访问机器人，就return掉
    if (checkIntervalTime()) {
        $('#chatbox').append(getTipContent());
        return;
    }

    $('#chatbox').append(getUserContent(message));
    $('#chatInput').val('');
    socket.send(message);
}

// 监听输入框的 keyup 事件

$(document).on('keydown', function (event) {
    // console.log('keydown');
    // 如果按下的是回车键（keyCode 为 13），则触发按钮点击事件
    if (event.keyCode === 13) {
        // console.log(13);
        sendMeg();
    }
});

// 用来检查是否频繁访问机器人
function checkIntervalTime() {
    var flag = true;
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < intervalTime) {
        console.log('请不要频繁点击提交按钮。');
        flag = true;
    } else {
        flag = false;
    }
    lastClickTime = currentTime;
    return flag;
}

function getChatContent(data) {
    let html = '<div class="chat-message">';
    html += '<div class="chat-message-avatar">'
    html += '<img src="' + chatbotPic + '" alt="">'
    html += '</div>'
    html += '<div class="chat-message-content">'
    html += '<span>' + chatbotName + '&nbsp;&nbsp;' + getCurrentDate() + '</span>'
    html += '<p>' + marked.parse(data) + '</p>'
    html += '</div>'
    html += '</div>'
    return html;
}

function getUserContent(data) {
    let html = '<div class="chat-message">';
    html += '<div class="chat-message-avatar">'
    html += '<img src="' + userPic + '" alt="">'
    html += '</div>'
    html += '<div class="chat-message-content">'
    html += '<span>' + userName + '&nbsp;&nbsp;' + getCurrentDate() + '</span>'
    html += '<p>' + data + '</p>'
    html += '</div>'
    html += '</div>'
    return html;
}

// 获取welcome content
function getWelComeContent() {

    let html = '<div class="chat-message">';
    html += '<div class="chat-message-avatar">'
    html += '<img src="' + chatbotPic + '" alt="">'
    html += '</div>'
    html += '<div class="chat-message-content">'
    html += '<span>' + chatbotName + '&nbsp;&nbsp;' + getCurrentDate() + '</span>'
    html += '<p>Welcome to the chat room !</p>'
    html += '</div>'
    html += '</div>'
    // console.log(html)
    return html;
}

function getTipContent() {
    let tip = '疯狂转动小脑思考问题，请您耐心等待...';
    let html = '<div class="chat-message">';
    html += '<div class="chat-message-avatar">'
    html += '<img src="' + chatbotPic + '" alt="">'
    html += '</div>'
    html += '<div class="chat-message-content">'
    html += '<span>' + chatbotName + '&nbsp;&nbsp;' + getCurrentDate() + '</span>'
    html += '<p>' + tip + '</p>'
    html += '</div>'
    html += '</div>'
    // console.log(html)
    return html;
}


// 用户拼接时间
function getCurrentDate() {
    const now = new Date();
    const month = (now.getMonth() + 1).toString();
    const day = now.getDate().toString().padStart(2, '0');
    let hour = now.getHours();
    const isAM = hour < 12;
    if (hour > 12) {
        hour -= 12;
    }
    if (hour === 0) {
        hour = 12;
    }
    const minute = now.getMinutes().toString().padStart(2, '0');
    const ampm = isAM ? '上午' : '下午';
    return `${month}月${day}日 ${ampm}${hour}:${minute}`;
}

// 动态设置页面高度，修正滚动条bug
// function setDocumentHeight() {
//     const body = document.body;
//     const html = document.documentElement;
//     const height = Math.max(
//         body.scrollHeight,
//         body.offsetHeight,
//         html.clientHeight,
//         html.scrollHeight,
//         html.offsetHeight
//     );
//     console.log("set height" + height)
//     alert(body.scrollHeight)
//     alert(body.offsetHeight)
//     alert(body.clientHeight)
//     alert(html.clientHeight)
//     alert(html.scrollHeight)
//     alert(html.offsetHeight)
//     // $("#chatbox").css("min-height", height + "px");
//     $("#chatbox").css("max-height","100vh");
// }
