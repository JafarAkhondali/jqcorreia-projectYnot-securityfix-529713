function Player() {
	this.position = new cm.position['pos'](20,20);
	this.render = new cm.render['square'](this);
	this.movement = new cm.movement['line'](this);
}