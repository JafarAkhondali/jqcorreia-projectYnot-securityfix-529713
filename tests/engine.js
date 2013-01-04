var env = {
	width : 640,
	height : 480,
    backColor : 'rgb(255,255,255)'
}

function Engine(parent) {
	var self = this;
	this.parent = parent;
	
	this.canvas = document.createElement("canvas");
	this.canvas.className = 'canvas';
	this.canvas.id = 'canvas';

	this.canvas.width = env.width;
	this.canvas.height = env.height;
	this.ctx = this.canvas.getContext('2d');
	console.log(this.ctx)
	parent.appendChild(this.canvas);
	console.log("before set interval");
	this.time = new Date().getTime();
	
//	this.start = start;
//	this.loop = loop;
	
	this.start = function() {
		setInterval(this.loop, 1000/60);
	}
	
	
	this.loop = function() {
	    var timeElapsed = (new Date().getTime() - this.time)/ 1000;
	    self.time = new Date().getTime();
	    
	    self.ctx.save();
	    self.ctx.fillStyle = env.backColor;
	    self.ctx.fillRect(0, 0, canvas.width, canvas.height);
	    self.ctx.restore();

	    update(timeElapsed);
	    draw(self.ctx);
	}
}
