class Bullet{

	constructor(x,y,dx,dy,ctx,canvas){
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.ctx = ctx;
	}

	goBullet(){
		this.ctx.beginPath();
		this.ctx.arc(this.x,this.y,10,0,Math.PI*2);
		this.ctx.stroke();
		this.ctx.fillStyle = "white";
		this.ctx.fill();
	}

	update(){

		this.x += this.dx*0.7;
		this.y += this.dy*0.8;

		this.goBullet();
	}

}
