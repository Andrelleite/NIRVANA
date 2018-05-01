"use strict";


(function()
{
	window.addEventListener("load", update);
}());

function update()
{
		var myAudio= document.getElementById("aud");
		myAudio.play();
		myAudio.currentTime = 100;

}
