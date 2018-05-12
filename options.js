"use strict";


(function()
{
	window.addEventListener("load", main);

}());

function main() {

  	var btnBack = document.getElementById("back");
  	btnBack.addEventListener("click",function(){
			window.location = "mainMenu.html";
			popup.postMessage("go");
			console.log("sent");
	 });

	 function receiveMessage(event)
	 {
		 console.log(event.origin);
	 }
}
