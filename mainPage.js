"use strict";


(function()
{
    window.addEventListener("load", main);
		opener.close();

}());

function main() {

    window.addEventListener("message", receiveMessage, false);
    var btnExit = document.getElementById("exit");
    var btnCredit = document.getElementById("credits");
    var btnHelp = document.getElementById("help");
		var btnops = document.getElementById("options");
		var btnPlay = document.getElementById("play");

    btnExit.addEventListener("click",function(){
        console.log("click");
        window.close();
    });
    btnCredit.addEventListener("click",function(){
        window.open("credits.html");
        popup.postMessage("go");
    });
    btnHelp.addEventListener("click",function(){
        window.open("help.html");
				console.log(popup);
				console.log("sending...")
    });
		btnops.addEventListener("click",function(){
				window.open("options.html");
				console.log(popup);
				console.log("sending...")
		});
		btnPlay.addEventListener("click",function(){
			window.open("game.html");

		})

    function receiveMessage(event)
    {
        console.log("received");
        console.log(event.data);

    }
    opener.window.postMessage("close","*");
    console.log(window.parent);

}
