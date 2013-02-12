define(['lib/jquery.min', 
		'lib/three.min',
		'resources/scenemanager',
		'resources/preloader'
		], 
function($,T,SceneManager,R) {	
	console.log("core loading")
	var base = base || {};

	base.T = THREE;
	base.SM = SceneManager;
	base.R = R;
	base.T.Object3D.prototype.update = function() {

	}

	base.T.Scene.prototype.update = function() {
		for(var i in this.children) {
			this.children[i].update();
		}
	}

	base.renderer = new base.T.WebGLRenderer();
	base.camera = new base.T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
	base.scene = new base.T.Scene();

	base.start = function() {
		document.body.appendChild(base.renderer.domElement);
		base.renderer.setSize(window.innerWidth, window.innerHeight);
		base.camera.position.z = 20;
		base.scene.add(base.camera);
		setInterval(base._loop, 1000 / 60);
	}

	base._loop = function() {
		var scene = base.SM.currentScene;
		if(scene != {}) {
			scene.scene.update();
			base.renderer.render(scene.scene, base.camera);
		}
	};

	window.base = base;

	return base;
	// // UNIT TESTING
	// var resources = [];

	// console.log("Core unit test");

	// resources['tileset'] = new R.type.Image("../assets/tileset.png");
	// resources['area'] = new R.type.Data("../assets/area01.tmx");

	// var posLoad = function() { 
	// 	console.log("All resources loaded");
	// 	var map = new base.R.type.TiledMap(resources['area'].obj, resources['tileset'].obj);
	// 	console.log(map);
	// };

	// new base.R.Loader(resources,posLoad).loadResources();

	// base.start();

	// base.scene.add(new base.T.Mesh(new base.T.CubeGeometry(1,1,1,1,1), new base.T.MeshPhongMaterial({ color: 0x0000FF})));

	// var l = new base.T.PointLight(0xFFFFFF);
	
	// l.update = function() {
	// 	console.log("many times foo");
	// }

	// l.position.z = 30;
	// base.scene.add(l);
	// base.scene.add();
});