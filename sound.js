"use strict";


(function()
{
	window.addEventListener("load", update);
}());

function update()
{
		var aValue = sessionStorage.getItem("Time");
		var myAudio= document.getElementById("aud");
		var muted = sessionStorage.getItem("muted");
		var vol = sessionStorage.getItem("Volume");

		if(muted == -1){
			myAudio.muted = true;
			console.log("paused");

		}else{
			console.log("playing");
			myAudio.currentTime = aValue;
			myAudio.muted = false;
		}

		myAudio.volume = vol;


}
