var image = new Image();

var tileW = 32;
var tileH = 32;

var numTilesW;
var numTilesH;

function getCoordinates(gid) {
	var ry = Math.floor(gid / numTilesW);
	var rx = gid - ry * numTilesW;
	return {
		x : rx - 1,
		y : ry
	};
}

var map = {
	numTilesW : 0,
	numTilesH : 0,
	tileXSize : 0,
	tileYSize : 0,
	tiles : []
}

function initialize() {
	// var xmlhttp = new XMLHttpRequest();
	// xmlhttp.open("GET", "./area01.tmx", false);
	// xmlhttp.setRequestHeader('Content-Type', 'text/xml');
	// xmlhttp.send("");
	// xmlDoc = xmlhttp.responseXML;
	//	
	// console.log(xmlDoc.getElementsByTagName("map"));
	$.get("area01.tmx", function(data) {
		parse(data);
	}, "xml");
	image.src = "tileset.png";
	
	numTilesW = image.width / tileW;
	numTilesH = image.height / tileH;
	
	console.log(getCoordinates(21));
}

function parse(data) {
	var mapXml = data.getElementsByTagName("map")[0];
	map.numTilesW = mapXml.getAttribute("width");
	map.numTilesH = mapXml.getAttribute("height");
	map.tileXSize = mapXml.getAttribute("tilewidth");
	map.tileYSize = mapXml.getAttribute("tileheight");

	var tileList = mapXml.getElementsByTagName("layer")[0]
			.getElementsByTagName("tile");
	console.log(tileList);
	var a = [];
	var y = 0;
	for ( var x = 0; x < tileList.length; x++) {
		a[x - y * map.numTilesW] = tileList[x].getAttribute("gid");
		if ((x + 1) % map.numTilesW == 0) {
			map.tiles[y] = a;
			a = [];
			y++;
		}
	}
}

function update(time) {

}

function draw(ctx) {
	for ( var y = 0; y < map.tiles.length; y++) {
		for ( var x = 0; x < map.tiles[0].length; x++) {
			 var coord = getCoordinates(map.tiles[y][x]);
			 ctx.drawImage(image, coord.x * 32, coord.y * 32, 32, 32, x * 32, y * 32, 32, 32);
		}
	}
}