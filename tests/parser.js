var image = new Image();

var tileW = 32;
var tileH = 32;

function Tile(x1, y1, w1, h1, gid1) {
//	console.log(x1, y1, w1, h1, gid1);
	this.x = x1;
	this.y = y1;
	this.w = w1;
	this.h = h1;
	this.gid = gid1;
}

function Map(source, tileset, callback) {
	var self = this;

	this.numTilesW = 0;
	this.numTilesH = 0;
	this.tileXSize = 0;
	this.tileYSize = 0;
	this.tiles = [];

	this.tileset = new Image();
	this.tileset.src = tileset;
	this.tilesetNumTilesW;
	this.tilesetNumTilesH;

	this.tileset.onload = function() {
		console.log("Tileset loaded");
		self.tilesetNumTilesW = self.tileset.width / tileW;
		self.tilesetNumTilesH = self.tileset.height / tileH;
	}

	this.getTilesetCoordinates = function(gid) {
		var ry = Math.floor(gid / self.tilesetNumTilesW);
		var rx = gid - ry * self.tilesetNumTilesW;
		return {
			x : rx - 1,
			y : ry
		}
	};

	this.parse = function(data) {

		// XML Processing
		var mapXml = data.getElementsByTagName("map")[0];
		this.numTilesW = parseFloat(mapXml.getAttribute("width"));
		this.numTilesH = parseFloat(mapXml.getAttribute("height"));
		this.tileXSize = parseFloat(mapXml.getAttribute("tilewidth"));
		this.tileYSize = parseFloat(mapXml.getAttribute("tileheight"));
		var xmltileList = mapXml.getElementsByTagName("layer")[0]
				.getElementsByTagName("tile");

		//console.log(this.numTilesW, this.numTilesH, this.tileXSize,
		//		this.tileYSize);
		var a = [];
		var y = 0;
		for ( var x = 0; x < xmltileList.length; x++) {
			var tile = new Tile(x * this.tileXSize - y * this.tileXSize * this.numTilesW,
					y * this.tileYSize,
					this.tileXSize, 
					this.tileYSize, 
					xmltileList[x].getAttribute("gid")
			);
			
			a[x - y * this.numTilesW] = tile;
			if ((x + 1) % this.numTilesW == 0) {
				self.tiles[y] = a;
				a = [];
				y++;
			}
		}
	}

	$.get(source, function(data) {
		self.parse(data);
		if(callback != undefined)
			callback(data);
	}, "xml");
}

var map;

//function initialize() {
//	map = new Map("area01.tmx");
//
//	console.log(map);
//	console.log(map.getTilesetCoordinates(21));
//}
//
//function update(time) {
//
//}
//var once = false;
//function draw(ctx) {
//	for ( var y = 0; y < map.tiles.length; y++) {
//		for ( var x = 0; x < map.tiles[0].length; x++) {
//			var tile = map.tiles[y][x];
//			var coord = map.getTilesetCoordinates(tile.gid);
//			if (!once && tile.gid != 0)
//				console.log(tile, coord);
//			ctx.drawImage(map.tileset, coord.x * 32, coord.y * 32, tile.w,
//					tile.h, tile.x, tile.y, tile.w, tile.h);
//		}
//	}
//	once = true;
//}