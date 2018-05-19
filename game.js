"use strict";

//----------------------------------------------------------------------------------------
//--- SOME FUNCTIONS IN THIS FILE ARE EQUAL TO ARCADE.JS, TRY FIRST GIVING A LOOK TO IT.
//----------------------------------------------------------------------------------------


const y = 10; /*spawn inicial das sprites inimigas*/
const dx =  2; /*velocidade movimento no vetor x*/
const dy =  2; /*velocidade movimento no vetor y*/
const path = "RESOURCES/"; /*paste de imagens*/
const format = ".png"; /*formato de imagem*/
const floor = 430; /*ponto y correspondente ao chao*/
const spriteCount = 3;
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

	var modal = document.getElementById('myModal');
	var btn = document.getElementById("modalEvent");
	var span = document.getElementsByClassName("close")[0];

	document.getElementById('timer').innerHTML = "10:00";
	var mapHandler = new MapHandle(1);
	var soundBoard = new Sound(); /*objeto com efeitos sonoros*/
	var control = new Controller(); /* controlador do jogo*/
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var iw = canvas.scrollWidth; /*comprimento da canvas*/
	var ih = canvas.scrollHeight; /*altura da canvas*/
	var spriteArray = []; /*array com sprites jogador*/
	var enemyArray = []; /*array que contem objetos do tipo NPC*/

	var img = new Image();
	img.src = "RESOURCES/rested1.png";

	var enemy = new Image();
	enemy.src = "RESOURCES/soldierRest1.png";

	var novo = new Sprite(0,floor,92,110,img,dx,dy,ctx,canvas,true,soundBoard);
	spriteArray.push(novo);


	spriteArray[0].putNemIn(3);

	Timer();

	var k = document.getElementsByTagName("p")[0]; /*elemento HTML para numero de mortes causadas*/
	var d = document.getElementsByClassName("xl")[0]; /*elemento HTML para numero de vidas*/
	d.innerHTML = "Lives: "+String(spriteArray[0].lives); /*inicializar elemento*/

	var paused = 0; /*variavel de estado para animação em caso o menu seja requisitado*/

	//-------------------------------------------------------------
	//--- controlo de animação, loop de animação
	//-------------------------------------------------------------
	function animate(){
		if(paused === 0){
				var t = document.getElementById('timer').innerHTML
				var t_check = String(t[0]+""+t[2]+""+t[3]);
				ctx.clearRect(0,0,iw,ih);
				var anim = window.requestAnimationFrame(animate);
				spriteArray[0].update(ctx,iw,ih,control,anim);

				/*INTRO SECTION*/
				if(anim/100 < 1.5){
					if(spriteArray[0].x <= 60){
						control.down = true;
						control.right = true;
					}else if(spriteArray[0].x > 60){
						control.down = false;
						control.right = false;
						spriteArray[0].giveIntroDx(4);
					}
				}else{
					/*Event listener para entrada de botão*/
					window.addEventListener("keydown",function(event){
						keyDownHandle(control,event);
					});
					/*Event listener para saida de botão*/
					window.addEventListener("keyup",function(event) {
						keyUpHandle(control,event);
					});
				}

				if(spriteArray[0].lives === 0){
					clearTimeout(Timer);
					localStorage.setItem("players1",document.getElementById('timer').innerHTML);
					localStorage.setItem("players1kills",spriteArray[0].kills);

					window.cancelAnimationFrame(anim);
					window.open("congratz.html");
				}

				/*controlo de animacao e jogabilidade*/
				enemyArray = mapSet(mapHandler,enemyArray,spriteArray,anim,img,iw,ih,ctx,canvas,soundBoard,k);
				[spriteArray,enemyArray] = spriteHitCheck(enemyArray,spriteArray,anim,img,iw,ih,ctx,canvas,soundBoard,k);

				/*Map stance sprite creator */
				if(spriteArray[0].mapstance === 2){
					if(enemyArray.length === 0){
						var x = Math.floor(Math.random() * iw-105)+1;
						var enemy = new Image();
						enemy.src = "RESOURCES/soldierRest1.png";
						var en = new NPC(0,800,floor,145,112,enemy,dx,dy,ctx,canvas,soundBoard);
						enemyArray.push(en);

						var x = Math.floor(Math.random() * iw-105)+1;
						var enemy = new Image();
						enemy.src = "RESOURCES/soldierRest1.png";
						var en = new NPC(0,900,floor,145,112,enemy,dx,dy,ctx,canvas,soundBoard);
						enemyArray.push(en);

						var x = Math.floor(Math.random() * iw-105)+1;
						var enemy = new Image();
						enemy.src = "RESOURCES/soldierRest1.png";
						var en = new NPC(1,700,floor,145,112,enemy,dx,dy,ctx,canvas,soundBoard);
						enemyArray.push(en);
					}

				}
				else if(spriteArray[0].mapstance === 3){
					if(enemyArray.length === 0){
						var x = Math.floor(Math.random() * iw-105)+1;
				 	 var enemy = new Image();
				 	 enemy.src = "RESOURCES/soldierRest1.png";
				 	 var en = new NPC(0,500,floor,145,112,enemy,dx,dy,ctx,canvas,soundBoard);
				 	 enemyArray.push(en);

				 	 var x = Math.floor(Math.random() * iw-105)+1;
				 	 var enemy = new Image();
				 	 enemy.src = "RESOURCES/soldierRest1.png";
				 	 var en = new NPC(1,850,floor,145,112,enemy,dx,dy,ctx,canvas,soundBoard);
				 	 enemyArray.push(en);

				 	 var x = Math.floor(Math.random() * iw-105)+1;
				 	 var enemy = new Image();
				 	 enemy.src = "RESOURCES/soldierRest1.png";
				 	 var en = new NPC(1,700,floor,145,112,enemy,dx,dy,ctx,canvas,soundBoard);
				 	 enemyArray.push(en);
					}

				}
				else if(spriteArray[0].mapstance === 1){
					if(enemyArray.length === 0){
						var x = Math.floor(Math.random() * iw-105)+1;
				 	 var enemy = new Image();
				 	 enemy.src = "RESOURCES/soldierRest1.png";
				 	 var en = new NPC(0,500,floor,145,112,enemy,dx,dy,ctx,canvas,soundBoard);
				 	 enemyArray.push(en);

				 	 var x = Math.floor(Math.random() * iw-105)+1;
				 	 var enemy = new Image();
				 	 enemy.src = "RESOURCES/soldierRest1.png";
				 	 var en = new NPC(1,850,floor,145,112,enemy,dx,dy,ctx,canvas,soundBoard);
				 	 enemyArray.push(en);

				 	 var x = Math.floor(Math.random() * iw-105)+1;
				 	 var enemy = new Image();
				 	 enemy.src = "RESOURCES/soldierRest1.png";
				 	 var en = new NPC(1,300,floor,145,112,enemy,dx,dy,ctx,canvas,soundBoard);
				 	 enemyArray.push(en);
					}

				}

				for (var x = 0; x <spriteCount; x++) {
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

						var novo = new Sprite(50,floor,92,110,img,dx,dy,ctx,canvas,true,soundBoard);
						novo.putNemIn(spriteArray[0].nem);
						novo.mapstance = spriteArray[0].mapstance;
						novo.lives = spriteArray[0].lives - 1;
						novo.kills = spriteArray[0].kills;
						d.innerHTML = "Lives: "+String(novo.lives);

						spriteArray.splice(0,1);
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
						k.innerHTML = "KiLLs: "+String(spriteArray[0].kills);
						spriteArray[0].nem--;
						enemyArray.splice(x,1);
						var t = Math.floor(Math.random() * 1);
						spriteArray[0].kills++;

						var t = Math.random();
						if(t > 0.5){
							t = 1;
						}else {
							t = 0;
						}

						if(enemyArray.length === 0 && spriteArray[0].mapstance === 3){
							window.cancelAnimationFrame(anim);
							localStorage.setItem("players1",document.getElementById('timer').innerHTML);
							localStorage.setItem("players1kills",spriteArray[0].kills);

							window.open("congratz.html");
						}
						else if(enemyArray.length === 0){
							var x = Math.floor(Math.random() * iw-105)+1;
			 		 	 	var enemy = new Image();
			 		 	 	enemy.src = "RESOURCES/soldierRest1.png";
			 		 	 	var en = new NPC(t,30,floor,145,112,enemy,dx,dy,ctx,canvas,soundBoard);
			 		 	 	enemyArray.push(en);
						}

					}
				}


				if(t_check === "000"){
					window.cancelAnimationFrame(anim);
					wait(control);
					window.sessionStorage.setItem("players1",document.getElementById('timer').innerHTML);
					localStorage.setItem("players1kills",spriteArray[0].kills);

					window.open("highscores.html");
				}
			}


	}

	animate();


	//-------------------------------------------------------------
	//--- controlo temporal
	//-------------------------------------------------------------

	function wait(control){ /* timeout wait */
		console.log("waiting...");
		canvas.addEventListener("click",ReturnAction);
		console.log(get);
		setTimeout(wait,1000);
	}

	function ReturnAction(){ /* return to play action*/
		clearTimeout(wait);
		console.log("shit");
		document.getElementById('timer').innerHTML = "0:10";
		window.requestAnimationFrame(animate)
		canvas.removeEventListener("click",ReturnAction);
	}

	window.addEventListener("keypress",function(event){
		if(event.keyCode === 27){
			sessionStorage.setItem("timestop",1);
			modal.style.display = "block";
			paused = 1;
			microOptions(soundBoard);
		}
	});
	span.addEventListener("click", function() {
			modal.style.display = "none";
			paused = 0;
			sessionStorage.setItem("timestop",0);
			animate();
			Timer();

	});


}


