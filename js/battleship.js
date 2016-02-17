"use strict";

var Battleship = function() {
	this.changeColor = function(element) {
		element.style.color = "red";
	}

	var width = 9;
	var height = 9;
	var buttonID = 0;
	var output = document.getElementById("battleships");

	for(var i = 0; i < height; i++) {
		for(var j = 0; j < width; j++) {
			$(output).append("<button id=\"button"+buttonID+"\" onclick=\"changeColor(this)\">&nbsp;</button>");
			buttonID++;
		}
		$(output).append("<br />");
	}

	
}

$(function() {
	//Instantiate
	var game = new Battleship();
});