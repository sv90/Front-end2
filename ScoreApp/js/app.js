var FRISB = FRISB || {};

(function () {

	//Controller
	FRISB.controller = {
		init: function() {
			FRISB.router.init();
		}
	};

	//Schedule
	FRISB.schedule = {
		title:'Pool A - Schedule',
		today: 'Monday 18 March',	//TODO: Display correct date of today
		data: [
			{ date: "Monday, 9:00am", team1: "Chasing", team1Score: "13", team2: "Amsterdam Money Gang", team2Score: "9"},
			{ date: "Monday, 9:00am", team1: "Boomsquad", team1Score: "15", team2: "Beast Amsterdam", team2Score: "11"},
			{ date: "Monday, 10:00am", team1: "Beast Amsterdam", team1Score: "14", team2: "Amsterdam Money Gang", team2Score: "12"},
			{ date: "Monday, 10:00am", team1: "Chasing", team1Score: "5", team2: "Burning Snow", team2Score: "15"},
			{ date: "Monday, 11:00am", team1: "Boomsquad", team1Score: "11", team2: "Amsterdam Money Gang", team2Score: "15"},    
			{ date: "Monday, 11:00am", team1: "Burning Snow", team1Score: "15", team2: "Beast Amsterdam", team2Score: "6"},
			{ date: "Monday, 12:00pm", team1: "Chasing", team1Score: "8", team2: "Beast Amsterdam", team2Score: "15"},
			{ date: "Monday, 12:00pm", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"},
			{ date: "Monday, 1:00pm", team1: "Chasing", team1Score: "15", team2: "Boomsquad", team2Score: "14"},
			{ date: "Monday, 1:00pm", team1: "Burning Snow", team1Score: "15", team2: "Amsterdam Money Gang", team2Score: "11"}
		],
		calculations: {
			team1: {	//TODO: Make these calculations work (this.team1Score; doesn't work!)
				class: function(params) {
					var score1 = FRISB.schedule.data[0].team1Score;
					var score2 = FRISB.schedule.data[0].team2Score;
					if (score1 > score2) {
						return "winner";
					}
				}
			}
		}
	}
	

	//Game
	FRISB.game = {
		title:'Pool A - Score: Boomsquad vs. Burning Snow',		//TODO: Can display teams dynamicly!
		data : [
			{ score: "1", team1: "Boomsquad", team1Score: "1", team2: "Burning Snow", team2Score: "0"},
			{ score: "2", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "0"},
			{ score: "3", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "1"},
			{ score: "4", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "2"},
			{ score: "5", team1: "Boomsquad", team1Score: "3", team2: "Burning Snow", team2Score: "2"},
			{ score: "6", team1: "Boomsquad", team1Score: "4", team2: "Burning Snow", team2Score: "2"},
			{ score: "7", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "2"},
			{ score: "8", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "3"},
			{ score: "9", team1: "Boomsquad", team1Score: "6", team2: "Burning Snow", team2Score: "3"},
			{ score: "10", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "3"},
			{ score: "11", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "4"},
			{ score: "12", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "4"},
			{ score: "13", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "5"},
			{ score: "14", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "6"},
			{ score: "15", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "6"},
			{ score: "16", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "7"},
			{ score: "17", team1: "Boomsquad", team1Score: "10", team2: "Burning Snow", team2Score: "7"},
			{ score: "18", team1: "Boomsquad", team1Score: "11", team2: "Burning Snow", team2Score: "7"},
			{ score: "19", team1: "Boomsquad", team1Score: "12", team2: "Burning Snow", team2Score: "7"},
			{ score: "20", team1: "Boomsquad", team1Score: "13", team2: "Burning Snow", team2Score: "7"},
			{ score: "21", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "7"},
			{ score: "22", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "8"},
			{ score: "23", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"}
		]
	};

	//Ranking
	FRISB.ranking = {
		title:'Pool A - Ranking',
		data: [
			{ team: "Chasing", Win: "2", Lost: "2", Sw: "7", Sl: "9", Pw: "35", Pl: "39"},
			{ team: "Boomsquad", Win: "2", Lost: "2", Sw: "9", Sl: "8", Pw: "36", Pl: "34"},
			{ team: "Burning Snow", Win: "3", Lost: "1", Sw: "11", Sl: "4", Pw: "36", Pl: "23"},
			{ team: "Beast Amsterdam", Win: "2", Lost: "2", Sw: "6", Sl: "8", Pw: "30", Pl: "34"},
			{ team: "Amsterdam Money Gang", Win: "1", Lost: "3", Sw: "6", Sl: "10", Pw: "30", Pl: "37"}
		]
	};
	
	//Movies
	FRISB.movies = {
		title: 'Movies page'
	};

	// The URL Router
	FRISB.router = {
		init: function() {
	  		routie({
			    '/schedule': function() { FRISB.page.render('schedule'); },				
			    '/game': function() { FRISB.page.render('game'); },				
			    '/ranking': function() { FRISB.page.render('ranking'); },
				
				'/movies': function() {		//TODO: Request can take quite a while, should inform the user of it's loading content...
					microAjax("http://dennistel.nl/movies",function(result) {
						FRISB.movies.data = JSON.parse(result);
						FRISB.page.render('movies');
					});
			    },
				
			    '*': function() { FRISB.page.render('schedule'); }
			});
		},

		change: function() {
            var route = window.location.hash.slice(2),
            sections = qwery('section'),
            section = qwery('[data-route=' + route + ']')[0];

            // Show active section, hide all other
            if(section) {
            	for(var i=0; i < sections.length; i++){
            		sections[i].classList.remove('active');
            	}
            	section.classList.add('active');
            }

            // Default route
            if(!route) { sections[0].classList.add('active'); }

		}
	};

	//All Router pages
	FRISB.page = {
		render: function(route) {
			var data = eval('FRISB.' + route);								//Eval is Less evil in this case because 'route' is a controlled variabele, not direct user input.
			var calculations = eval('FRISB.' + route + '.calculations');

			Transparency.render(qwery('[data-route='+route+']')[0], data, calculations);
			FRISB.router.change();
		}
	}
	
	
	//Initiate the Application
	domready(function() {
		FRISB.controller.init();
	});
	
})();