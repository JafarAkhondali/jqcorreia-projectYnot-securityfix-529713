var x = 0;
var keycode;

var done = false;

var K_A = 65;
var K_D = 68;
var K_W = 87;
var K_SHIFT = 16;
var K_LEFT = 37;
var K_RIGHT = 39;
var K_PLUS = 187;
var K_MINUS = 189;

var player = {
    x : 1,
    y : 1,
    vx : 0,
    vy : 0,
    walkspeed : 100,
	runspeed : 175
};

var scene = {
    friction : 50,
    gravity : -980
}

var rope = {
	x : 0,
	y : 0,
	dirx : 0,
	diry : 0,
	speed : 20
}
var blockList = [];

var blockW, blockH;

var keymap = [];

var run = false;

var map;
var camera;

function Camera(x,y,w,h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.zoom = 1;
}

function initialize() {
	console.log("init");
	var engine = new Engine(document.body);
	engine.start();
	
	map = new Map("area01.tmx");
	camera = new Camera(0,0,640,480);
	console.log(camera);
    env.backColor = 'rgb(100,100,255)'

    $(canvas).bind( {
    	keydown : function(e) {
    	    keycode = e.keyCode;
    	    keymap[e.keyCode] = true;
    	},
    	keyup : function(e) {
    	    keymap[e.keyCode] = false;
    	}
    });
    
    $(canvas).focus();
    player.ay = 0;
    
    canvas.onmousedown = function() {
    	rope.dirx = (event.clientX - player.x);
    	rope.diry = (event.clientY - player.y);
    	
    	rope.dirx /= vec_module(rope.dirx,rope.diry);
    	rope.diry /= vec_module(rope.dirx,rope.diry);
    	
    	rope.x = player.x;
    	rope.y = player.y;
    	console.log(rope.dirx, rope.diry, rope.x, rope.y);
    }
    
}

var c = 0;

function keyEvents() {
	// Press events
	if(keymap[K_A]) {
		player.ax = -300;
	}
	if(keymap[K_D]) {
		player.ax = 300;
	}
	if(keymap[K_W]) {
		if(base)
			player.vy = -400;
		if(onawall) {
			player.vx = (onawall == 1 ? -75 : 75);
			player.vy = -600 
		}
	}
	if(keymap[K_SHIFT]) {
		run = true;
	}
	if(keymap[K_LEFT]) {
		camera.x -= 5;
	}	
	if(keymap[K_RIGHT]) {
		camera.x += 5;
	}
	if(keymap[K_PLUS]) {
		camera.zoom -= 0.05;
	}	
	if(keymap[K_MINUS]) {
		camera.zoom += 0.05;
	}
	// Release events
	if(!keymap[K_SHIFT]) {
		run = false;
	}
	if(!keymap[K_A] && !keymap[K_D]) {
		player.ax = 0;
		player.vx = 0;
	}
}
var first = true;
function update(time) {
    keyEvents();
    
	var ax = player.ax;
    var ay = scene.gravity + player.ay;
    
//    if(player.vx > 0) ax = -scene.friction;
//    if(player.vx < 0) ax = scene.friction;

    player.vx = player.vx + ax * time;
    player.vy = player.vy - ay * time;
    
    onawall = 0;
    base = false;
    
    for(var y in map.tiles) {
		for ( var x in map.tiles[y]) {
			var tile = map.tiles[y][x];
			if(tile.gid == 0) continue;
			var res = checkOverlap(player.x + player.vx * time, player.y, 10,
					10, tile.x, tile.y, tile.w, tile.h);
			if (res.v) {
				player.vx = 0;
				if (player.x < tile.x + tile.w)
					onawall = 1;
				if (player.x + 10 > tile.x)
					onawall = 2;
			}
		}
    }
    player.x = player.x + player.vx * time;

    for(var y in map.tiles) {
		for ( var x in map.tiles[y]) {
			var tile = map.tiles[y][x];
			if(tile.gid == 0) continue;
			var res = checkOverlap(player.x, player.y + player.vy * time, 10,
					10, tile.x, tile.y, tile.w, tile.h);
			if (res.v) {
				player.vy = 0;
				if (player.y < tile.y + tile.h)
					base = true;
			}
		}
    }
    player.y = player.y + player.vy * time;
}

function draw(ctx) {
	console.log("draw");
	ctx.save();
	ctx.translate(-camera.x,-camera.y);
	ctx.scale(camera.zoom, camera.zoom);
    ctx.fillRect(player.x,player.y,10,10);
    ctx.fillText(keycode,20,20);
	for ( var y = 0; y < map.tiles.length; y++) {
		for ( var x = 0; x < map.tiles[0].length; x++) {
			var tile = map.tiles[y][x];
			var coord = map.getTilesetCoordinates(tile.gid);
			ctx.drawImage(map.tileset, coord.x * 32, coord.y * 32, tile.w,
					tile.h, tile.x, tile.y, tile.w, tile.h);
		}
	}
	ctx.restore();
}
