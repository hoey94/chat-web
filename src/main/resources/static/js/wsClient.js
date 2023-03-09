
var socket = new WebSocket("ws://" + location.host + "/chat");


socket.onopen = function (event) {
    $('#chatbox').append(getWelComeContent());

    // 发送心跳消息
    let intervalId = setInterval(function() {

        if(socket.readyState != WebSocket.OPEN){
            clearInterval(intervalId);
            alert('请刷新页面');
            return;
        }

        //console.log("c: 开启心跳机制，每10s 给server发送 ping")
        socket.send('ping');
        //console.log("c: 发送ping 给 server")

    }, 1000 * 60); // 10秒钟发送一次心跳消息
};

socket.onmessage = function (event) {
    if (event.data === 'pong') {
        // 心跳回应，不做处理
        //console.log("c: client 收到server pong")
        return;
    }

    if (event.data === 'ping') {
        //console.log("c: client 收到server ping")
        socket.send('pong');
        //console.log("c: 发送pong 给 server")
        return;
    }

    $('#chatbox').append(getChatContent(event.data));
    lastClickTime = 0;
};