// Dit is de globale Namespace. Elk object word aangeroepen met 'geolocatie'. ervoor.
var geolocatie = geolocatie || {};

// Een zelfuitvoerende anonieme functie.
(function() {
	
	//Hier komen alle Local variabelen
	var iets = 'lol';
	var dat = 'dit';
	
	//Object Literal
	geolocatie.application = {
		init: function() {
			var instance = new geolocatie.debug();
			instance.message('Dit is een testbericht');
		}
	}
	
	geolocatie.position = function() {
		this.update = function() {}
		this.set = function() {}		
		this.avaible = function() {}
	}
	geolocatie.map = function() {
		this.generate = function() {}	
		this.calculateDistance = function() {}
		this.checkLocations = function() {}
	}
	
	//Object Constructor
	geolocatie.debug = function() {
		geolocatie.debug.prototype.geoError = function() {}
		geolocatie.debug.prototype.message = function(message) {
			alert(message);
		}
		geolocatie.debug.prototype.customById = function() {}
	}
	
	//Hier wordt de applicatie gestart.
	geolocatie.application.init();
})();