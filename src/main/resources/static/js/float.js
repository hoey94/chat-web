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
