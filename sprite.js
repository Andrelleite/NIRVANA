const bw = 20;
const bh = 20;

const pistolVel = 30;
const grenadeVel = 15;
const machineVel = 10;
const shotgunVel = 30;

const bullet1 = ["RESOURCES/bullet.png"]
const spriteSheet =["RESOURCES/marcoChar.png","RESOURCES/marcoCharl.png"];
const rested1 = ["RESOURCES/rested1.png","RESOURCES/rested2.png","RESOURCES/rested3.png","RESOURCES/rested2.png"];
const run1 = ["RESOURCES/run1.png","RESOURCES/run2.png","RESOURCES/run3.png"]
const shoot1 = ["RESOURCES/shooting1.png","RESOURCES/shooting1l.png"]
const rested2 = ["RESOURCES/rested1l.png","RESOURCES/rested2l.png","RESOURCES/rested3l.png","RESOURCES/rested2l.png"];
const run2 = ["RESOURCES/run1l.png","RESOURCES/run2l.png","RESOURCES/run3l.png"];
const shoot2 = ["RESOURCES/shooting1.png"];
const marcodie = ["RESOURCES/marcodie1.png","RESOURCES/marcodie2.png","RESOURCES/marcodie3.png","RESOURCES/marcodie4.png","RESOURCES/marcodie5.png","RESOURCES/marcodie6.png"
									,"RESOURCES/marcodie7.png","RESOURCES/marcodie8.png","RESOURCES/marcodie9.png"];
const proneact = ["RESOURCES/prone1.png","RESOURCES/prone2.png","RESOURCES/prone3.png","RESOURCES/prone4.png","RESOURCES/prone5.png"
									,"RESOURCES/prone6.png","RESOURCES/prone7.png","RESOURCES/prone8.png","RESOURCES/prone9.png","RESOURCES/prone10.png"];
const proneact1 = ["RESOURCES/prone1l.png","RESOURCES/prone2l.png","RESOURCES/prone3l.png","RESOURCES/prone4l.png","RESOURCES/prone5l.png"
									,"RESOURCES/prone6l.png","RESOURCES/prone7l.png","RESOURCES/prone8l.png","RESOURCES/prone9l.png","RESOURCES/prone10l.png"];

const pronerest = ["RESOURCES/proneRest1.png","RESOURCES/proneRest2.png","RESOURCES/proneRest3.png","RESOURCES/proneRest4.png","RESOURCES/proneRest5.png","RESOURCES/proneRest6.png"];
const pronerest1 = ["RESOURCES/proneRest1l.png","RESOURCES/proneRest2l.png","RESOURCES/proneRest3l.png","RESOURCES/proneRest4l.png","RESOURCES/proneRest5l.png","RESOURCES/proneRest6l.png"];

class Sprite{

