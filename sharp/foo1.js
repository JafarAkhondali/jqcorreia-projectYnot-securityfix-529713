var Person = Class.create({
	initialize : function(name) {
		this.name = name;
	}, 
	hello : function(phrase) {
		console.log(phrase, this.name);
	}
});

var Ninja = Class.create(Person, {

	hello : function($super, foo) {
		$super("I'm Russo and i'm invisble");
		console.log(foo);
	}
});

function compare(a,b) {
	if(a == b)
		return 0;
	if(a < b)
		return -1;
	if(a > b)
		return 1;
}

var a = [3,4,2,1,7,10,9];
var b = a.slice(0);

function add2(a) {
	return a + 2;
}

console.log(a);
console.log(a.sort(compare));
console.log(b.map(add2));

var p = new Person("Russo");
p.hello("Eu sou o");

var n = new Ninja("Russo");
n.hello("cenas");
