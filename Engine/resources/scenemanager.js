define(['resources/preloader', 'lib/three.min'], function(R,T) {
	// var T = THREE;

	var SceneManager = function() {
		this.scenes = [];
		this.currentScene = {};
	}

	SceneManager.prototype.addScene = function(scene, load) {
		console.log("Adding Scene");
		this.scenes.push(scene);
		var loader = new R.Loader(scene.resources, scene.onLoad);
		loader.loadResources();
		if(load == true) { 
			this.currentScene = scene;
			this.currentScene.scene.add(base.camera);
		}
	}

	SceneManager.prototype.Scene = function(resources) {
		this.scene = new THREE.Scene();
		this.resources = resources;
	}

	return new SceneManager();
});