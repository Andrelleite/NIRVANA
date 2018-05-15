"use strict";


(function()
{
	window.addEventListener("load", main);
	opener.close();

}());

function main() {

		var myAudio = document.getElementById("aud");
  	var btnBack = document.getElementById("back");
		var onoff = document.getElementById("som");
		var vol = sessionStorage.getItem("Volume");

		if(vol == -1){
			 onoff.src = "RESOURCES/SoundOff.png";
		}

		btnBack.addEventListener("click",function(){
			sessionStorage.setItem("Time",myAudio.currentTime);
			window.location = "mainMenu.html";
			console.log("sent");
	 });

	 onoff.addEventListener("click",function() {
		 vol *= -1;
		 console.log(vol);
		 if(vol === 1){
		 		onoff.src = "RESOURCES/Soundon.png";
		 }else{
		 		onoff.src = "RESOURCES/SoundOff.png";
		 }

		 sessionStorage.setItem("Volume",vol);
		 update();
	 })


	 function receiveMessage(event)
	 {
		 console.log(event.origin);
	 }
}
