var x = 0;
var keycode;

var done = false;

var K_A = 65;
var K_D = 68;
var K_W = 87;
var K_SHIFT = 16;

var player = {
    x : 200,
    y : 200,
    vx : 0,
    vy : 0,
    walkspeed : 100,
	runspeed : 175
};

var scene = {
    friction : 50,
    gravity : -980
}

var map = [[1,1,1,1,1,1,1,1,1,1],
           [1,0,0,0,0,0,0,0,0,1],
           [1,0,0,0,1,0,0,0,0,1],
           [1,0,1,0,0,0,0,0,0,1],
           [1,0,0,0,0,1,0,0,0,1],
           [1,0,0,0,0,0,0,0,0,1],
           [1,0,0,0,0,0,1,0,0,1],
           [1,1,1,1,1,1,1,1,1,1]];

var blockList = [];

var blockW, blockH;

var keymap = [];

var run = false;
function initialize() {
    env.backColor = 'rgb(100,100,255)'

    console.log("init");
    $("#myCanvas").bind( {
    	keydown : function(e) {
    	    keycode = e.keyCode;
    	    keymap[e.keyCode] = true;
    	},
    	keyup : function(e) {
    	    keymap[e.keyCode] = false;
    	}
    });
    
    $("#myCanvas").focus();
    player.ay = 0;
    
    
    // Initialize map
    blockW = canvas.width / map[0].length;
    blockH = canvas.height / map.length;
    
    console.log(blockW, blockH);
    
    var t = 0;

    for(y = 0; y < map.length; y++) {
    	for(x = 0; x < map[1].length; x++) {
    		if(map[y][x] != 0) {
    			blockList[t++] = {
    				x : x * blockW,
    				y : y * blockH,
    				w : blockW,
    				h : blockH,
    				color : 'rgb(0,'+(Math.floor(Math.random()*255))+',0)'
    			};
    		}
    	}
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
		if(player.vy == 0)
			player.vy = -400;
		if(onawall) {
			player.vx = 75;
			player.vy = -600;
		}
	}
	if(keymap[K_SHIFT]) {
		run = true;
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

function update(time) {
    keyEvents();
    
	var ax = player.ax;
    var ay = scene.gravity + player.ay;


    
//    if(player.vx > 0) ax = -scene.friction;
//    if(player.vx < 0) ax = scene.friction;

    player.vx = player.vx + ax * time;
    player.vy = player.vy - ay * time;
    
    onawall = false;
    for(var i in blockList) {
    	
    	var block = blockList[i];
    	var res = checkOverlap(player.x + player.vx * time, player.y, 10, 10, block.x, block.y, blockW, blockH);
    	if(res) {
    		player.vx = 0;
    		onawall = true;
    	}
    }
    player.x = player.x + player.vx * time;
    
    for(var i in blockList) {
    	var block = blockList[i];
    	var res = checkOverlap(player.x, player.y + player.vy * time, 10, 10, block.x, block.y, blockW, blockH);
    	if(res) {
    		console.log("asd");
    		player.vy = 0;
    	}
    }
    player.y = player.y + player.vy * time;
}

function draw(ctx) {
    ctx.fillRect(player.x,player.y,10,10);
    ctx.fillText(keycode,20,20);
    for(var i in blockList) {
    	var block = blockList[i];
    	ctx.fillStyle = block.color;
    	ctx.fillRect(block.x, block.y, block.w, block.h);
    }
}
