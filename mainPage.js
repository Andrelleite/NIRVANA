"use strict";


(function()
{
    window.addEventListener("load", main);
    window.opener.close();

}());

function main() {

    window.addEventListener("message", receiveMessage, false);
    var btnExit = document.getElementById("exit");
    var btnCredit = document.getElementById("credits");
    var btnHelp = document.getElementById("help");

    btnExit.addEventListener("click",function(){
        console.log("click");
        window.close();
    });
    btnCredit.addEventListener("click",function(){
        var popup = window.open("credits.html");
        popup.postMessage("go");
    });
    btnHelp.addEventListener("click",function(){
        window.open("help.html").postMessage("go","*");
				console.log(popup);
				console.log("sending...")
    });

    function receiveMessage(event)
    {
        console.log("received");
        console.log(event.data);

    }
    opener.window.postMessage("close","*");
    console.log(window.parent);

}
