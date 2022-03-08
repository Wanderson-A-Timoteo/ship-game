function start() { // Start of the start() function

	$("#start").hide();
	
	$("#game-background").append("<div id='player' class='animation1'></div>");
	$("#game-background").append("<div id='enemy1' class='animation2'></div>");
	$("#game-background").append("<div id='enemy2'></div>");
	$("#game-background").append("<div id='friend' class='animation3'></div>");

	//Main game variables
	
	var game = {}
	
	//Game Loop

	game.timer = setInterval(loop,30);
	
	function loop() {
	
	moveBackground();
	
	} // End of loop() function

	
//Function that moves the game background
	
function moveBackground() {
	
	left = parseInt($("#game-background").css("background-position"));
	$("#game-background").css("background-position",left-1);
	
	} // end of moveBackground() function


} // End of start function