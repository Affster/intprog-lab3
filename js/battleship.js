"use strict";

var Battleship = function() {
	var width = 9;
	var height = 9;
	var tiles = width*height;

	var board = new Map();

	var shipsP1 = new Map();
	var shipsP2 = new Map();
	var shotsP1 = new Map();
	var shotsP2 = new Map();

	var p1Ships = 0;
	var p2Ships = 0;
	var p1Shots = 0;
	var p2Shots = 0;
	var p1Sunk = 0;
	var p2Sunk = 0;

	var output = document.getElementById("battleships");
	var sBoard = document.getElementById("scoreboard");

	var attackmode = false;
	var playerTurn = 1;
	var gameOver = false;

	function createTiles() {
		//var id = 0;
		for(var i = 0; i < height; i++) {
			for(var j = 0; j < width; j++) {
				var button = document.createElement("BUTTON");
				var text = document.createTextNode(" ");
				button.appendChild(text);
				button.setAttribute("id", i*width+j);
				button.style = "background-color:white";

				button.addEventListener("click", function() {
					//Some function
					if(attackmode) {
						shoot(this.id,playerTurn);
					} else {
						changeColor(this.id);
					}
				});
				board.set(i*width+j, button);
			}
		}
	}

	function drawBoard(playerID) {
		clearBoard();
		for(var i = 0; i < height; i++) {
			for(var j = 0; j < width; j++) {
				var tile = i*width+j;
				if(playerID == 1) {
					if(shotsP1.get(tile) == "miss") {
						board.get(tile).style = "background-color:red";
					} else if(shotsP1.get(tile) == "hit") {
						board.get(tile).style = "background-color:green";
					}
				} else {
					if(shotsP2.get(tile) == "miss") {
						board.get(tile).style = "background-color:red";
					} else if(shotsP2.get(tile) == "hit") {
						board.get(tile).style = "background-color:green";
					}
				}
				$(output).append(board.get(i*width+j));
			}
			$(output).append("<br />");
		}
		
	}

	function saveShips(playerID) {
		for(var i = 0; i < tiles; i++) {
			if(board.get(i).style.backgroundColor == "red") {
				if(playerID == 1) {
					shipsP1.set(i,true);
					p1Ships++;
				} else {
					shipsP2.set(i,true);
					p2Ships++;
				}
			}
		}
	}

	function placeShips(playerID) {
		playerTurn = playerID;
		var numShips = 0;

		$(output).html("<h2>Player " + playerID + "</h2>Place your ships! <br /><br />");

		drawBoard();

		var startButton = document.createElement("BUTTON");
		var startText = document.createTextNode("DONE");
		startButton.appendChild(startText);

		var resetButton = document.createElement("BUTTON");
		var resetText = document.createTextNode("RESET");
		resetButton.appendChild(resetText);

		startButton.addEventListener("click", function() {
			if(playerID == 1) {
				saveShips(1);
				placeShips(2);
			} else {
				attackmode = true;
				saveShips(2);
				attack(1);
			}
		});

		resetButton.addEventListener("click", function() {
			clearBoard();
		});

		$(output).append(startButton);
		$(output).append(resetButton);		
	}

	function attack(playerID) {
		sBoard.style.visibility = "visible";
		scoreboard();
		isFinished();

		if(!gameOver) {
			playerTurn = playerID;
			$(output).html("<h2>Player " + playerID + "</h2>Attack! <br /><br />");
			drawBoard(playerID);
		}
	}

	function changeColor(idIN) {
		var id = parseInt(idIN);
		if(board.get(id).style.backgroundColor == "white") {
			board.get(id).style = "background-color:red";
		} else {
			board.get(id).style = "background-color:white";
		}
	}

	function clearBoard() {
		for(var i = 0; i < tiles; i++) {
			board.get(i).style = "background-color:white";
		}
	}

	function shoot(tileID, playerID) {
		var tile = parseInt(tileID);
		sBoard.style.visibility = "hidden";

		if(playerID == 1) {
			if((shotsP1.get(tile) != "hit") && (shotsP1.get(tile) != "miss")) {
				if(shipsP2.get(tile)) {
					shotsP1.set(tile,"hit");
					$(output).html("<h1 class=\"largeText\">HIT!</h1>");
					p1Sunk++;
					p1Shots++;
				} else {
					shotsP1.set(tile,"miss");
					$(output).html("<h1 class=\"largeText\">MISS!</h1>");
					p1Shots++;
				}
				setTimeout(function(){ attack(2); }, 1000);
			}
		} else {
			if((shotsP2.get(tile) != "hit") && (shotsP2.get(tile) != "miss")) {
				if(shipsP1.get(tile)) {
					shotsP2.set(tile,"hit");
					$(output).html("<h1 class=\"largeText\">HIT!</h1>");
					p2Sunk++;
					p2Shots++;
				} else {
					shotsP2.set(tile,"miss");
					$(output).html("<h1 class=\"largeText\">MISS!</h1>");
					p2Shots++;
				}
				setTimeout(function(){ attack(1); }, 1000);
			}
		}
	}

	function scoreboard(){
		sBoard.innerHTML = 
			"<span class='alignleft'>Player 1's ships on board: </span>"+"<span align:'center'>" +p1Ships+"</span>"+
			"<span> &nbsp&nbsp&nbspPlayer 2's ships on board: </span><span class='alignright'>"+p2Ships+ "</span><br />"+
			"<span class='alignleft'>Player 1 shots: </span><span align:'center'>"+ p1Shots + "</span>"+
			"<span> &nbsp&nbsp&nbspPlayer 2 shots: </span><span class='alignright'>"+ p2Shots + "</span><br />"+
			"<span class='alignleft'>Player 1's ships sunk: </span>"+"<span align:'center'>" + p1Sunk + "</span>"+
			"<span> &nbsp&nbsp&nbspPlayer 2's ships sunk: </span><span class='alignright'>" + p2Sunk + "</span><br/>";
	}

	function isFinished() {
		if(p1Sunk == p2Ships) {
			$(output).html("<h1>PLAYER 1 WINS!</h1>")
			gameOver = true;
		} else if(p2Sunk == p1Ships) {
			$(output).html("<h1>PLAYER 2 WINS!</h1>")
			gameOver = true;
		}
	}

	createTiles(width,height);
	placeShips(1);
}

$(function() {
	//Instantiate
	var game = new Battleship();
});