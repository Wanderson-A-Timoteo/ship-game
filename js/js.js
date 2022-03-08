function start() { // Start of the start() function

	$("#start").hide();
	
	$("#game-background").append("<div id='player' class='animation1'></div>");
	$("#game-background").append("<div id='enemy1' class='animation2'></div>");
	$("#game-background").append("<div id='enemy2'></div>");
	$("#game-background").append("<div id='friend' class='animation3'></div>");

	//Main game variables
	
	var game = {};
	var keyboardKey = {
		upArrow: 38,
		downArrow: 40,
		backspace: 8
		}
	
		game.pressed = [];

	
	//Checks if the user pressed any key
	
	//pressed=yes
	$(document).keydown(function(e){
		game.pressed[e.which] = true;
		});
	
		//pressed=no
		$(document).keyup(function(e){
			game.pressed[e.which] = false;
		});
	
	//Game Loop

	game.timer = setInterval(loop,30);
	
	function loop() {
	
	moveBackground();
	movePlayer();
	
	} // End of loop() function

	
//Function that moves the game background
	
function moveBackground() {
	
	left = parseInt($("#game-background").css("background-position"));
	$("#game-background").css("background-position",left-1);
	
	} // end of moveBackground() function

	function movePlayer() {
	
		if (game.pressed[keyboardKey.upArrow]) {
			var TOP = parseInt($("#player").css("top"));
			$("#player").css("top",TOP-10);
	
			if (TOP<=0) {
			
				$("#player").css("top",TOP+10);
			}
		
		}
		
		if (game.pressed[keyboardKey.downArrow]) {
			
			var TOP = parseInt($("#player").css("top"));
			$("#player").css("top",TOP+10);
			
			if (TOP>=434) {	
				$("#player").css("top",TOP-10);
					
			}
		}
		
		if (game.pressed[keyboardKey.backspace]) {
			
			//Call trigger function
		}
	
		} // End of movePlayer() function


} // End of start function


function movePlayer() {
	
	if (game.pressed[keyboardKey.upArrow]) {
		var topo = parseInt($("#player").css("top"));
		$("#player").css("top",topo-10);

		if (topo<=0) {
		
			$("#player").css("top",topo+10);
		}
	
	}
	
	if (game.pressed[keyboardKey.downArrow]) {
		
		var topo = parseInt($("#player").css("top"));
		$("#player").css("top",topo+10);
		
		if (topo>=434) {	
			$("#player").css("top",topo-10);
				
		}
	}
	
	if (game.pressed[keyboardKey.backspace]) {
		
		//Call trigger function
	}

	} // End of movePlayer() function