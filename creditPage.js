"use strict";


(function()
{
	window.addEventListener("load", main);
	opener.close();

}());

function main() {
		var myAudio= document.getElementById("aud");

  	var btnBack = document.getElementById("back");
  	btnBack.addEventListener("click",function(){
			sessionStorage.setItem("Time",myAudio.currentTime);

			window.location = "mainMenu.html";
			popup.postMessage("go");
			console.log("sent");
	 });

	 function receiveMessage(event)
	 {
		 console.log(event.origin);
	 }
}
