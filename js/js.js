function start() { // Start of the start() function

	$("#start").hide();
	
	$("#game-background").append("<div id='player' class='animation1'></div>");
	$("#game-background").append("<div id='enemy1' class='animation2'></div>");
	$("#game-background").append("<div id='enemy2'></div>");
	$("#game-background").append("<div id='friend' class='animation3'></div>");

	//Main game variables
	
	var game = {};
	var EndOfTheGame = false;
	var velocity = 5;
	var shoot = true;
	var positionY = parseInt(Math.random() * 334);
	var keyboardKey = {
		upArrow: 38,
		downArrow: 40,
		D: 68
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
		collided();
	
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
		
		if (game.pressed[keyboardKey.D]) {
			
			// Call trigger function
			shot();
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
	
		positionX = parseInt($("#friend").css("left"));
		$("#friend").css("left",positionX + 1);
					
		if (positionX > 906) {
			
			$("#friend").css("left",0);
					
		}
	
	} // End of moveFriend() function
	
	// shooting function
	function shot() {
		
		if (shoot == true) {
			
			shoot = false;
		
			TOP = parseInt($("#player").css("top"))
			positionX = parseInt($("#player").css("left"))
			shotX = positionX  + 190;
			topShot = TOP + 37;
			$("#game-background").append("<div id='shot'></div");
			$("#shot").css("top",topShot);
			$("#shot").css("left",shotX);
			
			var timeshot=window.setInterval(runShot, 30);
		
		} // End of shoot
	
		function runShot() {
			positionX  = parseInt($("#shot").css("left"));
			$("#shot").css("left",positionX + 15); 

			if (positionX > 900) {
					
				window.clearInterval(timeshot);
				timeshot=null;
				$("#shot").remove();
				shoot=true;
				
			}
		} // End of runShot() function
	} // End of shot() function

	function collided() {
		var collided1 = ($("#player").collision($("#enemy1")));
		var collided2 = ($("#player").collision($("#enemy2")));
		var collided3 = ($("#shot").collision($("#enemy1")));
		var collided4 = ($("#shot").collision($("#enemy2")));
		var collided5 = ($("#player").collision($("#friend")));
		var collided6 = ($("#enemy2").collision($("#friend")));
		
		
		// collision player with enemy 1 helicopter
		if (collided1.length > 0) {
				
			enemy1X = parseInt($("enemy1").css("left"));
			enemy1Y = parseInt($("enemy1").css("top"));
			explosion1(enemy1X, enemy1Y);
		
			positionY = parseInt(Math.random() * 334);
			$("enemy1").css("left", 694);
			$("enemy1").css("top",positionY);
		}
		
		// collision player with the enemy 2 truck
		if (collided2.length > 0) {
			
			enemy2X = parseInt($("#enemy2").css("left"));
			enemy2Y = parseInt($("#enemy2").css("top"));
			explosion2(enemy2X, enemy2Y);
					
			$("#enemy2").remove();
				
			repositionEnemy2();
				
		}
		
		// collision shot with enemy 1 helicopter
		if (collided3.length > 0) {
				
			enemy1X = parseInt($("#enemy1").css("left"));
			enemy1Y = parseInt($("#enemy1").css("top"));
				
			explosion1(enemy1X, enemy1Y);
			$("#shot").css("left",950);
				
			positionY = parseInt(Math.random() * 334);
			$("#enemy1").css("left",694);
			$("#enemy1").css("top",positionY);
				
		}

		
		// collision shot with enemy 2 truck	
		if (collided4.length>0) {
			
			enemy2X = parseInt($("#enemy2").css("left"));
			enemy2Y = parseInt($("#enemy2").css("top"));
			$("#enemy2").remove();
		
			explosion2(enemy2X, enemy2Y);
			$("#shot").css("left",950);
			
			repositionEnemy2();
				
		}
	
		// collision player with friend			
		if (collided5.length > 0) {
			
			repositionFriend();
			$("#friend").remove();
		}

		
		// collision friend with enemy 2 truck	
		if (collided6.length > 0) {
				
			friendX = parseInt($("#friend").css("left"));
			friendY = parseInt($("#friend").css("top"));
			explosion3(friendX, friendY);
			$("#friend").remove();
					
			repositionFriend();
					
		}
		
	} // End of collided() function

	
	// Explosion 1 - player helicopter vs enemy 1 helicopter
	function explosion1(enemy1X, enemy1Y) {
		$("#game-background").append("<div id='explosion1'></div");
		$("#explosion1").css("background-image", "url(imgs/explosao.png)");
		var div = $("#explosion1");
		div.css("top", enemy1Y);
		div.css("left", enemy1X);
		div.animate({width:200, opacity:0}, "slow");
		
		var timeExplosion1 = window.setInterval(removeExplosion1, 1000);
		
		function removeExplosion1() {
			
			div.remove();
			window.clearInterval(timeExplosion1);
			timeExplosion1 = null;
			
		}
		
	} // End of explosion1() function

	// Explosion 2 - player helicopter vs enemy 2 truck
	function explosion2(enemy2X, enemy2Y) {
		$("#game-background").append("<div id='explosion2'></div");
		$("#explosion2").css("background-image", "url(imgs/explosao.png)");
		var div2 = $("#explosion2");
		div2.css("top", enemy2Y);
		div2.css("left", enemy2X);
		div2.animate({width:200, opacity:0}, "slow");
		
		var timeExplosion2 = window.setInterval(removeExplosion2, 1000);
		
		function removeExplosion2() {
			
			div2.remove();
			window.clearInterval(timeExplosion2);
			timeExplosion2 = null;
			
		}

	} // End of explosion2() function

	
	// Explosion 3 - friend vs enemy 2 truck
	function explosion3(friendX, friendY) {
		$("#game-background").append("<div id='explosion3' class='animation4'></div");
		$("#explosion3").css("top",friendY);
		$("#explosion3").css("left",friendX);

		var timeExplosion3 = window.setInterval(resetExplosion3, 1000);

		function resetExplosion3() {
			$("#explosion3").remove();
			window.clearInterval(timeExplosion3);
			timeExplosion3 = null;
				
		}
		
	} // End of explosion3() function
	
		
	// Reposition enemy 2 truck
	function repositionEnemy2() {
	
		var timeCollision4=window.setInterval(reposition4, 5000);
			
		function reposition4() {
		window.clearInterval(timeCollision4);
		timeCollision4 = null;
			
			if (EndOfTheGame == false) {
			
			$("#game-background").append("<div id=enemy2></div");
			
			}
			
		}	
	}

	
	// Reposition friend
	function repositionFriend() {
		
		var timeFriend = window.setInterval(reposition6, 6000);
		
		function reposition6() {
			window.clearInterval(timeFriend);
			timeFriend = null;
			
			if (EndOfTheGame == false) {
			
				$("#game-background").append("<div id='friend' class='animation3'></div>");
			
			}
			
		}
		
	} // Fim da função repositionFriend()
	
} // End of start function


