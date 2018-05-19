"use strict";

//-------------------------------------------------------------
//--- CHECK LINE 252 OF ARCADE.JS FOR INFORMATION ABOUT FUNCTION
//-------------------------------------------------------------


(function()
{
	window.addEventListener("load", main);
	opener.close();

}());

function main() {

		var myAudio = document.getElementById("aud");
  	var btnBack = document.getElementById("back");
		var onoff = document.getElementById("som");
		var vol = sessionStorage.getItem("muted");
		var onofffx = document.getElementById("somfx");
		var volfx = sessionStorage.getItem("mutedfx");
		var barValue = document.getElementById("myRangeV");
		var bV = document.getElementById("rangeval");
		var barValueF = document.getElementById("myRangeF");
		var bF = document.getElementById("rangevalf");

		var soundboard = new Sound();

		bV.innerHTML = barValue.value+"%";
		bF.innerHTML = barValueF.value+"%";
		console.log(vol);

		if(vol === 0){
			vol = 1;
		}
		else if(vol == -1){
			 onoff.src = "RESOURCES/SoundOff.png";
		}

		if(volfx === 0){
			volfx = 1;
		}
		else if(volfx == -1){
			 onofffx.src = "RESOURCES/SoundOff.png";
		}


		btnBack.addEventListener("click",function(){
			sessionStorage.setItem("Time",myAudio.currentTime);
			sessionStorage.setItem("Volume",myAudio.volume);
			sessionStorage.setItem("mutedfx",volfx);
			sessionStorage.setItem("muted",vol);
			sessionStorage.setItem("soundBoard",soundboard);
			window.location = "mainMenu.html";
			console.log("sent");
	 	});

 	onoff.addEventListener("click",function() {
	 	vol *= -1;
	 	console.log(vol);
	 	if(vol === 1){
	 			onoff.src = "RESOURCES/Soundon.png";
				myAudio.muted = false;

	 	}else{
	 			onoff.src = "RESOURCES/SoundOff.png";
				myAudio.muted = true;

	 	}

 	});

 onofffx.addEventListener("click",function() {
	 volfx *= -1;
	 if(volfx === 1){
	 		onofffx.src = "RESOURCES/Soundon.png";
			soundboard.setMuted(false);

	 }else{
	 		onofffx.src = "RESOURCES/SoundOff.png";
			soundboard.setMuted(true);
	 }
	 console.log(soundboard.audio.muted);

 });


	 barValue.addEventListener("input",function(e){
		 bV.innerHTML = barValue.value+"%";
		 myAudio.volume = barValue.value/100;
	 });

	 barValueF.addEventListener("input",function(e){
		 bF.innerHTML = barValueF.value+"%";
		 sessionStorage.setItem("Volumefx",barValueF.value/100);
		 soundboard.setVolume(barValueF.value/100);
	 });
	 barValueF.addEventListener("mouseout", function(){
		 console.log("go");
		 soundboard.SoldierShoot();
	 });

	 function receiveMessage(event)
	 {
		 console.log(event.origin);
	 }
}
