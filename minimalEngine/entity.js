//Constructor
Entity = function(image, canvas)
{
	this.posX = 0;
	this.posY = 0;
	this.velX = 0;
	this.velY = 0;
	this.accX = 0;
	this.accY = 0;	
	this.image = image;
	this.halfImageWidth = (image.width/2);
	this.halfImageHeight = (image.height/2);
	this.canvas = canvas;
	this.halfCanvasWidth = (canvas.width/2);
	this.halfCanvasHeight = (canvas.height/2);
}

//Methods
Entity.prototype.draw = function(context2d) 
{	
	/***** FUTURAMENTE É PARA REMOVER O CÓDIGO E POR A EXTENDER ESTA CLASE E AÍ SIM DEFINIR O DRAW ******/	
	//context2d.drawImage(this.image, this.posX, this.posY);
	var invertY = canvas.height - this.posY;
	var factorScaleY = invertY * 0.00175;
	
	context2d.save();
	
	context2d.translate((this.posX + this.halfImageWidth), (this.posY + this.halfImageHeight));
	context2d.translate(this.halfImageWidth * (1 - (0.3 + factorScaleY)), this.halfImageHeight * (1 - 1));
	
	context2d.scale(0.3 + factorScaleY, 1);
	context2d.drawImage(image,0,0);
	
	context2d.translate(-(this.halfImageWidth * (1 - (0.3 + factorScaleY))), -(this.halfImageHeight * (1 - 1)));
	context2d.translate(-(this.posX + this.halfImageWidth), -(this.posY + this.halfImageHeight));
	
	
	context2d.restore();
}	

Entity.prototype.update = function(world, timeElapsed) 
{
	/***** FUTURAMENTE É PARA REMOVER O CÓDIGO E POR A EXTENDER ESTA CLASE E AÍ SIM DEFINIR O UPDATE ******/	
	var accX = this.accX;
	var accY = this.accY + world.gravity;
	
	this.velX = this.velX + accX * timeElapsed;	
	this.velY = this.velY - accY * timeElapsed;
	
	this.posX = this.posX + this.velX * timeElapsed;
	this.posY = this.posY + this.velY * timeElapsed;		
}


//Getters and Setters
Entity.prototype.getPosX = function() 
{
	return this.posX;	
}

Entity.prototype.getPosY = function() 
{
	return this.posY;	
}

Entity.prototype.setPosX = function(posX) 
{
	this.posX = posX;	
}

Entity.prototype.setPosY = function(posY) 
{
	this.posY = posY;	
}

Entity.prototype.getVelX = function() 
{
	return this.velX;	
}

Entity.prototype.getVelY = function() 
{
	return this.velY;	
}

Entity.prototype.setVelX = function(velX) 
{
	this.velX = velX;	
}

Entity.prototype.setVelY = function(velY) 
{
	this.velY = velY;	
}

Entity.prototype.getAccX = function() 
{
	return this.accX;	
}

Entity.prototype.getAccY = function() 
{
	return this.accY;	
}

Entity.prototype.setAccX = function(accX) 
{
	this.accX = accX;	
}

Entity.prototype.setAccY = function(accY) 
{
	this.accY = accY;	
}

