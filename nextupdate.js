"use strict";


(function()
{
    window.addEventListener("load", main);
		opener.close();

}());

function main() {

    var btnExit = document.getElementById("exit");

		btnExit.addEventListener("click",function(){
			window.open("mainMenu.html");
		});


}
