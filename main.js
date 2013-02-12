// require(['Engine/build/core-built'], function() {
	
// 	console.log(base);
// 	// $("id");
// 	// // Da focking game
// 	// base.start();

// 	// base.scene.add(new base.T.Mesh(new base.T.CubeGeometry(1,1,1,1,1), new base.T.MeshPhongMaterial({ color: 0x0000FF})));

// 	// var l = new base.T.PointLight(0xFFFFFF);
	
// 	// l.position.z = 30;
// 	// base.scene.add(l);
// 	// base.scene.add();
// });
require.config( {
	paths: { 'core' : 'Engine/build/core' }
})

require(['core'], function(base) {
	base.start();

	var resources = [];

	resources['tileset'] = new base.R.type.Image("../Engine/assets/tileset.png");
	resources['area'] = new base.R.type.Data("../Engine/assets/area01.tmx");
	
	scene = new base.SM.Scene(resources);
	base.SM.addScene(scene, true);

	// TEXTURE
	var texture = new THREE.ImageUtils.loadTexture("../Engine/assets/tileset.png");
	texture.sourceFile = resources['tileset'].path;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set(1/20,1/8);

	texture.offset.x = 2/20;
	texture.offset.y = 3/8;

	var l = new base.T.PointLight(0xFFFFFF);
	var m = new base.T.Mesh(new base.T.CubeGeometry(1,1,1,1,1), new base.T.MeshPhongMaterial({map : texture}));

	l.position.z = 100;

	scene.scene.add(m);
	scene.scene.add(l);
});