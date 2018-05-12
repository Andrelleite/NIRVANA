const w = 20;
const h = 20;

const popup1 = ["RESOURCES/rested1.png","RESOURCES/rested2.png","RESOURCES/rested3.png","RESOURCES/rested2.png"];

class Bullet{

	constructor(img,x,y,dx,dy,ctx,canvas){
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.ctx = ctx;
		this.img = img;
		this.time = 0;
	}

	goBullet(ctx){
		ctx.drawImage(this.img,this.x,this.y,w,h);
	}

	update(){

		this.x += this.dx*0.7;
		this.y += this.dy*0.8;

		this.goBullet(this.ctx);
	}

	stop(time){

		this.x += this.dx*0;
		this.goBullet(this.ctx);

	}


}
