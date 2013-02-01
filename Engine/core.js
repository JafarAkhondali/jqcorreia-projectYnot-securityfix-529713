require(['lib/jquery.min','resources/preloader','resources/tiledmap', 'lib/three.min'], function($,R) {	

	var base = base || {};

	base.R = R;
	base.T = THREE;

	window.base = base; // Push base to global namespace

	// UNIT TESTING
	var resources = [];

	console.log("Core unit test");

	resources['0'] = new R.type.Image("../assets/tileset.png");
	resources['1'] = new R.type.Data("../assets/area01.tmx");

	var posLoad = function() { 
		console.log("All resources loaded");
		var map = new base.R.type.TiledMap(resources['1'].obj, resources['0'].obj);
		console.log(map);
	};

	new base.R.Loader(resources,posLoad).loadResources();		
});