"use strict";


(function()
{
    window.addEventListener("load", main);
		opener.close();

}());

function main() {

	var backbtn = document.getElementById("back");
	var myAudio= document.getElementById("aud");

	backbtn.addEventListener("click",function(){
		sessionStorage.setItem("Time",myAudio.currentTime);

			window.open("mainMenu.html");
			console.log(popup);
			console.log("sending...")
	});

}
