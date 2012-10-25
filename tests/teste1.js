var x;
var y; 
var vx,vx,ax,ay;

var ipx = -1;
var ipy = -1;
var fpx = -1;
var fpy = -1;

var dragging = false;
var time = date.getTime();

var oldfpx, oldfpy;
var deltaX, deltaY;
var array = [];

var numObjs = 10;


function initialize() {
    x = 0;
    y = canvas.height - 100;
    vx = 100;
    vy = 100;
    ax = 0;
    ay = -196; 
    
    canvas.onmousedown = function() { 
	dragging = true;  
	ipx = event.clientX; 
	ipy = event.clientY; 
	fpx = ipx;
	fpy = ipy;
	oldfpx = fpx;
	oldfpy = fpy;
    };

    canvas.onmousemove = function() {
	if(dragging) {
	    fpx = event.clientX;
	    fpy = event.clientY;
	}
    }

    canvas.onmouseup = function() {
	dragging = false;
	ipx = -1;
	ipy = -1;
	x = fpx;
	y = fpy;
	vx = deltaX;
	vy = -deltaY;
	fpx = -1;
	fpy = -1;
	console.log(x,y,vx,vy,ax,ay);
    }
    for(var c = 0; c < numObjs; c++) {
	array[c] = {
	    x: canvas.width / 2, 
	    y: canvas.height - 20,
	    vx: Math.floor(Math.random()*300) - 150,
	    vy: Math.floor(Math.random()*500)+300,
	    size: Math.floor(Math.random()*50) + 5,
	    color: 'rgb('
		+(Math.floor(Math.random()*255)+100)+','
		+(Math.floor(Math.random()*255)+100)+','
		+Math.floor(Math.random()*0)+')',
	    bounce: Math.abs(Math.random()-0.10),
	    rot: 0.0,
	    angvel: clamp(Math.random(), 0,0.3)
	};
}

function update(timeElapsed) {
    for(var c = 0; c < array.length; c++) {
	var a = array[c];
	a.vx = a.vx + ax * timeElapsed;
	a.vy = a.vy + ay * timeElapsed;
	
	a.x = a.x + a.vx * timeElapsed;
	a.y = a.y - a.vy * timeElapsed;

	a.rot += a.angvel;
	if(a.y + a.size >= canvas.height)
	{
	    a.vy = -a.vy * a.bounce;
	    a.y = canvas.height -a.size;
	}
	if(a.x < 0) {
	    a.vx = -a.vx * a.bounce;
	    a.x = 0;
	}
	if(a.x + a.size > canvas.width) {
	    a.vx = -a.vx * a.bounce;
	    a.x = canvas.width - a.size
	}
	if (Math.abs(a.vy) < 0.5){
	    a.vy=0;
	}
	if (Math.abs(a.vx) < 0.5){
	    a.vx=0;
	}
    }


   if(dragging) {
	console.log(fpx - oldfpx, fpy - oldfpy);
	deltaX = fpx - oldfpx;
	deltaY = fpy - oldfpy;
	oldfpx = fpx;
	oldfpy = fpy;
    }
}
function draw(ctx) {
    if(ipx > 0 && ipy > 0) {
	ctx.beginPath();
	ctx.moveTo(ipx,ipy);
	ctx.lineTo(fpx, fpy);
	ctx.closePath();
	ctx.stroke();
    }
    
    	
    for(var c = 0; c < numObjs; c++) {
	ctx.save();
	ctx.translate(array[c].x + array[c].size/2, array[c].y+array[c].size/2);
	ctx.rotate(array[c].rot);
	ctx.fillStyle = array[c].color;

	ctx.fillRect(-array[c].size/2,-array[c].size/2,array[c].size,array[c].size);
	ctx.restore();
    }
}
