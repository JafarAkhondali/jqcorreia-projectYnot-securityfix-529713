function ComponentManager() {
	this.position = [];
	this.movement = [];
	this.render = [];
}

var _position = function Position(x, y) {
	var self = this;
	this.x = (x == undefined ? 0 : x);
	this.y = (y == undefined ? 0 : y);

	this.getX = function()
	{
		return self.x
	}
	this.getY = function()
	{
		return self.y
	}
	this.getPos = function()
	{
		return [self.x, self.y];
	}
}

window.cm = new ComponentManager();
cm.position['pos'] = _position;