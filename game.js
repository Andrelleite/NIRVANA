"use strict";

const y = 10;
const dx =  2;
const dy =  2;
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

	document.getElementById('timer').innerHTML = "0:10";

	var soundBoard = new Sound();
	console.log(soundBoard);
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


	var novo = new Sprite(x,y,92,110,img,dx,dy,ctx,canvas,true,soundBoard);
	spriteArray.push(novo);

	var x = Math.floor(Math.random() * iw-105)+1;
	var enemy = new Image();
	enemy.src = "RESOURCES/soldierRest1.png";
	var en = new NPC(0,x,y,145,112,enemy,dx,dy,ctx,canvas,soundBoard);
	enemyArray.push(en);

	var x = Math.floor(Math.random() * iw-105)+1;
	var enemy = new Image();
	enemy.src = "RESOURCES/soldierRest1.png";
	var en = new NPC(1,x,y,145,112,enemy,dx,dy,ctx,canvas,soundBoard);
	enemyArray.push(en);

	Timer();

	ctx.font="20px Georgia";
	var k = document.getElementsByTagName("p")[0];


	//-------------------------------------------------------------
	//--- controlo de animação, loop de animação
	//-------------------------------------------------------------

	function animate(){

		var t = document.getElementById('timer').innerHTML
		var t_check = String(t[0]+""+t[2]+""+t[3]);

		ctx.clearRect(0,0,iw,ih);
		var anim = window.requestAnimationFrame(animate);
		spriteArray[0].update(ctx,iw,ih,control,anim);

		/*Event listener para entrada de botão*/
		window.addEventListener("keydown",function(event){
			keyDownHandle(control,event);
		});
		/*Event listener para saida de botão*/
		window.addEventListener("keyup",function(event) {
			keyUpHandle(control,event);
		});

		[spriteArray,enemyArray] = spriteHitCheck(enemyArray,spriteArray,anim,img,iw,ih,ctx,canvas,soundBoard,k);
		[spriteArray,enemyArray] = coreAnimator(enemyArray,spriteArray,anim,img,iw,ih,ctx,canvas,soundBoard,k);

		if(t_check === "000"){
			window.cancelAnimationFrame(anim);
			wait(control);
		}

	}

	animate();


	//-------------------------------------------------------------
	//--- controlo temporal
	//-------------------------------------------------------------

	function wait(control){
		console.log("waiting...");
		canvas.addEventListener("click",ReturnAction);
		console.log(get);
		setTimeout(wait,1000);
	}

	function ReturnAction(){
		clearTimeout(wait);
		console.log("shit");
		document.getElementById('timer').innerHTML = "0:10";
		window.requestAnimationFrame(animate)
		canvas.removeEventListener("click",ReturnAction);
	}

}



function keyUpHandle(control,event){
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
}

function keyDownHandle(control,event){

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

function getDataOfImage(img,x,y,w,h){
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
	var t_check = String(presentTime[0]+""+presentTime[2]+""+presentTime[3]);

	if(t_check !== "000"){
		setTimeout(Timer, 1000);
		var timeArray = presentTime.split(/[:]+/);
		var m = timeArray[0];
		var s = Segundos((timeArray[1] - 1));
		if(s==59){
			m=m-1;
		}
		document.getElementById('timer').innerHTML =m + ":" + s;

	}else if(t_check === "000"){
		clearTimeout(Timer);
		presentTime = "0:00"
	}
	return presentTime;
}

function Segundos(sec) {
  if (sec < 10 && sec >= 0) {
		sec = "0" + sec
	}
  if (sec < 0) {
		sec = "59"
	}
  return sec;
}

function mapHandle(){

}

function coreAnimator(enemyArray,spriteArray,anim,img,iw,ih,ctx,canvas,soundBoard,k){
	var x;
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
			var novo = new Sprite(a,y,92,110,img,dx,dy,ctx,canvas,true,soundBoard);
			spriteArray.push(novo);
		}

		for (var i = 0; i < spriteArray[0].grenadeArray.length; i++) {
			spriteArray[0].grenadeArray[i].update(anim);

			if(spriteArray[0].grenadeArray[i].state == 15){
				spriteArray[0].grenadeArray.splice(i,1);
			}else if(spriteArray[0].grenadeArray[i].canKill === 1 && (enemyArray[x].x <= spriteArray[0].grenadeArray[i].x + spriteArray[0].grenadeArray[i].width && enemyArray[x].x + enemyArray[x].width >= spriteArray[0].grenadeArray[i].x) ){
				if(enemyArray[x].side === 1 || enemyArray[x].side === 3){
					enemyArray[x].side = 5;
				}
				else if(enemyArray[x].side === 2 || enemyArray[x].side === 0){
					enemyArray[x].side = 4;
				}
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
			var en = new NPC(t,x,y,145,112,enemy,dx,dy,ctx,canvas,soundBoard);
			enemyArray.push(en);

		}
	}

	return [spriteArray,enemyArray];

}

function spriteHitCheck(enemyArray,spriteArray,anim,img,iw,ih,ctx,canvas,soundBoard,k){
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
								soundBoard.HitMark();
								soundBoard.SoldierScream();
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
	return [spriteArray,enemyArray];


}