function updateKills(){

	var k = document.getElementsByTagName("p")[0];
	var text = k.split();
	console.log(text);



}



function microOptions(soundboard){


			var myAudio = document.getElementById("aud");
			var btnBack = document.getElementById("btnExit");
			var onoff = document.getElementById("som");
			var vol = sessionStorage.getItem("muted");
			var onofffx = document.getElementById("somfx");
			var volfx = sessionStorage.getItem("mutedfx");
			var barValue = document.getElementById("myRangeV");
			var bV = document.getElementById("rangeval");
			var barValueF = document.getElementById("myRangeF");
			var bF = document.getElementById("rangevalf");

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


}

function mapSet(mapHandler,enemyArray,spriteArray,anim,img,iw,ih,ctx,canvas,soundBoard,k){
	if (spriteArray[0].x + spriteArray[0].width < 0 && spriteArray[0].mapstance > 1) {

	 spriteArray[0].x = spriteArray[0].canvas.scrollWidth;
	 spriteArray[0].mapstance--;
	 spriteArray[0].dy = 0;
	 enemyArray = [];
 }
 else if (spriteArray[0].x > spriteArray[0].canvas.scrollWidth && spriteArray[0].mapstance < 3) {
	 spriteArray[0].mapstance++;
	 spriteArray[0].x = 0;
	 spriteArray[0].dy = 0;
	 enemyArray=[];
	 enemyArray = [];



 }else if (spriteArray[0].x <= 0 && spriteArray[0].mapstance === 1) {
	 spriteArray[0].mapstance = 1;
	 spriteArray[0].x = 0;
	 spriteArray[0].dy = 0;

 }else if (spriteArray[0].x+spriteArray[0].width > spriteArray[0].canvas.scrollWidth && spriteArray[0].mapstance === 3) {
	 spriteArray[0].mapstance = 3;
	 spriteArray[0].x = this.canvas.scrollWidth-this.width;
	 spriteArray[0].dy = 0;

 }
 spriteArray[0].canvas.style.backgroundImage = "url('RESOURCES/map"+String(spriteArray[0].lvl)+""+String(spriteArray[0].mapstance)+".png')";
	return enemyArray;
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
	var stop = sessionStorage.getItem("timestop");
	var timer;


	if(t_check !== "000"){
		timer = setTimeout(Timer, 1000);
		console.log(timer);
		if(parseInt(stop) === 1){
			clearTimeout(timer);
		}
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

function coreAnimator(enemyArray,spriteArray,anim,img,iw,ih,ctx,canvas,soundBoard,k){
	var x;


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
