"use strict";


(function()
{
	window.addEventListener("load", main);
}());


function main(){

  var canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d');
  var base_image;
  make_base();

  function make_base(){
    base_image = new Image();
    base_image.src = 'icon.png';
    base_image.onload = function(){
      context.drawImage(base_image, 0, 0, 45,45);
    }
  }

}
