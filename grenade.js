
const height = 30;
const width = 30;
const expHeight = 160;
const expWidht = 75;
const zero = 0;
const gapy = 105;
const frictionX = 0.2;
const finctionA = 0.98;
const frictionY = 0.5;


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
		this.ny = this.y-gapy;
		this.state = zero;
		this.side = side; /*0 -> left | 1 -> right*/
		this.canKill = zero;
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

			this.x += this.dx*frictionX;
			this.y += this.dy*frictionX;

			if(Math.floor(this.y+this.dy) >= this.floor-width){
				this.dy = -this.dy * frictionY;
			}else{
				this.dy++;
			}
			this.dx = this.dx*finctionA;
		}

		this.goGrenade();


	}

	explode(frame){

		var x = frame % 4;
		if(x === 1){
			this.img.src = explodeSprite[this.state % 15];
			this.state++;
		}else if(this.state === 0){
			this.img.src = explodeSprite[this.state];
		}
		if(this.state % 15 == 7){ /* 7 -> MID ARRAY Animate*/
			this.canKill = 1;
		}

	}





}
