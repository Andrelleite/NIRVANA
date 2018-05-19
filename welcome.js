"use strict";


(function()
{
	window.addEventListener("load", main);

}());

function main() {

		var modal = document.getElementById('myModal'); /* modal popup elemento*/
		var btn = document.getElementById("modalEvent");
		var span = document.getElementsByClassName("close")[0]; /* botao exit modal*/

		btn.addEventListener("click", function(){
		    modal.style.display = "block";
		});
		span.addEventListener("click", function() {
		    modal.style.display = "none";
		});
		window.addEventListener("click",function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		});

	window.addEventListener("message", receiveMessage, false);

	//----------------------------------------------------------------------------------------
	//--- INICIALIZACAO DE DADOS EM SESSION STORAGE 
	//----------------------------------------------------------------------------------------

	var myAudio = document.getElementById("aud");
	var btnNext = document.getElementById("next");
	sessionStorage.setItem('SoundOn', 1);
	sessionStorage.setItem("Volume",0.5);
	sessionStorage.setItem("muted",1);
	sessionStorage.setItem("Volumefx",0.5);
	sessionStorage.setItem("mutedfx",1);

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
