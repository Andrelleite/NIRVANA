"use strict";

const path = "RESOURCES/";
const format = ".png";

(function()
{
	window.addEventListener("load", main);
	opener.close();

}());

function main() {

	init();

	window.addEventListener("message",receiveMessage);

	function receiveMessage(event){
		console.log(event.origin);
 	}


}

function init(){

	var btnBack = document.getElementById("back");
	btnBack.addEventListener("click",windowChangerHandeler);
	var control = new Controller();



	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var iw = canvas.scrollWidth;
	var ih = canvas.scrollHeight;

	var rightarrow = document.getElementById("rightarrow");
	var leftarrow = document.getElementById("leftarrow");
	var downarrow = document.getElementById("downarrow");
	var uparrow = document.getElementById("uparrow");
	var akey = document.getElementById("akey");
	var dkey = document.getElementById("dkey");
	var space = document.getElementById("space");

	var spriteArray = [];
	var img = new Image();
	img.src = "RESOURCES/rested1.png";

	for (var i = 0; i < 1; i++) {
		var x = Math.floor(Math.random() * iw)+50;
		var y = 10;
		var dx =  2;
		var dy =  2;
		var novo = new Sprite(x,y,85,110,img,dx,dy,ctx,canvas,true);
		spriteArray.push(novo);
	}

	function animate(){

		var anim = requestAnimationFrame(animate);
		ctx.clearRect(0,0,iw,ih);

		/*Event listener para entrada de botão*/
		window.addEventListener("keydown",function(event) {

			var key_state = true;

			switch(event.keyCode) {

				case 37:// left key
					control.left = key_state;
					leftarrow.src = path+"leftarrowc"+format;
					break;
				case 38:// up key
					control.up = key_state;
					uparrow.src = path+"uparrowc"+format;
					break;
				case 39:// right key
					control.right = key_state;
					rightarrow.src = path+"rightarrowc"+format;
					break;
				case 40: // down key
					control.down = key_state;
					downarrow.src = path+"downarrowc"+format;
					break;
				case 65:// a key
					control.shoot = key_state;
					akey.src = path+"akeyc"+format;
					break;
				case 68:// d key
					control.trow = key_state;
					dkey.src = path+"dkeyc"+format;
					break;
				case 32:// space key
					control.space = key_state;
					space.src = path+"spacec"+format;
					break;
			}

		});

		/*Event listener para saida de botão*/
		window.addEventListener("keyup",function(event) {

			var key_state = false;

			switch(event.keyCode) {

				case 37:// left key
					control.left = key_state;
					leftarrow.src = path+"leftarrow"+format;
					break;
				case 38:// up key
					control.up = key_state;
					uparrow.src = path+"uparrow"+format;
					break;
				case 39:// right key
					control.right = key_state;
					rightarrow.src = path+"rightarrow"+format;
					break;
				case 40:// down key
					control.down = key_state;
					downarrow.src = path+"downarrow"+format;
					break;
				case 65:// a key
					control.shoot = key_state;
					akey.src = path+"akey"+format;
					break;
				case 68:// d key
					control.trow = key_state;
					dkey.src = path+"dkey"+format;
					break;
				case 32:// space key
					control.space = key_state;
					space.src = path+"space"+format;
					break;
			}


		});

		spriteArray[0].update(ctx,iw,ih,control,anim);
		for (var i = 0; i < spriteArray[0].bulletArray.length; i++) {
			spriteArray[0].bulletArray[i].update();
		}
		for (var i = 0; i < spriteArray[0].grenadeArray.length; i++) {
			spriteArray[0].grenadeArray[i].update();
		}

		if(spriteArray[0].bulletArray.x >= iw || spriteArray[0].bulletArray.y <= 0){
			spriteArray[0].bulletArray.splice(0,spriteArray[0].bulletArray.length)
		}
		if(spriteArray[0].grenadeArray.length >= 100){
			spriteArray[0].grenadeArray.splice(0,spriteArray[0].grenadeArray.length)
		}

	}
	animate();

	canvas.addEventListener("mousemove",function(ev){
		var x = ev.x;
		var y = ev.y;
		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;
	});
}


function windowChangerHandeler(ev){
	var myAudio= document.getElementById("aud");

	sessionStorage.setItem("Time",myAudio.currentTime);

	window.location = "mainMenu.html";
	popup.postMessage("go");
	console.log("sent");
	window.href =""
}
