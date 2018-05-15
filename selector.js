"use strict";


(function()
{
    window.addEventListener("load", main);
		opener.close();

}());

function main() {

    window.addEventListener("message", receiveMessage, false);
    var btnExit = document.getElementById("back");
    var btnM = document.getElementById("marco");
    var btnF = document.getElementById("fio");
		var btnT = document.getElementById("trevor");
		var btnN = document.getElementById("nadia");

		console.log(sessionStorage);
    btnExit.addEventListener("click",windowChangerHandeler);
    btnM.addEventListener("mouseover",function(){
				document.body.style.cursor = "pointer";
				btnM.src = "RESOURCES/MarcoPc.png";
    });
    btnF.addEventListener("mouseover",function(){
			document.body.style.cursor = "not-allowed";
			btnF.src = "RESOURCES/FioPc.png";

    });
		btnT.addEventListener("mouseover",function(){
			document.body.style.cursor = "not-allowed";
			btnT.src = "RESOURCES/TrevoPc.png";

		});
		btnN.addEventListener("mouseover",function(){
			document.body.style.cursor = "not-allowed";
			btnN.src = "RESOURCES/NadiaPc.png";
		});

		btnM.addEventListener("mouseout",function(){
			document.body.style.cursor = "default";
			btnM.src = "RESOURCES/MarcoP.png";
    });
    btnF.addEventListener("mouseout",function(){
			document.body.style.cursor = "default";
			btnF.src = "RESOURCES/FioP.png";

    });
		btnT.addEventListener("mouseout",function(){
			document.body.style.cursor = "default";
			btnT.src = "RESOURCES/TrevorP.png";

		});
		btnN.addEventListener("mouseout",function(){
			document.body.style.cursor = "default";
			btnN.src = "RESOURCES/NadiaP.png";
		});

		btnM.addEventListener("click",function(){
			window.open("game.html");
			popup.postMessage("go");
			console.log("sent");
			window.href =""
		});

    function receiveMessage(event)
    {
        console.log("received");
        console.log(event.data);

    }
    opener.window.postMessage("close","*");
    console.log(window.parent);

}

function windowChangerHandeler(ev){
	var myAudio = document.getElementById("aud");
	sessionStorage.setItem("Time",myAudio.currentTime);
	window.open("mainMenu.html");
	popup.postMessage("go");
	console.log("sent");
	window.href =""
}
