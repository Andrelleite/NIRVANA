const enemyGrested= ["RESOURCES/Sodliergrest1.png","RESOURCES/Sodliergrest2.png","RESOURCES/Sodliergrest3.png","RESOURCES/Sodliergrest4.png","RESOURCES/Sodliergrest3.png","RESOURCES/Sodliergrest2.png"];
const enemyGrested1= ["RESOURCES/Sodliergrest1l.png","RESOURCES/Sodliergrest2l.png","RESOURCES/Sodliergrest3l.png","RESOURCES/Sodliergrest4l.png","RESOURCES/Sodliergrest3l.png","RESOURCES/Sodliergrest2l.png"];

const enemyRoll = ["RESOURCES/roll1.png","RESOURCES/roll2.png","RESOURCES/roll3.png","RESOURCES/roll4.png","RESOURCES/roll5.png","RESOURCES/roll6.png"
										,"RESOURCES/roll7.png","RESOURCES/roll8.png","RESOURCES/roll9.png","RESOURCES/roll10.png"];
										const enemyRoll1 = ["RESOURCES/roll1l.png","RESOURCES/roll2l.png","RESOURCES/roll3l.png","RESOURCES/roll4l.png","RESOURCES/roll5l.png","RESOURCES/roll6l.png"
																			,"RESOURCES/roll7l.png","RESOURCES/roll8l.png","RESOURCES/roll9l.png","RESOURCES/roll10l.png"];
const enemyrested1= ["RESOURCES/soldierRest1.png","RESOURCES/soldierRest2.png","RESOURCES/soldierRest3.png","RESOURCES/soldierRest2.png"];
const enemyrested = ["RESOURCES/soldierRest1l.png","RESOURCES/soldierRest2l.png","RESOURCES/soldierRest3l.png","RESOURCES/soldierRest2l.png"];
const shootenemy = ["RESOURCES/soldiershoot1.png","RESOURCES/soldiershoot2.png","RESOURCES/soldiershoot3.png","RESOURCES/soldiershoot4.png"
										,"RESOURCES/soldiershoot5.png","RESOURCES/soldiershoot6.png","RESOURCES/soldiershoot8.png","RESOURCES/soldiershoot9.png"];
const shootenemy1 = ["RESOURCES/soldiershoot1l.png","RESOURCES/soldiershoot2l.png","RESOURCES/soldiershoot3l.png","RESOURCES/soldiershoot4l.png"
									,"RESOURCES/soldiershoot5l.png","RESOURCES/soldiershoot6l.png","RESOURCES/soldiershoot8l.png","RESOURCES/soldiershoot9l.png"];
const die= ["RESOURCES/soldierdie1.png","RESOURCES/soldierdie2.png","RESOURCES/soldierdie3.png","RESOURCES/soldierdie4.png","RESOURCES/soldierdie4.png"];
const die1= ["RESOURCES/soldierdie1l.png","RESOURCES/soldierdie2l.png","RESOURCES/soldierdie3l.png","RESOURCES/soldierdie4l.png","RESOURCES/soldierdie4l.png"];
const bullet2 = ["RESOURCES/bullet.png","RESOURCES/ball1.png"];



class NPC{


	constructor(tipo,x,y,nw,nh,img,speedx,speedy,ctx,canvas,soundBoard){

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
		this.sw = 0;
		this.sh = 0;
		this.sd = 0;
		this.rb = 1;
		this.side = 2;
		this.bullets = [];
		this.tipo = tipo;
		this.audio = soundBoard;

		var newCan = document.createElement("canvas");
		this.newCtx = newCan.getContext("2d");
		this.newCtx.drawImage(this.img, 0,0,this.width,this.height);
		this.imgData =this.newCtx.getImageData(0,0,this.width,this.height).data;
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
		}else if(this.side === 2){
			this.width = 188;
			this.shoot(anim);
		}else if(this.side === 3){
			this.width = 188;
			this.shoot1(anim);
		}else if(this.side === 4){
			this.width = 145;
			this.actiondie(anim);
		}else if(this.side === 5){
			this.width = 145;
			this.actiondie1(anim);
		}


		this.dy += 2;
		this.y += this.dy;
		this.dy *= 0.95;

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
		var x = frame % 13;
		if(this.tipo === 1){
			if(x === 5){
				this.sw++;
				this.img.src = enemyrested[this.sw % 4];
			}
		}else{
			if(x === 5){
				this.sw++;
				this.img.src = enemyGrested[this.sw % 6];
			}
		}

	}

	rest1(frame){
		var x = frame % 13;
		if(this.tipo === 1){
			if(x === 5){
				this.sw++;
				this.img.src = enemyrested1[this.sw % 4];
			}
		}else{
			if(x === 5){
				this.sw++;
				this.img.src = enemyGrested1[this.sw % 6];
			}
		}
	}

	setSide(side){
		this.side = side;
	}

	shoot(frame){
		if(this.tipo === 1){
			var x = frame % 10;

			if(x === 3){
				this.sh++;
				this.img.src = shootenemy[this.sh % 8];
				if(this.sh % 8 === 2){
					this.goBullet(this.ctx,this.x,this.y+12,-20,0,30,20,1);
					this.audio.SoldierShoot();
				}
			}
		}else{
			var x = frame % 10;
			this.width = 147;
			if(x === 3){
				this.rb++;
				this.img.src = enemyRoll[this.rb % 10];
				if(this.rb % 10 === 8){
					this.goBullet(this.ctx,this.x+this.width/2,this.y+this.height/2,-2,2,35,35,0);

				}
			}
		}

	}

	shoot1(frame){
		if(this.tipo === 1){
			var x = frame % 10;
			if(x === 3){
				this.sh++;
				this.img.src = shootenemy1[this.sh % 8];
				if(this.sh % 8 === 1){
					this.goBullet(this.ctx,this.x+this.width,this.y+12,20,0,30,20,1);
					this.audio.SoldierShoot();

				}
			}
		}else{
			var x = frame % 10;
			this.width = 147;
			if(x === 3){
				this.rb++;
				this.img.src = enemyRoll1[this.rb % 10];
				if(this.rb % 10 === 8){
					this.goBullet(this.ctx,this.x+this.width/2,this.y+this.height/2,2,2,35,35,0);
				}
			}
		}

	}

	actiondie(frame){
		var x = frame % 12;
		if(x === 3){
			this.img.src = die[this.sd % 5];
			this.sd++;

		}
	}

	actiondie1(frame){
		var x = frame % 12;
		if(x === 3){
			this.img.src = die1[this.sd % 5];
			this.sd++;

		}
	}

	goBullet(ctx,x,y,dx,dy,w,h,tp){
		var bullet;
		var bul = new Image();
		if(w != 30){
			bul.src = bullet2[1];
		}else{
			bul.src = bullet2[0];
		}
		bullet = new Bullet(bul,x,y,dx,dy,ctx,this.canvas,h,w,this.heightJam,tp);
		this.bullets.push(bullet);
	}

	intersection(r){
			var x,y,w,h;
			x = Math.max(this.x,r.x);
			y = Math.max(this.y,r.y);
			w = Math.min(this.x+this.width,r.width+r.height)-x;
			h = Math.min(this.y+this.height,r.y+r.height)-y;
			return [x,y,w,h];
	}


}
