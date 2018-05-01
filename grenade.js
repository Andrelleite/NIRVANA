
class Grenade{

	constructor(x,y,dx,dy,ctx,floor){
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = -dy;
		this.ctx = ctx;
		this.floor = floor;
		this.going = true;
	}

	goGrenade(){
		this.ctx.beginPath();
		this.ctx.arc(this.x,this.y,10,0,Math.PI*2);
		this.ctx.stroke();
		this.ctx.fillStyle = "red";
		this.ctx.fill();
	}

	update(){


		this.x += this.dx;
		this.y += this.dy;

		if(this.y+10+this.dy >= this.floor){
			this.dy = -this.dy * 0.4;
		}else{
			this.dy++;
		}
		this.dx = this.dx*0.97;


		this.goGrenade();

	}


}
