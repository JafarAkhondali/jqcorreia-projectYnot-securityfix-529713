var x = 0;
var keycode;

var done = false;

var player = {
    x : 10,
    y : 350,
    vx : 0,
    vy : 0
};

var scene = {
    friction : 50,
    gravity : -196
}

function initialize() {
    env.backColor = 'rgb(100,100,255)'

    console.log("init");
    $("#myCanvas").bind( {
    	keydown : function(e) {
    	    keycode = e.keyCode;
    	    if(keycode == 65) player.vx = -50;
    	    if(keycode == 68) player.vx = 50;
	    if(keycode == 87) {
		console.log("jump");
		player.ay = 400;
	    }
    	},
    	keyup : function(e) {
    	    keycode = 0;
	    player.ay = 0;
    	}
    });
    $("#myCanvas").focus();
}
var c = 0;
function update(time) {
    var ax = 0;
    var ay = scene.gravity;
    if(player.vx > 0) ax = -scene.friction;
    if(player.vx < 0) ax = scene.friction;

    player.vx = player.vx + ax * time;
    player.vy = player.vy - ay * time;

    player.x = player.x + player.vx * time;
    player.y = player.y + player.vy * time;

    player.y = clamp(player.y, 0,400);
}

function draw(ctx) {
    ctx.fillRect(player.x,player.y,10,10);
    ctx.fillText(keycode,20,20);
}
