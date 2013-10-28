var FRISB = FRISB || {};

(function () {

	//Settings
	var acces_number = '82996312dc';
	var acces_token = '&access_token=' + acces_number;
	var tournament_id = '19389';
	var loader = document.getElementById('loader');
	
	var game_id;

	//Controller
	FRISB.controller = {
		init: function() {
			FRISB.router.init();
			FRISB.buttons.init();
		}
	};
	
	//Directives
	FRISB.directives = {
		ranking: {
			objects: {
				standings: {
					name: {
						href: function() {
							return "#/schedule?" + this.team_id;
						}
					}
				}
			}
		},
		schedule: {
			date: {
				text: function() {
						//I only want the date
						var date = this.objects[0].start_time.split("-");
						var time = date[2].split("T");
						var date = time[0] + "-" + date[1] + "-" + date[0];
						
						return date;
				}
			},
			objects: {
				start_time: {
					text: function() {
						//I only want the time
						var date = this.start_time.split("-");
						var time = date[2].split("T");
						var finaltime = time[1].split("+");
						var finaldate = time[0] + "-" + date[1] + "-" + date[0];
						var time = finaltime[0];
						
						return time;			
					}
				},
				track_score: {
					href: function() {
						return '#/game?' + this.id;
					}
				}
			}
		}
	}
	

	// The URL Router
	FRISB.router = {
		init: function() {
	  		routie({
			    '/ranking': function() {				
					FRISB.page.render('ranking');			
				},		
			    '/game/:game_id': function(game_id) {
					if (game_id != "") {
						
						//Show the loader
						loader.style.display = 'block';
						
						//Get newest scores off leaguevine
						var api_url = 'https://api.leaguevine.com/v1/games/' + game_id[1] + '/?';
						$$.json(api_url + acces_token,{},function(data){
							Transparency.render(qwery('[data-route=game]')[0], data);
							
							FRISB.page.render('game');
							
							//Hide the loader
							loader.style.display = 'none';
						});						
					} else {
						FRISB.page.render('game');
					}
				},
				'/schedule/:pool_id': function(pool_id) {
					if (pool_id != "") {
						
						//Get and filter the data
						var data = JSON.parse(localStorage['schedule']);
						var filtered = {};
						var objects = [];
						for (var i = 0; i < data.objects.length; i++) {
							if (data.objects[i].team_1_id == pool_id);
							if (data.objects[i].team_2_id == pool_id);
							objects.push(data.objects[i]);
						}
						
						//Log and store new variables
						filtered.objects = objects;
						console.log(filtered);
						localStorage['schedule'] = filtered;
						
						//Finally render the page
						FRISB.page.render('schedule');
					} else {
						//Just render the page with cached data
						FRISB.page.render('schedule');
					}
				},
				
			    '*': function() {
					//localStorage.clear();
					FRISB.json.fetch(function(){
						FRISB.page.render('ranking');
					});
				}
			});
		}
	};

	//All Router pages
	FRISB.page = {
		render: function(pagename) {
			//Show the loader
			loader.style.display = 'block';
			
			//Change page title
			var titleCaps = pagename[0].toUpperCase() + pagename.slice(1);
			document.title = "Autumn 2013 | Amsterdam ultimate - 2013 | " + titleCaps;
						
			//Render the page if found in localstorage
			if (localStorage[pagename]) {
				var directives = eval('FRISB.directives.'+pagename);
				var data = JSON.parse(localStorage[pagename]);
				Transparency.render(qwery('[data-route='+pagename+']')[0], data, directives);
			}
				
			//Display correct section
			var all_sections = qwery('section > section');
			for(var i=0; i < all_sections.length; i++){	all_sections[i].classList.remove('active');	}				
			qwery('[data-route='+pagename+']')[0].classList.add('active');
				
			//Hide the loader
			loader.style.display = 'none';
		}
	}
	
	FRISB.json = {
		fetch: function(callback) {
			//Check if localstorage exists, Fetch it
			if (!localStorage['ranking']) {
			//if (1 == 1) {
				var api_url = 'https://api.leaguevine.com/v1/pools/?tournament_id=' + tournament_id;
				$$.json(api_url + acces_token,{},function(data){
				
					//Set the directives
					var directives = FRISB.directives.ranking;
					
					//Cache, Render and Log it
					localStorage['ranking'] = JSON.stringify(data);
					Transparency.render(qwery('[data-route=ranking]')[0], data, directives);
					console.log(data);
					
					var api_url = 'https://api.leaguevine.com/v1/games/?tournament_id=' + tournament_id + '&limit=200';
					$$.json(api_url + acces_token,{},function(data){
					
						//Set the directives
						var directives = FRISB.directives.schedule;
						
						//Cache, Render and Log it
						localStorage['schedule'] = JSON.stringify(data);
						Transparency.render(qwery('[data-route=schedule]')[0], data, directives);
						console.log(data);							
						
						callback(); //Tell Routie we are ready
						
					});
				});
			} else {
				callback(); //Nothing to do here
			}
		},
		post: function(postData) {
            var url = 'https://api.leaguevine.com/v1/game_scores/';
            var postData = JSON.stringify(postData);

            // Create request
            var xhr = new XMLHttpRequest();
            xhr.open('POST',url,true);
			
			//Check for response
			xhr.onreadystatechange = function() {
				//alert(xhr.readyState);
				if (xhr.readyState == 4 && xhr.status == 200) {
					alert('succes!');
				}
			}; 

            // Set request headers
            xhr.setRequestHeader('Content-type','application/json');
            xhr.setRequestHeader('Authorization','bearer ' + acces_number);
                        
            // Send request (with data as a json string)
            xhr.send(postData);
		}
	}
	
	FRISB.buttons = {
		init: function() {
			var element = document.getElementById('team1up');
			element.addEventListener('click',function(){
				var element = qwery('[data-bind=team_1_score]')[0];
				element.innerHTML++;
			});			
			var element = document.getElementById('team1down');
			element.addEventListener('click',function(){
				var element = qwery('[data-bind=team_1_score]')[0];
				var value = element.innerHTML;
				if (value > 0) { element.innerHTML--; }
			});
			var element = document.getElementById('team2up');
			element.addEventListener('click',function(){
				var element = qwery('[data-bind=team_2_score]')[0];
				element.innerHTML++;
			});
			var element = document.getElementById('team2down');
			element.addEventListener('click',function(){
				var element = qwery('[data-bind=team_2_score]')[0];
				var value = element.innerHTML;
				if (value > 0) { element.innerHTML--; }
			});
			var element = document.getElementById('submit');
			element.addEventListener('click',function(){
				if (confirm('Weet je zeker dat je de score in wilt sturen?')){
					var element = qwery('[data-bind=team_1_score]')[0];
					var value1 = element.innerHTML;
					var element = qwery('[data-bind=team_2_score]')[0];
					var value2 = element.innerHTML;
					
					FRISB.json.post({
						game_id: game_id,
						team_1_score: value1,
						team_2_score: value2,
						is_final: 'False'
					});
				}
			});
		}
	}
	
	//Initiate the Application
	domready(function() {
		FRISB.controller.init();
	});
	
})();
