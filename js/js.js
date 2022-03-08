function start() { // Start of the start() function

	$("#start").hide();
	
	$("#game-background").append("<div id='player' class='animation1'></div>");
	$("#game-background").append("<div id='enemy1' class='animation2'></div>");
	$("#game-background").append("<div id='enemy2'></div>");
	$("#game-background").append("<div id='friend' class='animation3'></div>");

	//Main game variables
	
	var game = {};
	var velocity=5;
	var positionY = parseInt(Math.random() * 334);
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
		moveEnemy1();
		moveEnemy2();
		moveFriend();
	
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

	function moveEnemy1() {

		positionX = parseInt($("#enemy1").css("left"));
		$("#enemy1").css("left",positionX-velocity);
		$("#enemy1").css("top",positionY);
			
		if (positionX<=0) {
			positionY = parseInt(Math.random() * 334);
			$("#enemy1").css("left",694);
			$("#enemy1").css("top",positionY);
			
		}
	} // End of moveEnemy1() function

		
	function moveEnemy2() {
		positionX = parseInt($("#enemy2").css("left"));
		$("#enemy2").css("left",positionX-3);
				
		if (positionX<=0) {
			
			$("#enemy2").css("left",775);
					
		}
	} // End of moveEnemy2() function

	function moveFriend() {
	
		posicaoX = parseInt($("#friend").css("left"));
		$("#friend").css("left",posicaoX+1);
					
		if (posicaoX>906) {
			
			$("#friend").css("left",0);
					
		}
	
	} // End of moveFriend() function
	


} // End of start function


