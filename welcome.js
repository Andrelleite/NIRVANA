"use strict";


(function()
{
	window.addEventListener("load", main);

}());

function main() {

	window.addEventListener("message", receiveMessage, false);
	var btnNext = document.getElementById("next");

	btnNext.addEventListener("click",function(){
		 var popup = window.open("mainMenu.html");
		 popup.postMessage("go");
		 console.log("sent");
		 window.href = "";
	});

	function receiveMessage(event)
	{
  	console.log(event.origin);
		window.close();
	}

}
