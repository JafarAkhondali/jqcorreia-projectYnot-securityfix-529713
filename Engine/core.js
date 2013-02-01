require(['resources/preloader','resources/tiledmap'], function(R) {	

	var base = base || {};

	base.R = R;

	window.base = base; // Push base to global namespace

	// UNIT TESTING
	resources = [];

	console.log("Preloader unit test");

	resources['image1'] = new R.type.Image("http://img.gawkerassets.com/img/1863znwyceav1jpg/original.jpg");
	resources['image2'] = new R.type.Image("http://heart-homeconnection.com/wp-content/uploads/big+bubble-1600x1200.jpg");
	resources['image3'] = new R.type.Image("http://wallpapers.free-review.net/wallpapers/42/Big_wave.jpg");
	resources['data1'] = new R.type.Data("../assets/area01.tmx");

	var cb = function() { 
		console.log("All resources loaded");
		console.log(resources['data1'].obj);
	};

	new R.Loader(resources,cb).loadResources();		
});