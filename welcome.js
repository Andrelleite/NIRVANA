"use strict";


(function()
{
	window.addEventListener("load", main);

}());

function main() {

	window.addEventListener("message", receiveMessage, false);
	var myAudio = document.getElementById("aud");
	var btnNext = document.getElementById("next");
	sessionStorage.setItem('SoundOn', 1);
	sessionStorage.setItem("Volume",1);

	btnNext.addEventListener("click",function(){
		sessionStorage.setItem("Time",myAudio.currentTime);
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
