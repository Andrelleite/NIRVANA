"use strict";

const y = 10; /*spawn inicial das sprites inimigas*/
const dx =  2; /*velocidade movimento no vetor x*/
const dy =  2; /*velocidade movimento no vetor y*/
const path = "RESOURCES/"; /*paste de imagens*/
const format = ".png"; /*formato de imagem*/
const floor = 430; /*ponto y correspondente ao chao*/

(function()
{
	window.addEventListener("load", main);
	opener.close(); /*Fecha janela opener*/
}());

function main() {

	init();

	window.addEventListener("message",receiveMessage);

	function receiveMessage(event){
		console.log(event.origin);
 	}


}

function init(){

	var modal = document.getElementById('myModal'); /*Pause Menu*/
	var btn = document.getElementById("modalEvent");
	var span = document.getElementsByClassName("close")[0]; /*close button on menu*/


	document.getElementById('timer').innerHTML = "0:00";
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
	img.src = "RESOURCES/rested1.png"; /* atribuicao da primeira sprite ao personagem*/

	var novo = new Sprite(0,floor,92,110,img,dx,dy,ctx,canvas,true,soundBoard); /*novo personagem*/
	spriteArray.push(novo);

	enemyArray = firstSpawn(enemyArray,iw,ih,ctx,canvas,soundBoard);

	spriteArray[0].putNemIn(3);

	ctx.font="20px Georgia";

	var k = document.getElementsByTagName("p")[0]; /*elemento HTML para numero de mortes causadas*/
	var d = document.getElementsByClassName("xl")[0]; /*elemento HTML para numero de vidas*/
	d.innerHTML = "Lives: "+String(spriteArray[0].lives); /*inicializar elemento*/

	var paused = 0; /*variavel de estado para animação em caso o menu seja requisitado*/

	//-------------------------------------------------------------
	//--- controlo de animação, loop de animação
	//-------------------------------------------------------------

	var [ct,timer] = Timer(); /*inicializar cronometro de jogo*/


	function animate(){
		console.log(paused);
		if(paused === 0){

			var t = document.getElementById('timer').innerHTML /*elemento html para numero de mortes*/
			var t_check = String(t[0]+""+t[2]+""+t[3]); /* tempo x:yz */
			ctx.clearRect(0,0,iw,ih); /* refresh animator */
			var anim = window.requestAnimationFrame(animate); /* atualizar animação*/
			spriteArray[0].update(ctx,iw,ih,control,anim); /* atualizar fisica da personagem*/

			/*INTRO SECTION*/
			if(anim/100 < 0.8){ /* duration 0.8 */
				if(spriteArray[0].x <= 60){
					control.down = true; /*prone forçado*/
					control.right = true; /*evento de movimento forçado*/
				}else if(spriteArray[0].x > 60){
					control.down = false; /*libertação do prone*/
					control.right = false; /*evento de movimento restaurado*/
					spriteArray[0].giveIntroDx(4); /* atribui a velociade padrão ao sprite */
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

			/*controlo de animacao e jogabilidade*/
			mapSet(mapHandler,enemyArray,spriteArray,anim,img,iw,ih,ctx,canvas,soundBoard,k);
			[spriteArray,enemyArray] = spriteHitCheck(enemyArray,spriteArray,anim,img,iw,ih,ctx,canvas,soundBoard,k); /*colicao sprite -> NPC */

			for (var x = 0; x < 3; x++) { /*sempre 3 inimigos em campo alpha lvl pattern*/

				enemyArray[x].update(anim); /* atualizar animaçao de NPC*/



				for (var i = 0; i < enemyArray[x].bullets.length; i++) { /* gestao de animacao de bullet sprite do NPC*/

						enemyArray[x].bullets[i].update(anim);

						if(enemyArray[x].bullets[i].x >= iw || enemyArray[x].bullets[i].y <= 0){ /*saida dos limites da canvas*/
							enemyArray[x].bullets.splice(i,1);
						}

						if(enemyArray[x].bullets[i].p >= 4){ /*estado da animacao final da bullet em colisao*/
							enemyArray[x].bullets.splice(i,1);
						}

						else if (enemyArray[x].bullets[i].x >= spriteArray[0].x && enemyArray[x].bullets[i].y <= spriteArray[0].y + spriteArray[0].height) { /*entrada nos limites da sprite*/
							if(enemyArray[x].bullets[i].x <= spriteArray[0].x + spriteArray[0].width && enemyArray[x].bullets[i].y > spriteArray[0].y){

								if(pixelCollision(spriteArray[0],enemyArray[x].bullets[i])){ /*colisao por pixel em sprite*/
									enemyArray[x].bullets[i].pop = 1;
									spriteArray[0].state = 0;
								}
							}
						}
					}

				if(spriteArray[0].d === 9){ /* estado final de animcao de morte da sprite */
					var x = Math.floor(Math.random() * iw-105)+1;

					var novo = new Sprite(x,floor,92,110,img,dx,dy,ctx,canvas,true,soundBoard); /*cria novo sprite com caracteristicas da incial*/
					novo.putNemIn(spriteArray[0].nem); /* definir numero de inimigos presentes para novo sprite*/
					novo.mapstance = spriteArray[0].mapstance; /*definir o estado em mapa do sprite anterior*/
					novo.lives = spriteArray[0].lives - 1; /* atribuir as vidas do sprite anterior com menos 1*/
					d.innerHTML = "Lives: "+novo.lives; /* redefinir elemento HTML para numero de vidas*/
					spriteArray.splice(0,1);
					spriteArray.push(novo); /* reposição no array */
				}

				for (var i = 0; i < spriteArray[0].grenadeArray.length; i++) {/* atualizacao da sprite grenade da sprite*/

					spriteArray[0].grenadeArray[i].update(anim);

					if(spriteArray[0].grenadeArray[i].state == 15){ /*estado final de animacao -> retirada do array*/
						spriteArray[0].grenadeArray.splice(i,1);
					}else if(spriteArray[0].grenadeArray[i].canKill === 1 && (enemyArray[x].x <= spriteArray[0].grenadeArray[i].x + spriteArray[0].grenadeArray[i].width && enemyArray[x].x + enemyArray[x].width >= spriteArray[0].grenadeArray[i].x) ){   /*verificacao se elemento NPC esta nas viscinidades da sprite grenade*/
						if(enemyArray[x].side === 1 || enemyArray[x].side === 3){
							enemyArray[x].side = 5; /*atribui estado para animcao de morte para direcao correspondente*/
						}
						else if(enemyArray[x].side === 2 || enemyArray[x].side === 0){
							enemyArray[x].side = 4; /*atribui estado para animcao de morte para direcao correspondente*/
						}
					}
				}

				if(spriteArray[0].grenadeArray.length >= 100){ /* verificar existencia excessiva de sprites grenade*/
					spriteArray[0].grenadeArray.splice(0,spriteArray[0].grenadeArray.length)
				}

				if(enemyArray[x].side !== 4 &&  enemyArray[x].side !== 5){ /* correcao de direcao consoante posicao da sprite personagem*/
						if(spriteArray[0].x <= enemyArray[x].x ){
							if(distance(spriteArray[0].x,enemyArray[x].x) > 650){ /* verificar proximidade */
								enemyArray[x].side = 0; /* stand still*/
							}else{
								enemyArray[x].side = 2; /* shoot */
							}
						}else if(spriteArray[0].x + spriteArray[0].width > enemyArray[x].x + enemyArray[x].width){
							if(distance(spriteArray[0].x,enemyArray[x].x + enemyArray[x].width) > 650){
								enemyArray[x].side = 1;
							}else{
								enemyArray[x].side = 3;
							}
						}
				}
				else if(enemyArray[x].sd === 5){ /* estado da animacao de morte do NPC */
					k.innerHTML = "Kills: "+String(spriteArray[0].kills);
					spriteArray[0].nem--;
					enemyArray.splice(x,1);
					var t = Math.floor(Math.random() * 1);
					spriteArray[0].kills++;
					randomSpawn(enemyArray,iw,ih,ctx,canvas,soundBoard);


				}
			}

			if(spriteArray[0].lives === 0){ /* verificacao do estado de vidas da sprite*/
				window.cancelAnimationFrame(anim);
				localStorage.setItem("players1Arc",document.getElementById('timer').innerHTML); /* guarda tempo do jogador na memoria do browser*/
				localStorage.setItem("playerkillsArc",spriteArray[0].kills); /* guarda mortes do jogador no browser*/
				window.open("congratz.html"); /* acaba jogo, ecra de congratulacao*/
			}

		}

	}

	animate();



	//-------------------------------------------------------------
	//--- PAUSE MENU
	//-------------------------------------------------------------

	window.addEventListener("keypress",function(event){
		if(event.keyCode === 27){
			modal.style.display = "block";
			paused = 1;
			microOptions(soundBoard);
			sessionStorage.setItem("timestop",1);

		}
	});
	span.addEventListener("click", function() {
			modal.style.display = "none";
			paused = 0;
			console.log(paused);
			animate();
			sessionStorage.setItem("timestop",0);
			Timer();

	});

}
function microOptions(soundboard){


	//-------------------------------------------------------------
	//--- elementos HTML referentes as opções inicais
	//-------------------------------------------------------------

			var myAudio = document.getElementById("aud"); /* elemento audio principal */
			var btnBack = document.getElementById("btnExit"); /* botao de voltar ao menu inicial*/
			var onoff = document.getElementById("som"); /* muted / unmuted button para master volume*/
			var vol = sessionStorage.getItem("muted"); /* slide bar para master volume*/
			var onofffx = document.getElementById("somfx"); /*muted / unmuted button para sound FX */
			var volfx = sessionStorage.getItem("mutedfx"); /* slide bar para sound Fx*/
			var barValue = document.getElementById("myRangeV"); /* elemento HTML que faz display do valor referente à slide bar do volume geral*/
			var bV = document.getElementById("rangeval"); /* valor da slide bar*/
			var barValueF = document.getElementById("myRangeF"); /* elemento HTML que faz display do valor referente à slide bar do volume de efeitos*/
			var bF = document.getElementById("rangevalf"); /* valor da slide bar*/

			bV.innerHTML = barValue.value+"%";
			bF.innerHTML = barValueF.value+"%";

			console.log(vol);

			if(vol === 0){ /*se iniciar a 0 repoe a 1 para controlo de volume*/
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
				/* guarda valores na memoria browser da sessao */
				sessionStorage.setItem("Time",myAudio.currentTime);
				sessionStorage.setItem("Volume",myAudio.volume);
				sessionStorage.setItem("mutedfx",volfx);
				sessionStorage.setItem("muted",vol);
				sessionStorage.setItem("soundBoard",soundboard);
				window.location = "mainMenu.html"; /* retorna à pagina inicial*/
			});

			/*volume geral */
		onoff.addEventListener("click",function() {
			vol *= -1; /* 1 -> unmuted / \ -1 -> muted */
			console.log(vol);
			if(vol === 1){
					onoff.src = "RESOURCES/Soundon.png";
					myAudio.muted = false;
			}else{
					onoff.src = "RESOURCES/SoundOff.png";
					myAudio.muted = true;

			}

		});

		/*volume de efeitos sonoros*/
		onofffx.addEventListener("click",function() {
		 volfx *= -1; /* 1 -> unmuted / \ -1 -> muted */
		 if(volfx === 1){
				onofffx.src = "RESOURCES/Soundon.png";
				soundboard.setMuted(false);

		 }else{
				onofffx.src = "RESOURCES/SoundOff.png";
				soundboard.setMuted(true);
		 }
		 console.log(soundboard.audio.muted);

		});

		/*reposicao do valor da slide bar no elemento html*/
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


} /* opcoes de pausa */

function randomSpawn(enemyArray,iw,ih,ctx,canvas,soundBoard){

	var t = Math.random();  /*decisao do tipo de NPC*/
	if(t > 0.5){
		t = 1; /* shooting soldier*/
	}else {
		t = 0; /* grenade soldier*/
	}
	var x = Math.floor(Math.random() * iw-105)+30;
	var enemy = new Image();
	enemy.src = "RESOURCES/soldierRest1.png";
	var en = new NPC(t,x,floor,145,112,enemy,dx,dy,ctx,canvas,soundBoard); /* criacao de novo NPC*/
	enemyArray.push(en);
}

function firstSpawn(enemyArray,iw,ih,ctx,canvas,soundBoard){

	var x = Math.floor(Math.random() * iw-105)+1;
	var enemy = new Image();
	enemy.src = "RESOURCES/soldierRest1.png";
	var en = new NPC(1,30,floor,145,112,enemy,dx,dy,ctx,canvas,soundBoard);
	enemyArray.push(en);
	x = Math.floor(Math.random() * iw-105)+1;
	enemy = new Image();
	enemy.src = "RESOURCES/soldierRest1.png";
 	en = new NPC(1,30,floor,145,112,enemy,dx,dy,ctx,canvas,soundBoard);
	enemyArray.push(en);
	 x = Math.floor(Math.random() * iw-105)+1;
	 enemy = new Image();
	enemy.src = "RESOURCES/soldierRest1.png";
 	en = new NPC(1,30,floor,145,112,enemy,dx,dy,ctx,canvas,soundBoard);
	enemyArray.push(en);

	return enemyArray;
}

function mapSet(mapHandler,enemyArray,spriteArray,anim,img,iw,ih,ctx,canvas,soundBoard,k){

	if (spriteArray[0].x <= 0) { /* posicao referente aos limites da canvas*/
	 spriteArray[0].x = 0;
	 spriteArray[0].dy = 0;

 }else if (spriteArray[0].x + spriteArray[0].width >=  spriteArray[0].canvas.scrollWidth) {
	 spriteArray[0].x = spriteArray[0].canvas.scrollWidth-spriteArray[0].width;
	 spriteArray[0].dy = 0;
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

function getDataOfImage(img,x,y,w,h){ /* Obtencao da pixel sheet de cada sprite*/
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
			pixels[i]=(rgb[p+3
			]<<24)|(rgb[p]<< 16)|(rgb[p+1]<<8)|rgb[p+2]; /* começa pela opacidade e é o "bit" mais significativo se for 0 tudo resto é 0*/
			i++;
		}
	}
	return pixels;
}

function pixelCollision(s1,s2){ /* detetor de colisao por opacidade do pixel*/

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
	var timeArray = presentTime.split(/[:]+/);
	var stop = sessionStorage.getItem("timestop");

	var m = timeArray[0]; /* minuto*/
	var s = Segundos(parseInt(timeArray[1]) + 1); /* segundos*/
	if(s==59){
		m = parseInt(m)+1;
	}
	document.getElementById('timer').innerHTML =m + ":" + s;
	var t = setTimeout(Timer, 1000);
	if(parseInt(stop) === 1){
		clearTimeout(t);
	}

	return [presentTime,t];
} /* cronometro de jogo*/

function Segundos(sec) { /* controlo de segundos para cronometro*/
	if (sec < 10  && sec >= 0) {
		sec = "0" + sec
	}
  if (sec == 60) {
		sec = "00"
	}
  return sec;
}

function spriteHitCheck(enemyArray,spriteArray,anim,img,iw,ih,ctx,canvas,soundBoard,k){ /* verificacao de colisao de bala da spirte referente ao NPC*/
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
	return [spriteArray,enemyArray]; /*ATUALIZADOS*/


}
