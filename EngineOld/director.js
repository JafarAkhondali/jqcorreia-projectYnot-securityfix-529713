//require(['keymap']);
//require(['compmanager'])
function Director(parent, env) {
	this.parent = parent;
	var self = this;

	this.env = env;
	this.canvas = document.createElement("canvas");
	this.canvas.className = 'canvas';
	this.canvas.id = 'canvas';

	// Keymap array. True or false = pressed or released
	// This is to be filled by onkeydown/up events
	this.keymap = [];
	
	this.canvas.width = (env == undefined ? 640 : env.width);
	this.canvas.height = (env == undefined ? 480 : env.height);

	parent.appendChild(this.canvas);

	// Dealing with basic input (keyboard and mouse)
	$(document).bind({
		"keydown" :  function(e) {
			self.keymap[e.keyCode] = true;
		},
		"keyup" : function(e) {
			self.keymap[e.keyCode] = false;
		}
	});
	
	$(document).bind({
		"mouseup" :  function(e) {
			console.log("mouseup TODO",e)
		},
		"mousedown" : function(e) {
			console.log("mousedown TODO",e)
		},
		"mouseclick" : function(e) {
			console.log("mouseclick TODO",e)
		}
	});
	
	this.ctx = this.canvas.getContext('2d');
	// make it global
	window.ctx = this.ctx;
	
	this.player = new Player();
	this.start = function() {
		setInterval(this.loop, 1000 / (env == undefined ? 60 : env.fps));
	}

	this.loop = function() {
		self.update();
	}
	this.update = function() {
		ctx.clearRect(0,0, self.env.width, self.env.height);
		self.player.movement.exec();
		self.player.render.exec();
	}
}

// Unit Testing
var director

function initialize() {
	var env = {
		width : 640,
		height : 480
	}
	director = new Director(document.body, env);
	director.start();
}