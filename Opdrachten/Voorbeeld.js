//Object contructor
function Persoon(leeftijd,achternaam) {
	this.leeftijd = leeftijd;
	this.achternaam = achternaam;
	this.numLegs = 2;
	Persoon.prototype.dance = function {
		console.log(achternaam + ' Danst.');
	}
}


function Leraar() {
	this.les = les;
}

Leraar.prototype = Persoon();

var Joost = new Leraar('FE2');
var paul = new Persoon('20','rookhuizen');





//Just a regular function only one object should have..
function doThing() {
	console.log('Doet een kunstje');
}

//Make a new instance of this object
var roan = new Persoon('20','zuman',['pc','natuur']);
var paul = new Persoon('20','zuman');
paul.dance;

roan.otherThing = 'thing'; // Assign a new property to the object
roan.doThing = doThing(); // Assign a new method to the object

//Object Literal
var aswhinta = {
	leeftijd: 18,
	achternaam: "Kaijser",
	hobbies: [
		"eten",
		"whatsappen",
		"houden van koek"
	]
}

//Call property of Object Literal
aswhinta.leeftijd;








