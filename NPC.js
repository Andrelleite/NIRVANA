
const enemyrested1= ["RESOURCES/soldierRest1.png","RESOURCES/soldierRest2.png","RESOURCES/soldierRest3.png","RESOURCES/soldierRest2.png"];
const enemyrested = ["RESOURCES/soldierRest1l.png","RESOURCES/soldierRest2l.png","RESOURCES/soldierRest3l.png","RESOURCES/soldierRest2l.png"];
const shootenemy = ["RESOURCES/soldiershoot1.png","RESOURCES/soldiershoot2.png","RESOURCES/soldiershoot3.png","RESOURCES/soldiershoot4.png"
										,"RESOURCES/soldiershoot5.png","RESOURCES/soldiershoot6.png","RESOURCES/soldiershoot8.png","RESOURCES/soldiershoot9.png"];


class NPC{


	constructor(x,y,nw,nh,img,speedx,speedy,ctx,canvas){

		this.x = x;
		this.y = y;
		this.width = nw;
		this.height = nh;
		this.heightJam = nh;
		this.img = img;
		this.dx = speedx;
		this.dy = speedy;
		this.ctx = ctx;
		this.canvas = canvas;
		this.sw = 1;
		this.sh = 0;
		this.side = 2;
		this.bullets = [];
	}

	draw(ctx){
		ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
	}

	clear(ctx,iw,ih){
		ctx.clearRect(0,0,iw,ih);
	}

	update(anim){

		var x = Math.random();

		this.draw(this.ctx);


		if(this.side === 0){
			this.width = 145;
			this.rest(anim);
		}else if(this.side === 1){
			this.width = 145;
			this.rest1(anim);
		}

		this.dy += 2;
		this.y += this.dy;
		this.dy *= 0.87;

		if(this.y + this.height > this.canvas.scrollHeight-this.heightJam) {
				this.y = this.canvas.scrollHeight-(2*this.height);
				this.dy = 0;
		}

		if (this.x + this.width < 0) {
			this.x = this.canvas.scrollWidth;
		}
		else if (this.x > this.canvas.scrollWidth) {
			this.x = 0;
		}

	}

	rest(frame){
		var x = frame % 16;
		if(x === 15){
			this.sw++;
			this.img.src = enemyrested[this.sw % 4];
		}
	}

	rest1(frame){
		var x = frame % 16;
		if(x === 15){
			this.sw++;
			this.img.src = enemyrested1[this.sw % 4];
		}
	}

	setSide(side){
		this.side = side;
	}

	shoot(frame){
		var x = frame % 10;
		if(x === 3){
			this.sh++;
			this.img.src = shootenemy[this.sh % 8];
		}
	}


}
