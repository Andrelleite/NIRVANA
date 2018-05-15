
const height = 30;
const width = 30;
const expHeight = 160;
const expWidht = 75;
const explodeSprite = ["RESOURCES/exp1.png","RESOURCES/exp2.png","RESOURCES/exp3.png","RESOURCES/exp4.png","RESOURCES/exp5.png","RESOURCES/exp6.png"
												,"RESOURCES/exp7.png","RESOURCES/exp8.png","RESOURCES/exp9.png","RESOURCES/exp10.png","RESOURCES/exp11.png","RESOURCES/exp12.png"
											,"RESOURCES/exp13.png","RESOURCES/exp14.png","RESOURCES/exp15.png"];
class Grenade{

	constructor(x,y,dx,dy,ctx,img,floor,side){
		this.x = x;
		this.y = y-width;
		this.dx = dx;
		this.dy = -dy;
		this.ctx = ctx;
		this.floor = floor;
		this.going = true;
		this.img = img;
		this.width = width;
		this.height = width;
		this.nx = this.x;
		this.ny = this.y-105;
		this.state = 0;
		this.side = side; /*0 -> left | 1 -> right*/

	}

	goGrenade(){
		this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
	}


	update(time){


		if(this.side === 1 && this.dx <= 0.75){
			this.y = this.ny;
			this.width = 95;
			this.height = 210;
			this.explode(time);
		}
		else if(this.side === 0 && this.dx >= -0.75){
			this.y = this.ny;
			this.width = 95;
			this.height = 210;
			this.explode(time);
		}
		else{

			this.x += this.dx;
			this.y += this.dy;

			if(Math.floor(this.y+this.dy) >= this.floor-width){
				this.dy = -this.dy * 0.4;
			}else{
				this.dy++;
			}
			this.dx = this.dx*0.97;
		}

		this.goGrenade();


	}

	explode(frame){

		var x = frame % 2;
		if(x === 1){
			this.img.src = explodeSprite[this.state % 15];
			this.state++;
			console.log(this.state);
		}else if(this.state === 0){
			this.img.src = explodeSprite[this.state];
		}

	}





}
