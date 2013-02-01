cm.movement['line'] = function Line(obj) {
	this.exec = function() {
		obj.position.x = obj.position.x + 2;
	}
}