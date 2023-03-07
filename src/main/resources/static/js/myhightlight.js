function hl(){
    // debugger;
    hljs.configure({useBR: true});
    // var codeBlocks = document.querySelectorAll("code[class]:not([class=''])");
    // for (var i = 0; i < codeBlocks.length; i++) {
    //     hljs.highlightBlock(codeBlocks[i]);
    // }
    hljs.highlightAll();
    var codeBlocks = document.querySelectorAll("code");
    for (var i = 0; i < codeBlocks.length; i++) {
        codeBlocks[i].style.borderRadius = '7px';
    }
}