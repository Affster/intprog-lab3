"use strict";

var Battleship = function() {
	var board = new Map();
	var placedShips = new Map();
	var attacked = new Map();

	/*function changeColor(id) {
		//element.style.backgroundColor = "red";
		console.log(board.get(id));

		$("button"+id).style = 'background-color:red';
	}*/

	/*
	var Button = function(id) {
		var id = id;
		var clicked = false;
		var bg = '#fff';

		this.clicked = function() {
			if(clicked) {
				clicked = false;
				bg = '#fff';
			} else {
				clicked = true;
				bg = '#ff0000';
			}
		}

		this.getButton = function() {
			return button;
		}

		var button = document.createElement("BUTTON");
		var text = document.createTextNode(" ");
		button.appendChild(text);
		button.addEventListener("click", this.clicked);

		board.set(id,this);
	}
	*/

	function createBoard(width,height) {
		var id = 0;
		var numShips = 0;
		var output = document.getElementById("battleships");
		$(output).html("Player 1: Place your ships! <br />");
		var setShips = document.getElementById("shipInfo");
		$(setShips).html("# of ships: " + numShips);

		for(var i = 0; i < height; i++) {
			for(var j = 0; j < width; j++) {
				var button = document.createElement("BUTTON");
				var text = document.createTextNode(" ");
				button.appendChild(text);
				button.setAttribute("id","button"+id);
				//button.setAttribute("disabled","disabled")
				button.style = "background-color:white";

				button.addEventListener("click", function() {
					if(this.style.backgroundColor == "white") {
						this.style = "background-color:red";
						numShips++;
						$(setShips).html("# of ships: " + numShips);
					} else {
						this.style = "background-color:white";
						numShips--;
						$(setShips).html("# of ships: " + numShips);
					}
				});
				board.set(id,button);

				$(output).append(button);
				id++;
			}
			$(output).append("<br />");
		}

		var startButton = document.createElement("BUTTON");
		var startText = document.createTextNode("START");
		startButton.appendChild(startText);

		var resetButton = document.createElement("BUTTON");
		var resetText = document.createTextNode("RESET");
		resetButton.appendChild(resetText);

		startButton.addEventListener("click", function() {
			for(var i = 0; i < (width*height); i++) {
				board.get(i).setAttribute("disabled","disabled");
				//board.get(i).style = "background-color:white";
				if(board.get(i).style.backgroundColor == "red") {
					placedShips.set(i,true);
				}
			}
			resetButton.setAttribute("disabled","disabled");
			startButton.setAttribute("disabled","disabled");
			attackBoard(width,height,numShips);
		});

		resetButton.addEventListener("click", function() {
			for(var i = 0; i < (width*height); i++) {
				board.get(i).style = "background-color:white";
				numShips = 0;
				$(setShips).html("# of ships: " + numShips);
			}
		});

		$(output).append(startButton);
		$(output).append(resetButton);
	}

	function attackBoard(width,height,numPlacedShips) {
		var id = 0;
		var hitShips = 0;
		var shotsFired = 0;

		var output = document.getElementById("battleships");
		$(output).html("Player 2: Shoot the ships!<br />");

		var setShipInfo = document.getElementById("shipInfo");
		$(setShipInfo).html("# of placed ships: " + numPlacedShips + "<br /># of hit ships: " + hitShips + "<br /># of shots fired: " + shotsFired);

		for(var i = 0; i < height; i++) {
			for(var j = 0; j < width; j++) {
				var button = document.createElement("BUTTON");
				var text = document.createTextNode(" ");

				button.appendChild(text);
				button.setAttribute("id","button"+id);
				//button.setAttribute("disabled","disabled")
				button.style = "background-color:white";

				if(placedShips.get(id) == true) {
					button.addEventListener("click", function() {
						this.style = "background-color:green";
						shotsFired++;
						hitShips++;
						$(setShipInfo).html("# of placed ships: " + numPlacedShips + "<br /># of hit ships: " + hitShips + "<br /># of shots fired: " + shotsFired);
						if(hitShips == numPlacedShips) {
							finishedGame();
						}
					});
				} else {
					button.addEventListener("click", function() {
						this.style = "background-color:red";
						shotsFired++;
						$(setShipInfo).html("# of placed ships: " + numPlacedShips + "<br /># of hit ships: " + hitShips + "<br /># of shots fired: " + shotsFired);
					});
				}

				$(output).append(button);
				id++;
			}
			$(output).append("<br />");
		}
	}

	function finishedGame() {
		var output = document.getElementById("battleships");
		$(output).html("Player 2 shot down all of the ships!<br />");
	}

	var width = 9;
	var height = 9;

	createBoard(width,height);
}

$(function() {
	//Instantiate
	var game = new Battleship();
});