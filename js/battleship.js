"use strict";

var Battleship = function() {
	var board = new Map();
	var numShips = 0;

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
		var output = document.getElementById("battleships");
		var setShips = document.getElementById("numberOfShips");
		$(setShips).html(numShips);

		for(var i = 0; i < height; i++) {
			for(var j = 0; j < width; j++) {
				var button = document.createElement("BUTTON");
				var text = document.createTextNode(" ");
				button.appendChild(text);
				button.style = "background-color:white";

				button.addEventListener("click", function() {
					if(this.style.backgroundColor == "white") {
						this.style = "background-color:red";
						numShips++;
						$(setShips).html(numShips);
					} else {
						this.style = "background-color:white";
						numShips--;
						$(setShips).html(numShips);
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
		startButton.addEventListener("click", function() {
			for(var m in board) {
				m.setAttribute("disabled","disabled");
			}
		});

		$(output).append(startButton)
	}

	var width = 9;
	var height = 9;


	createBoard(width,height);
}

$(function() {
	//Instantiate
	var game = new Battleship();
});