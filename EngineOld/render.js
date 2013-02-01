cm.render['square'] = function SquareRender(obj) {
	self = this;
	this.obj = obj;
	this.exec = function() {
		ctx.fillRect(self.obj.position.getX(), self.obj.position.getY(), 10, 10);
	}
}

cm.render['custom'] = function CustomRender(obj, func) {
	self = this;
	this.obj = obj;
	this.exec = func;
}

