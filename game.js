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

	var spriteArray = [];
	var enemyArray = [];

	var img = new Image();
	img.src = "RESOURCES/rested1.png";

	var enemy = new Image();
	enemy.src = "RESOURCES/soldierRest1.png";

	var x = Math.floor(Math.random() * iw-85)+85;
	var y = 10;
	var dx =  2;
	var dy =  2;
	var novo = new Sprite(x,y,92,110,img,dx,dy,ctx,canvas,true);
	spriteArray.push(novo);

	for (var i = 0; i < 1; i++) {
		var x = Math.floor(Math.random() * iw-105)+1;
		var en = new NPC(x,y,145,112,enemy,dx,dy,ctx,canvas);
		enemyArray.push(en);
	}

	function animate(){

		var anim = requestAnimationFrame(animate);
		ctx.clearRect(0,0,iw,ih);
		spriteArray[0].update(ctx,iw,ih,control,anim);
		enemyArray[0].update(anim);
		/*Event listener para entrada de botão*/
		window.addEventListener("keydown",function(event) {

			var key_state = true;

			switch(event.keyCode) {

				case 37:// left key
					control.left = key_state;
					break;
				case 38:// up key
					control.up = key_state;
					break;
				case 39:// right key
					control.right = key_state;
					break;
				case 40: // down key
					control.down = key_state;
					break;
				case 32:// space key
					control.space = key_state;
					break;
				case 65:// a key
					control.shoot = key_state;
					break;
				case 68:// d key
					control.trow = key_state;
					break;
			}

		});
		/*Event listener para saida de botão*/
		window.addEventListener("keyup",function(event) {

			var key_state = false;

			switch(event.keyCode) {

				case 37:// left key
					control.left = key_state;
					break;
				case 38:// up key
					control.up = key_state;
					break;
				case 39:// right key
					control.right = key_state;
					break;
				case 40:// down key
					control.down = key_state;
					break;
				case 65:// a key
					control.shoot = key_state;
					break;
				case 68:// d key
					control.trow = key_state;
					break;
				case 32:// space key
					control.space = key_state;
					break;
			}


		});

		for (var i = 0; i < spriteArray[0].bulletArray.length; i++) {
			spriteArray[0].bulletArray[i].update();

			if(spriteArray[0].bulletArray[i].x >= iw || spriteArray[0].bulletArray[i].y <= 0){

			}else if (spriteArray[0].bulletArray[i].x >= enemyArray[0].x && spriteArray[0].bulletArray[i].y <= enemyArray[0].y + enemyArray[0].height) {
				if(spriteArray[0].bulletArray[i].x <= enemyArray[0].x + enemyArray[0].width && spriteArray[0].bulletArray[i].y > enemyArray[0].y){
					spriteArray[0].bulletArray.splice(i,1);
					enemyArray.splice(0,1);
					console.log("hit");
					var x = Math.floor(Math.random() * iw-105)+1;
					var en = new NPC(x,y,145,112,enemy,dx,dy,ctx,canvas);
					enemyArray.push(en);
				}
			}
		}

		for (var i = 0; i < spriteArray[0].grenadeArray.length; i++) {
			spriteArray[0].grenadeArray[i].update(anim);

			if(spriteArray[0].grenadeArray[i].state == 15){
				spriteArray[0].grenadeArray.splice(i,1);
			}
		}

		if(spriteArray[0].grenadeArray.length >= 100){
			spriteArray[0].grenadeArray.splice(0,spriteArray[0].grenadeArray.length)
		}


		for (var i = 0; i < enemyArray.length; i++) {
			if(spriteArray[0].x <= enemyArray[i].x ){
				enemyArray[i].side = 0;
			}else if(spriteArray[0].x + spriteArray[0].width > enemyArray[i].x + enemyArray[i].width){
				enemyArray[i].side = 1;
			}
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

	window.open("mainMenu.html");
	popup.postMessage("go");
	console.log("sent");
	window.href =""
}

function onetime(node, type, callback) {

	// create event
	node.addEventListener(type, function(e) {
		// remove event
		e.target.removeEventListener(e.type, arguments.callee);
		// call handler
		return callback(e);
	});

}

function distance(x,y){

	var dist = Math.abs(x-y);

	return dist;

}
