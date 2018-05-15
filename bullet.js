const w = 20;
const h = 20;

const popup1 = ["RESOURCES/blood1.png","RESOURCES/blood2.png","RESOURCES/blood3.png","RESOURCES/blood4.png"];

class Bullet{

	constructor(img,x,y,dx,dy,ctx,canvas){
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.ctx = ctx;
		this.img = img;
		this.time = 0;
		this.height = h;
		this.width = w;
		this.hy = this.y -35;
		this.pop  = 0;
		this.p = 0;
		var newCan = document.createElement("canvas");
		this.newCtx = newCan.getContext("2d");
		this.newCtx.drawImage(this.img, 0,0,this.width,this.height);
		this.imgData =this.newCtx.getImageData(0,0,this.width,this.height).data;

	}

	goBullet(ctx){
		ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
	}

	update(time){

		if(this.pop != 1){
			this.x += this.dx*0.7;
			this.y += this.dy*0.8;
		}else{
			this.y = this.hy;
			this.width = this.height = 70;
			this.x += 0;
			this.hit(time);
		}


		this.goBullet(this.ctx);
	}


	intersection(r)
	{
			var x,y,w,h;
			x = Math.max(this.x,r.x);
			y = Math.max(this.y,r.y);
			w = Math.min(this.x+this.width,r.width+r.height)-x;
			h = Math.min(this.y+this.height,r.y+r.height)-y;
			return [x,y,w,h];
	}

	hit(frame){
		var x = frame % 2;
		if(x === 1){
			this.img.src = popup1[this.p % 4];
			this.p++;
		}
	}


}
