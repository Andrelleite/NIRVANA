"use strict";


(function()
{
	window.addEventListener("load", main);
	window.opener.close();

}());

function main() {

  	var btnBack = document.getElementById("back");
  	btnBack.addEventListener("click",function(){
			var popup = window.open("mainMenu.html");
			popup.postMessage("go");
			console.log("sent");
			window.href =""
	 });

	 function receiveMessage(event)
	 {
		 console.log(event.origin);
	 }
}
