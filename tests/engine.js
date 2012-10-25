var canvas;
var ctx;
var time = new Date().getTime();

var env = {
    backColor : 'rgb(255,255,255)'
}

window.onload = function() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    initialize();
    setInterval(loop,1000/60);
};

requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
     window.webkitRequestAnimationFrame ||
     window.mozRequestAnimationFrame ||
     window.oRequestAnimationFrame ||
     window.msRequestAnimationFrame ||
     function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
       window.setTimeout(callback, 1000/15);
     };
})();



function loop() {
    var timeElapsed = (new Date().getTime() - time)/ 1000;
    time = new Date().getTime();
    
    ctx.save();
    ctx.fillStyle = env.backColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    update(timeElapsed);
    draw(ctx);
    //requestAnimFrame(loop);
}
