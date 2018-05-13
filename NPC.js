
const enemyrested1= ["RESOURCES/soldierRest1.png","RESOURCES/soldierRest2.png","RESOURCES/soldierRest3.png","RESOURCES/soldierRest2.png"];
const enemyrested = ["RESOURCES/soldierRest1l.png","RESOURCES/soldierRest2l.png","RESOURCES/soldierRest3l.png","RESOURCES/soldierRest2l.png"];
const shootenemy = ["RESOURCES/soldiershoot1.png","RESOURCES/soldiershoot2.png","RESOURCES/soldiershoot3.png","RESOURCES/soldiershoot4.png"
										,"RESOURCES/soldiershoot5.png","RESOURCES/soldiershoot6.png","RESOURCES/soldiershoot8.png","RESOURCES/soldiershoot9.png"];
const shootenemy1 = ["RESOURCES/soldiershoot1l.png","RESOURCES/soldiershoot2l.png","RESOURCES/soldiershoot3l.png","RESOURCES/soldiershoot4l.png"
									,"RESOURCES/soldiershoot5l.png","RESOURCES/soldiershoot6l.png","RESOURCES/soldiershoot8l.png","RESOURCES/soldiershoot9l.png"];
const die= ["RESOURCES/soldierdie1.png","RESOURCES/soldierdie2.png","RESOURCES/soldierdie3.png","RESOURCES/soldierdie4.png","RESOURCES/soldierdie4.png"];
const die1= ["RESOURCES/soldierdie1l.png","RESOURCES/soldierdie2l.png","RESOURCES/soldierdie3l.png","RESOURCES/soldierdie4l.png","RESOURCES/soldierdie4l.png"];
const bullet2 = ["RESOURCES/bullet.png"];

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
		this.sw = 0;
		this.sh = 0;
		this.sd = 0;
		this.side = 2;
		this.bullets = [];

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
			if(this.sh % 8 === 2){
				this.goBullet(this.ctx,this.x,this.y+12,-20,0);
			}
		}
	}

	shoot1(frame){
		var x = frame % 10;
		if(x === 3){
			this.sh++;
			this.img.src = shootenemy1[this.sh % 8];
			if(this.sh % 8 === 2){
				this.goBullet(this.ctx,this.x+this.width,this.y+12,20,0);
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

	goBullet(ctx,x,y,dx,dy,frame){
		var bullet;
		var bul = new Image();
		bul.src = bullet2[0];
		bullet = new Bullet(bul,x,y,dx,dy,ctx,this.canvas);
		this.bullets.push(bullet);
	}


	colisao_sprite(turbo,ctx){

		if(this.x<turbo.x && this.x+this.width>turbo.x && this.y<turbo.y && this.y+this.height>turbo.y){
			var comprimento=Math.round(Math.min(turbo.width,this.x+this.width-turbo.x));
			var altura=Math.round(Math.min(turbo.height, this.y+this.height-turbo.y));

			var xxcarro=Math.round(turbo.x-this.x);
			var yycarro=Math.round(turbo.y-this.y);

			var xx;
			var yy;

			if(comprimento && altura){
				for( xx=0; xx<comprimento; xx++){
					for( yy=0; yy<comprimento; yy++){
						if( turbo.imgData[yy*turbo.width*4 + xx*4 + 3] && this.imgData[(yycarro+yy)*this.width*4  + (xxcarro+xx)*4 + 3] )
							return true;
					}
				}
			}

		}
		if(this.x<turbo.x && this.x+this.width>turbo.x && this.y<turbo.y+turbo.height && this.y+this.height>turbo.y+turbo.height){
			var comprimento=Math.round(Math.min(turbo.width,this.x+this.width-turbo.x));
			var altura=Math.round(Math.min(turbo.height, turbo.y+turbo.height-this.y ));

			var xxcarro=Math.round(turbo.x-this.x);
			var yycarro=Math.round(turbo.y+turbo.height-this.y);

			var xxturbo=Math.round(turbo.x);
			var yyturbo=Math.round(turbo.y+turbo.height-altura);

			var xx;
			var yy;

			if(comprimento && altura){
				for( xx=0; xx<comprimento; xx++){
					for( yy=0; yy<comprimento; yy++){
						if( turbo.imgData[(yyturbo+yy)*turbo.width*4 + (xxturbo+xx)*4 + 3] && this.imgData[(yycarro+yy)*this.width*4  + (xxcarro+xx)*4 + 3] ){
							return true;
						}

					}
				}
			}

		}

		return false;
	}

	colisao(turbo){
		if( !(this.x > turbo.x + turbo.width) &&
			!(this.x+this.width < turbo.x)  &&
			!(this.y > turbo.y + turbo.height) &&
			!(this.y + this.height < turbo.y  )
		)
			return true;
		return false;

	}


}
