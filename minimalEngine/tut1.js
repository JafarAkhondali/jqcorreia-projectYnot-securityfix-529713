const FPS = 60;
var time = new Date().getTime();

const K_UPARROW = 38;
const K_DOWNARROW = 40;
const K_LEFTARROW = 37;
const K_RIGHTARROW = 39;
const K_SHIFTARROW = 16;
const K_SPACEARROW = 32;

const VELOCITYFACTOR = 200;
const ACCELERATIONFACTOR = 100;
const JUMPFACTOR = -350;

var keymap = [];
var keycode;

var canvas = null;
var context2d = null;
var image = new Image();

/** VARIAVEL QUE VAI GUARDAR A INSTANCIA DO OBJECTO ENTITY **/
var player = null;

var world = {
		gravity: -980	
}


window.onload = init;


function init()
{	
	console.log('init');
	canvas = document.getElementById('canvas');
	context2d = canvas.getContext('2d');
	
	$("#canvas").bind({
			keydown: function(e){
				keycode = e.keyCode;	
				keymap[e.keyCode] = true;
			},	
			keyup: function(e){
				keymap[e.keyCode] = false;
			}
		});
	
	$("#canvas").focus();
	
	image.src = "monster.png";
	
	player = new Entity(image, canvas);
	/*
	player.setPosX(0);
	player.setPosY(canvas.height - image.height);
	*/
	player.setPosX(200);
	player.setPosY(200);
	
		
	setInterval(update, 1000/FPS);
}

function keyevents()
{	
	if(keymap[K_UPARROW])		
		player.setVelY((JUMPFACTOR));
	

	if(keymap[K_DOWNARROW] && world.gravity == 0)
		player.setVelY(VELOCITYFACTOR);
	
	
	if(keymap[K_LEFTARROW])		
		player.setVelX((-VELOCITYFACTOR));
		//player.setAccX(-ACCELERATIONFACTOR);
	
	if(keymap[K_RIGHTARROW])
		player.setVelX((VELOCITYFACTOR));
		//player.setAccX(ACCELERATIONFACTOR);
	
	if(!keymap[K_LEFTARROW] && !keymap[K_RIGHTARROW])
	{	
		player.setAccX(0);
		player.setVelX(0);
	}	
	
		
	if(!keymap[K_UPARROW] && !keymap[K_DOWNARROW] && world.gravity == 0)
	{	
		player.setAccY(0);
		player.setVelY(0);
	}	
		
}

function update()
{	
	var timeElapsed = (new Date().getTime() - time)/ 1000;
    time = new Date().getTime();
	
	keyevents();
	redefineWorld(timeElapsed);
	draw();
}


function redefineWorld(timeElapsed)
{
	var initialPosX = player.getPosX();
	var initialPosY = player.getPosY();	
	
	player.update(world, timeElapsed,0);
		
    /*** ESTE SISTEMA DE VER VOLTAR À POSIÇÃO ANTERIOR É UMA MERDA ***/
	if(!insideCanvasX(player.getPosX(), canvas, image))
	{
		player.setPosX(initialPosX);
	}
	
	
	if(!insideCanvasY(player.getPosY(), canvas, image))
	{
		console.log('fora do canvas');	
		player.setPosY(initialPosY);
	}

	
}

function draw()
{
	context2d.clearRect(0, 0, canvas.width, canvas.height);
	player.draw(context2d);
	//context2d.fillRect(player.posX, player.posY, 10 , 10);
}
