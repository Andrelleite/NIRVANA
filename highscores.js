"use strict";


(function()
{
	window.addEventListener("load", main);
	opener.close();

}());

function main()
{

	var backbtn = document.getElementById("back");
	var myAudio= document.getElementById("aud");

	var playerTime = localStorage.getItem("players1"); /* tempo de jogabilidade do jogador no tipo story*/
	var playerPoints = localStorage.getItem("players1kills"); /* pontos adquiridos do jogador no tipo arcade*/
	var playerTimeArc = localStorage.getItem("players1Arc"); /* tempo de jogabilidade no tipo arcade*/
	var playerPointsArc = localStorage.getItem("playerkillsArc"); /* pontos do jogador no tipo arcade*/

	var pointsS = document.getElementsByClassName("points")[0]; /* elemento HTML para colocar score story*/
	var pointsSArc = document.getElementsByClassName("pointsa")[0]; /* elemento HTML para colocar score arcade*/

	pointsS.innerHTML = "1"+"    Story   "+"           "+String(playerTime)+"         "+String(playerPoints); /* AMOSTRAGEM EM HTML */
	pointsSArc.innerHTML = "1"+"    Arcade      "+"         "+String(playerTimeArc)+"        "+String(playerPointsArc);

	backbtn.addEventListener("click",function(){
		sessionStorage.setItem("Time",myAudio.currentTime);
			window.open("mainMenu.html");
			console.log(popup);
			console.log("sending...")
	});


}