  constructor(x,y,nw,nh,img,speedx,speedy,ctx,canvas,jump){
    this.x = x-nw;
    this.y = y;
		this.shootingw = nw+50;
		this.basew = nw;
		this.crouch = nh/2;
    this.width = nw;
    this.height = nh;
		this.heightJam = nh;
    this.dx = speedx;
		this.dy = speedy;
    this.ctx = ctx;
		this.ny = 450;
		this.canvas = canvas;
		this.jumping = jump;
		this.prone = false;
		this.facinghorizontal = false; //facing right = 0 ; facing left = 1; facing up = 2;
		this.facingup = false;
		this.bulletArray = [];
		this.grenadeArray = [];
		this.shootTimer = 0;
		this.trowTimer = 0;
		this.gunRepeat = pistolVel;
		this.img = img;
		this.sw = 1;
		this.s = 0;
		this.sd = 0;
		this.ps = 0;
		this.grenadeAmmo = 6;
		this.lives = 6;
		this.state = 1;

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

	update(ctx,iw,ih,controller,time){

				if(this.state){

					if(this.facinghorizontal && !controller.space && !controller.up && !controller.right && !controller.left && !controller.shoot && !this.prone){
						this.restleft(time);
					}
					else if(this.facinghorizontal === false && !controller.space && !controller.up && !controller.right && !controller.left && !controller.shoot && !this.prone){
						this.rest(time);
					}

					if (controller.space && this.jumping == false && !this.prone) {

				  	this.dy -= 40;
				  	this.jumping = true;
						if(this.facinghorizontal){
							this.img.src = run2[1];
						}else {
							this.img.src = run1[1];
						}


						if (controller.shoot){
							this.shootanim(time);

							if(this.shootTimer < time){
								this.shootTimer = time + this.gunRepeat;
								if(this.facingup){
									this.shoot(this.ctx,this.x+this.width/2,this.y-this.heightJam/2,0,-20);
								}

								else if(this.facinghorizontal){
									if(this.prone){
										this.shoot(this.ctx,this.x-20,this.y,-20,0);
									}else{
										this.shoot(this.ctx,this.x-20,this.y,-20,0);
									}

								}

								else if(this.facinghorizontal == false){
									if(this.prone){
										this.shoot(this.ctx,this.x+this.width+20,this.y,20,0);
									}else{
										this.shoot(this.ctx,this.x+this.width+20,this.y,20,0);
									}
								}

							}

						}

				  }

				  if (controller.up) {
						this.facingup = true;
						this.prone = false;
				  }
					else{
						this.facingup = false;
					}

					if (controller.left) {
						this.facinghorizontal = true;
				    this.dx -= 4;
						if(!this.prone){
							this.runleft(time);
						}
				  }
					else if (controller.right) {
						this.facinghorizontal = false;
				    this.dx += 4;
						if(!this.prone){
							this.run(time);
						}

				  }

					if(controller.down){
						this.gunRepeat = machineVel;
						if(controller.right && this.facinghorizontal === false){
							this.crawl(time);
							this.dx -= 3;
						}else if(!controller.right && this.facinghorizontal === false){
							this.proneRest(time);
						}else if(!controller.left && this.facinghorizontal){
							this.proneRest1(time);
						}else if(controller.left && this.facinghorizontal){
							this.crawl1(time);
							this.dx += 3;
						}

						this.prone = true;
					}
					else{
						this.prone = false;
						this.gunRepeat = pistolVel;

					}

					if(!controller.shoot){
						this.width = this.basew;
					}

					if (controller.shoot){
						this.shootanim(time);

						if(this.shootTimer < time){
							this.shootTimer = time + this.gunRepeat;
							if(this.facingup){
								this.shoot(this.ctx,this.x+this.width/2,this.y-this.heightJam/2,0,-20);
							}

							else if(this.facinghorizontal){
								if(this.prone){
									this.shoot(this.ctx,this.x-20,this.y+30,-20,0);
								}else{
									this.shoot(this.ctx,this.x-20,this.y+30,-20,0);
								}

							}

							else if(this.facinghorizontal == false){
								if(this.prone){
									this.shoot(this.ctx,this.x+this.width+20,this.y+30,20,0);
								}else{
									this.shoot(this.ctx,this.x+this.width+20,this.y+30,20,0);
								}
							}

						}

					}

					if(controller.trow && this.grenadeAmmo > 0){
						if(this.trowTimer < time){
							this.trowTimer = time + 10;
							if(this.facinghorizontal){
								this.grenadeAmmo--;
								this.trow(this.ctx,this.x+this.height/2-10,this.y+this.height/3,-14,17,0);
							}else{
								this.grenadeAmmo--;
								this.trow(this.ctx,this.x+this.width/2+10,this.y+this.height/3,14,17,1);
							}
						}
					}

					//Movement stance
				  this.dy += 2;
				  this.x += this.dx;
				  this.y += this.dy;
				  this.dx *= 0.2;
				  this.dy *= 0.87;


				  if(this.y + this.height > this.canvas.scrollHeight-this.heightJam) {
						if(this.prone){
							this.jumping = false;
							this.y = this.canvas.scrollHeight-(2*this.height);
							this.dy = 0;
						}
						else{
							this.jumping = false;
							this.y = this.canvas.scrollHeight-(2*this.height);
							this.dy = 0;
						}
				  }

				  if (this.x + this.width < 0) {

				    this.x = this.canvas.scrollWidth;

				  }
					else if (this.x > this.canvas.scrollWidth) {

				    this.x = 0;
					}

				}

				else{
					this.width = 120;
					this.die(time);
				}

				this.draw(ctx);


	}


	shoot(ctx,x,y,dx,dy,frame){
		var bullet;
		var bul = new Image();
		bul.src = bullet1[0];
		bullet = new Bullet(bul,x,y,dx,dy,ctx,this.canvas);
		this.bulletArray.push(bullet);

	}

	trow(ctx,x,y,dx,dy,side){
		var gre;
		var grenade = new Image();
		grenade.src = "RESOURCES/grenade.png";
		gre = new Grenade(x,y,dx,dy,ctx,grenade,this.canvas.scrollHeight-this.heightJam,side)
		this.grenadeArray.push(gre);

	}

	rest(frame){

		var x = frame % 16;
		if(x === 15){
			this.sw++;
			this.img.src = rested1[this.sw % 4];
		}
	}

	restleft(frame){

		var x = frame % 16;
		if(x === 15){
			this.sw++;
			this.img.src = rested2[this.sw % 4];
		}
	}

	run(frame){

		var x = frame % 7;
		if(x === 5){
			this.sw++;
			this.img.src = run1[this.sw % 3];
		}
	}

	runleft(frame){
		var x = frame % 7;
		if(x === 5){
			this.sw++;
			this.img.src = run2[this.sw % 3];
		}
	}

	shootanim(frame){
		var x = frame % 7;
		if(x === 5 && !this.facinghorizontal){
			this.img.src = shoot1[0];
			this.width = this.shootingw;
		}else if( x === 5 && this.facinghorizontal){
			this.img.src = shoot1[1];
			this.width = this.shootingw;
		}
	}

	die(frame){
			var x = frame % 7;
			if(x === 3){
				this.img.src = marcodie[this.sd % 9];
				this.sd++;
			}
	}

	crawl(frame){

		var x = frame % 13;
		if(x === 3){
			this.img.src = proneact[this.sd % 10];
			this.sd++;
		}
	}

	proneRest(frame){
		var x = frame % 13;
		if(x === 3){
			this.img.src = pronerest[this.sd %6];
			this.sd++;
		}
	}

	proneRest1(frame){
		var x = frame % 13;
		if(x === 3){
			this.img.src = pronerest1[this.sd %6];
			this.sd++;
		}
	}

	crawl1(frame){
		var x = frame % 13;
		if(x === 3){
			this.img.src = proneact1[this.sd % 10];
			this.sd++;
		}
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
