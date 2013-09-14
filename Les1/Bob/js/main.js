/**
 *	Dit word veel gebruikt voor commentaar
 *	
 *  
 */


function Persoon(name) { 
	this.name = name;
	
	this.speak = function() {
		alert('Hi, my name is ' + this.name);
		alert('lol');
	}

}

var bob = new Persoon('Bob');

bob.speak();