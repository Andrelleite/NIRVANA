"use strict";


(function()
{
    window.addEventListener("load", main);
		opener.close();

}());

function main() {

    window.addEventListener("message", receiveMessage, false);
		var myAudio= document.getElementById("aud");
    var btnExit = document.getElementById("exit");
    var btnCredit = document.getElementById("credits");
    var btnHelp = document.getElementById("help");
		var btnops = document.getElementById("options");
		var btnPlay = document.getElementById("play");
		var scores = document.getElementById("highscores");
		var nextUpdate = document.getElementById("update");

		console.log(sessionStorage.getItem("player"));


		//----------------------------------------------------------------------------------------
		//--- page management
		//----------------------------------------------------------------------------------------


    btnExit.addEventListener("click",function(){
        console.log("click");
        window.close();
    });
    btnCredit.addEventListener("click",function(){
			sessionStorage.setItem("Time",myAudio.currentTime);

        window.open("credits.html");
        popup.postMessage("go");
    });
    btnHelp.addEventListener("click",function(){
			sessionStorage.setItem("Time",myAudio.currentTime);

        window.open("help.html");
				console.log(popup);
				console.log("sending...")
    });
		btnops.addEventListener("click",function(){
			sessionStorage.setItem("Time",myAudio.currentTime);

				window.open("options.html");
				console.log(popup);
				console.log("sending...")
		});
		btnPlay.addEventListener("click",function(){
			sessionStorage.setItem("Time",myAudio.currentTime);
			window.open("selector.html");

		});
		scores.addEventListener("click",function(){
			sessionStorage.setItem("Time",myAudio.currentTime);
			window.open("highscores.html");

		});
		nextUpdate.addEventListener("click",function(){
			sessionStorage.setItem("Time",myAudio.currentTime);
			window.open("nextupdate.html");
		});

    function receiveMessage(event)
    {
        console.log("received");
        console.log(event.data);

    }
    opener.window.postMessage("close","*");
    console.log(window.parent);

}
