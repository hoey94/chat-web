const logo = document.querySelector('#logo');
const div = document.querySelector('.chat-header');
const floatBoxLogo = document.querySelector('#logo');
const sendBut = document.querySelector('#sendBtn');


// 蓝、 红 、 紫
let colors = ["#3498db", "#db348a","#8734db"];
let index = 0;

logo.addEventListener('click', function() {
    index = (index + 1) % colors.length;
    div.style.backgroundColor = colors[index];
    floatBoxLogo.style.backgroundColor = colors[index];
    sendBut.style.color = colors[index];
});


var box = document.querySelector(".floating-box");
var isDragging = false;
var mouseOffset = { x: 0, y: 0 };

box.addEventListener("mousedown", function(event) {
    isDragging = true;
    mouseOffset.x = event.clientX - box.offsetLeft;
    mouseOffset.y = event.clientY - box.offsetTop;
});

box.addEventListener("mouseup", function(event) {
    isDragging = false;
});

box.addEventListener("mousemove", function(event) {
    if (isDragging) {
        box.style.left = (event.clientX - mouseOffset.x) + "px";
        box.style.top = (event.clientY - mouseOffset.y) + "px";
    }
});