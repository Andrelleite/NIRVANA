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


	var control = new Controller();
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var iw = canvas.scrollWidth;
	var ih = canvas.scrollHeight;

	var spriteArray = [];
	var enemyArray = [];
	var enemybullets = [];
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



	var x = Math.floor(Math.random() * iw-105)+1;
	var enemy = new Image();
	enemy.src = "RESOURCES/soldierRest1.png";
	var en = new NPC(0,x,y,145,112,enemy,dx,dy,ctx,canvas);
	enemyArray.push(en);
	var x = Math.floor(Math.random() * iw-105)+1;
	var enemy = new Image();
	enemy.src = "RESOURCES/soldierRest1.png";
	var en = new NPC(1,x,y,145,112,enemy,dx,dy,ctx,canvas);
	enemyArray.push(en);
	document.getElementById('timer').innerHTML = "5:00";
	Timer();


 	ctx.font="20px Georgia";
	var k = document.getElementsByTagName("p")[0];

	function animate(x){
		if(control.exit === -1){
			windowChangerHandeler()
		}
		var anim = requestAnimationFrame(animate);
		ctx.clearRect(0,0,iw,ih);
		spriteArray[0].update(ctx,iw,ih,control,anim);
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
				case 27:// d key
					control.exit *= -1;
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
			spriteArray[0].bulletArray[i].update(anim);
			if(spriteArray[0].bulletArray[i].x >= iw || spriteArray[0].bulletArray[i].y <= 0){
					spriteArray[0].bulletArray.splice(i,1);

				}
				if(spriteArray[0].bulletArray[i].p >= 4){
					spriteArray[0].bulletArray.splice(i,1);
				}else{
					for (var x = 0; x < enemyArray.length; x++) {
						if (spriteArray[0].bulletArray[i].x >= enemyArray[x].x && spriteArray[0].bulletArray[i].y <= enemyArray[x].y + enemyArray[x].height) {
							if(spriteArray[0].bulletArray[i].x <= enemyArray[x].x + enemyArray[x].width && spriteArray[0].bulletArray[i].y > enemyArray[x].y){
								if(pixelCollision(spriteArray[0].bulletArray[i],enemyArray[x])){
									spriteArray[0].bulletArray[i].pop = 1;

									if(enemyArray[x].side === 1 || enemyArray[x].side === 3){
										enemyArray[x].side = 5;
									}
									else if(enemyArray[x].side === 2 || enemyArray[x].side === 0){
										enemyArray[x].side = 4;
									}
								}
							}
						}
					}
				}

		}

		for (var x = 0; x < 2; x++) {
			enemyArray[x].update(anim);



			for (var i = 0; i < enemyArray[x].bullets.length; i++) {
					enemyArray[x].bullets[i].update(anim);
					if(enemyArray[x].bullets[i].x >= iw || enemyArray[x].bullets[i].y <= 0){
						enemyArray[x].bullets.splice(i,1);
					}
					if(enemyArray[x].bullets[i].p >= 4){
						enemyArray[x].bullets.splice(i,1);
					}
					else if (enemyArray[x].bullets[i].x >= spriteArray[0].x && enemyArray[x].bullets[i].y <= spriteArray[0].y + spriteArray[0].height) {
						if(enemyArray[x].bullets[i].x <= spriteArray[0].x + spriteArray[0].width && enemyArray[x].bullets[i].y > spriteArray[0].y){

							if(pixelCollision(spriteArray[0],enemyArray[x].bullets[i])){
								enemyArray[x].bullets[i].pop = 1;
								spriteArray[0].state = 0;
							}
						}
					}
				}

			if(spriteArray[0].d === 9){

				spriteArray.splice(0,1);
				var a = Math.floor(Math.random() * iw-105)+1;
				var novo = new Sprite(a,y,92,110,img,dx,dy,ctx,canvas,true);
				spriteArray.push(novo);
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

			if(enemyArray[x].side !== 4 &&  enemyArray[x].side !== 5){
					if(spriteArray[0].x <= enemyArray[x].x ){
						if(distance(spriteArray[0].x,enemyArray[x].x) > 650){
							enemyArray[x].side = 0;
						}else{
							enemyArray[x].side = 2;
						}
					}else if(spriteArray[0].x + spriteArray[0].width > enemyArray[x].x + enemyArray[x].width){
						if(distance(spriteArray[0].x,enemyArray[x].x + enemyArray[x].width) > 650){
							enemyArray[x].side = 1;
						}else{
							enemyArray[x].side = 3;
						}
					}
			}
			else if(enemyArray[x].sd === 5){
				k.innerHTML = String(spriteArray[0].kills);
				enemyArray.splice(x,1);
				var t = Math.floor(Math.random() * 1);
				spriteArray[0].kills++;

				var t = Math.random();
				if(t > 0.5){
					t = 1;
				}else {
					t = 0;
				}
				var x = Math.floor(Math.random() * iw-105)+1;
				var enemy = new Image();
				enemy.src = "RESOURCES/soldierRest1.png";
				var en = new NPC(t,x,y,145,112,enemy,dx,dy,ctx,canvas);
				enemyArray.push(en);

			}
		}



	}
	animate();


}


function windowChangerHandeler(){

	var popup = window.open("mainMenu.html");
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

function getDataOfImage(img,x,y,w,h)
{
	x = Math.abs(parseInt(x));
	y = Math.abs(parseInt(y));
	w = Math.abs(parseInt(w));
	h = Math.abs(parseInt(h));
	Math.abs(parseInt(x))
	if(w==0) w=1;
	if(h==0) h=1;
	var c = document.createElement("canvas");
	c.width = img.width;
	c.height = img.height;
	var ct = c.getContext("2d");
	ct.clearRect(0,0,c.width,c.height);
	ct.drawImage(img,0,0);
	var imagedata = ct.getImageData(x,y,w,h);
	var rgb = imagedata.data;
	var pixels=new Array(w*h);
	var i=0;
	for(var y=0;y<h;y++)
	{
		for(var x=0;x<w;x++)
		{
			var p=(y*w+x)*4;
			pixels[i]=(rgb[p+3]<<24)|(rgb[p]<< 16)|(rgb[p+1]<<8)|rgb[p+2];
			i++;
		}
	}
	return pixels;
}

function pixelCollision(s1,s2){

		var r = s1.intersection(s2);
		var pixels1 = getDataOfImage(s1.img,r[0]-s1.x,r[1]-s1.y,r[2],r[3]);
		var pixels2 = getDataOfImage(s2.img,r[0]-s2.x,r[1]-s2.y,r[2],r[3]);
		for(var i=0;i<pixels1.length;i++)
		{
			if(pixels1[i]!=0 && pixels2[i]!=0)
			{
				return true;
			}
		}

	return false;
}

function Timer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = Segundos((timeArray[1] - 1));
  if(s==59){m=m-1}

  document.getElementById('timer').innerHTML =
    m + ":" + s;
  setTimeout(Timer, 1000);
}

function Segundos(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec};
  if (sec < 0) {sec = "59"};
  return sec;
}
