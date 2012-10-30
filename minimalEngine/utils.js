function insideCanvasX(posX, canvas, image)
{
	if (posX >= 0 && (posX+image.width) <= canvas.width)
		return true;
	
	return false;
}

function insideCanvasY(posY, canvas, image)
{
	if (posY >= 0 && (posY+image.height) <= canvas.height)
		return true;
	
	return false;
}