function Director(parent, env) {
	this.parent = parent;
	var self = this;

	this.canvas = document.createElement("canvas");
	this.canvas.className = 'canvas';
	this.canvas.id = 'canvas';

	// Keymap array. True or false = pressed or released
	// This is to be filled by onkeydown/up events
	this.keymap = [];
	
	this.canvas.width = (env == undefined ? 640 : env.width);
	this.canvas.height = (env == undefined ? 480 : env.height);

	parent.appendChild(this.canvas);


	$(document).bind({
		"keydown" :  function(e) {
			self.keymap[e.keyCode] = true;
		},
		"keyup" : function(e) {
			self.keymap[e.keyCode] = false;
		}
	});
	
	this.ctx = this.canvas.getContext('2d');
	console.log(this.ctx);

}

// Unit Testing
var director

function initialize() {
	var env = {
		width : 640,
		height : 480
	}
	director = new Director(document.body);
}