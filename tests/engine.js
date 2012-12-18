//var canvas;

//var ctx;
var time = new Date().getTime();

var env = {
	width : 640,
	height : 480,
    backColor : 'rgb(255,255,255)'
}

Engine = function(parent) {
	this.self = this;
	this.parent = parent;
	
	this.canvas = document.createElement("canvas");
	this.canvas.className = 'canvas';
	this.canvas.id = 'canvas';

	this.canvas.width = env.width;
	this.canvas.height = env.height;
	this.ctx = this.canvas.getContext('2d');
	
	parent.appendChild(this.canvas);
	console.log("before set interval");
}


Engine.prototype.loop = function() {
    var timeElapsed = (new Date().getTime() - time)/ 1000;
    time = new Date().getTime();
    
    this.ctx.save();
    this.ctx.fillStyle = env.backColor;
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.ctx.restore();

    update(timeElapsed);
    draw(this.ctx);
    //requestAnimFrame(loop);
}
//
Engine.prototype.start = function() {
	setInterval(this.loop, 1000/60);
}

Engine.prototype.env = env;
