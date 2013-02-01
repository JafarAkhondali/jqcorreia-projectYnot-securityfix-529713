var canvas; 
var gl;

var renderer;
var camera;
var scene;


var checker = new THREE.ImageUtils.loadTexture('checker_large.gif');
var W = 800;
var H = 600;

var metal = new THREE.MeshPhongMaterial({
	color : 0x0000CC,
	metal : true,
	map : checker
})

var pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.x = 0;
pointLight.position.y = 0;
pointLight.position.z = 130;

var controls;
var createCubes = function() {
	console.log(map.tiles);
	for(var i in map.tiles) {
		for(var j in map.tiles[i]) {
			
			var t = map.tiles[i][j];

			if(t.gid == 0) continue;

			var cube = new THREE.Mesh(new THREE.CubeGeometry(t.w, t.h, t.w, 1,1), metal);
			cube.position.x = t.x - (t.w / 2);
			cube.position.y = -(t.y - (t.h / 2));
			cube.castShadow = true;
			cubeList[i] = cube;

			scene.add(cube);
		}	
	}
}
var map;
var cubeList = [];
var player = {
    x : 1,
    y : 100,
    vx : 0,
    vy : 0,
    ax : 0,
    ay : 0,
    walkspeed : 100,
	runspeed : 175
};

var config = {
    friction : 50,
    gravity : -980

}
function initialize() {
	renderer = new THREE.WebGLRenderer();
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
	scene = new THREE.Scene();

	map = new Map("../tests/area01.tmx", "../tests/tileset.png", createCubes);

	oPlayer = new THREE.Mesh(new THREE.CubeGeometry(10,10,10,1,1), new THREE.MeshPhongMaterial({ color : 0x00ff00}));
	oPlayer.position.x = player.x;
	oPlayer.position.y = player.y
	oPlayer.castShadow = true;
	controls = new THREE.TrackballControls(camera);
	scene.add(camera);
	scene.add(oPlayer);
	scene.add(pointLight);
	camera.position.z = 1200;

	renderer.setSize(window.innerWidth, window.innerHeight);

		// must enable shadows on the renderer 
	renderer.shadowMapEnabled = true;

	// "shadow cameras" show the light source and direction
	
	
	spotlight = new THREE.SpotLight(0xffffFF);
	spotlight.position.set(-60,150,-30);
	spotlight.shadowCameraVisible = true;
	spotlight.shadowDarkness = 0.95;
	spotlight.intensity = 1;
	
	// must enable shadow casting ability for the light
	spotlight.castShadow = true;
	scene.add(spotlight);


	document.body.appendChild(renderer.domElement);
	
	setInterval(loop, 1000 / 60);
	document.onkeydown = function(e) {
		if(e.keyCode == 65) player.ax = -300;
		if(e.keyCode == 68) player.ax = 300;
		if(e.keyCode == 87) {
			console.log("jump");
			if(base)
				player.vy = 400;
			if(onawall) {
				player.vx = (onawall == 1 ? -75 : 75);
				player.vy = -600 
			}
		}
	}
	document.onkeyup = function(e) {
		if(e.keyCode == 65 || e.keyCode == 68) {
			player.ax = 0;
			player.vx = 0;		
		}
	}
}

var acc = 0;

var origin = new THREE.Vector3(0,0,0);

var update = function(time) {
	var ax = player.ax;
    var ay = config.gravity + player.ay;
//    if(player.vx > 0) ax = -scene.friction;
//    if(player.vx < 0) ax = scene.friction;

	
    player.vx = player.vx + ax * time;
    player.vy = player.vy + ay * time;
    

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

	oPlayer.position.x = player.x;
	oPlayer.position.y = player.y;
}

var time = new Date().getTime();

var loop = function() {
	timeElapsed = (new Date().getTime() - time) / 1000;
	time = new Date().getTime()
	update(timeElapsed);
	draw();
}

function draw() {
	/*
	if(down) {
		pointLight.position.y = pointLight.position.y - 2;
	}
	else {
		pointLight.position.y = pointLight.position.y + 2;
	}
	if(pointLight.position.y > 200 && down == false) {
		down = true;

	}
	else if(pointLight.position.y < -200 && down == true) {
		down = false
	}
	
	cube.position.x = cube.position.x + acc;
	sphere.geometry.dynamic = true;
	var geometry = cube.geometry;
	geometry.verticesNeedUpdate = true;
	geometry.elementsNeedUpdate = true;
	geometry.morphTargetsNeedUpdate = true;
	geometry.uvsNeedUpdate = true;
	geometry.normalsNeedUpdate = true;
	geometry.colorsNeedUpdate = true;
	geometry.tangentsNeedUpdate = true;

	for(var ver in geometry.vertices) {
		var v = geometry.vertices[ver];
		var offset = Math.random() * 0.5;
		
		v.x = v.x + (offset * (Math.random() < 0.5 ? -1 : 1));
		v.y = v.y + (offset * (Math.random() < 0.5 ? -1 : 1));
		v.z = v.z + (offset * (Math.random() < 0.5 ? -1 : 1));
	}
	*/
	//geometry.vertices[57].x += 1;

	//console.log(sphere.geometry.vertices[10].x,sphere.geometry.vertices[10].y,sphere.geometry.vertices[10].z);
	//sphere.geometry._dirtyVertices = true;
	//sphere.geometry._dirtyNormals = true;
	controls.update();
	renderer.render(scene, camera);
}

function checkOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
	var top1 = y1 + h1;
	var left1 = x1;
	var right1 = x1 + w1;
	var bottom1 = y1;
	
	var top2 = y2 + h2;
	var left2 = x2;
	var right2 = x2 + w2;
	var bottom2 = y2;
	
	if(bottom1 > top2) { return { v:0, r:"bottom1 < top2"}; }
	if(top1 < bottom2) { return { v:0, r:"top1 > bottom2"}; }
	if(right1 < left2) { return { v:0, r:"right1 < left2"}; }
	if(left1 > right2) { return { v:0, r:"left1 > right2"}; }

	return { v : 1 };
}