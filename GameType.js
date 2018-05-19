"use strict";


(function()
{
    window.addEventListener("load", main);
		opener.close();

}());

function main() {

    window.addEventListener("message", receiveMessage, false);
    var btnExit = document.getElementById("exit");
    var btnArcade = document.getElementById("arcade");
    var btnStory = document.getElementById("story");


		console.log(sessionStorage);
    btnExit.addEventListener("click",windowChangerHandeler);

		btnArcade.addEventListener("click",goPlayArcade);

		btnStory.addEventListener("click",goPlayStory);


    function receiveMessage(event)
    {
        console.log("received");
        console.log(event.data);

    }
    opener.window.postMessage("close","*");
    console.log(window.parent);

}

//----------------------------------------------------------------------------------------
//--- SELECTOR OF GAME TYPE
//----------------------------------------------------------------------------------------

function windowChangerHandeler(ev){
	var myAudio = document.getElementById("aud");
	sessionStorage.setItem("Time",myAudio.currentTime);
	window.open("selector.html");
	popup.postMessage("go");
	console.log("sent");
	window.href =""
}

function goPlayArcade(ev){
	var myAudio = document.getElementById("aud");
	sessionStorage.setItem("Time",myAudio.currentTime);
	window.open("Arcade.html");
	popup.postMessage("go");
	console.log("sent");
	window.href =""
}

function goPlayStory(ev){
	var myAudio = document.getElementById("aud");
	sessionStorage.setItem("Time",myAudio.currentTime);
	window.open("game.html");
	popup.postMessage("go");
	console.log("sent");
	window.href =""
}
