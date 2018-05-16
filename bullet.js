
const popup1 = ["RESOURCES/blood1.png","RESOURCES/blood2.png","RESOURCES/blood3.png","RESOURCES/blood4.png"];
const ballAct = ["RESOURCES/ball1.png","RESOURCES/ball2.png","RESOURCES/ball3.png","RESOURCES/ball4.png"]


class Bullet{

	constructor(img,x,y,dx,dy,ctx,canvas,h,w,hj,type){
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.ctx = ctx;
		this.canvas = canvas;
		this.img = img;
		this.heightJam = hj;
		this.time = 0;
		this.height = h;
		this.width = w;
		this.hy = this.y -35;
		this.pop  = 0;
		this.p = 0;
		this.st = 0;
		this.type = type;

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
			this.x += 0;
			this.y = this.hy;
			this.width = this.height = 70;
			this.hit(time);

		}

		if(this.y + this.height > this.canvas.scrollHeight-this.heightJam) {
				this.y = this.canvas.scrollHeight-(4*this.height)-8;
				this.dy = 0;
		}

		if(this.type === 0){
			this.rollBall(time);
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


	rollBall(frame){
		var x = frame % 6;
		if(x === 1){
			this.img.src = ballAct[this.st % 4];
			this.st++;
		}
	}


}
