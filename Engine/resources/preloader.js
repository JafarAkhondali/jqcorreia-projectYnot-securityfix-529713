define(['lib/jquery.min'], function() {
	var R = {};
	R.type = {};

	R.Loader = function(list, ondone) {
		var self = this;
		this.list = list;
		this.ondone = ondone;
		var c = 0;

		this.loadResources = function() {
			this._load();	
		}

		this._load = function() {
			for(var i in this.list)
				this.list[i].load(this._callback);
		}

		this._callback = function() {
			c++;
			console.log(c, Object.keys(self.list).length);
			if(c == Object.keys(self.list).length) {
				self.ondone();
			}
		}
	}

	R.type.Data = function(url) {
		var self = this;
		this.url = url;
		this.obj = null;
		this.load = function(callback) {
			$.get(url, function(data) {
				self.obj = data;
				callback();
			}, "xml");
		}
	}

	R.type.Image = function(path) {
		var self = this;
		this.obj = new Image();
		this.path = path;

		this.load = function(callback) {
			console.log("Loading new image "  + this.path);
			this.obj.src = this.path;
			this.obj.onload = callback;
		}
	}

	R.type.Map = function(path) {
		var self = this;
		this.obj = new Parser();
	}

	R.type.Image.prototype = new R.type.Data("dummyUrl");

	return R;
});
