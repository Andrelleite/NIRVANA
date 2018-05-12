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
const run2 = ["RESOURCES/run1l.png","RESOURCES/run2l.png","RESOURCES/run3l.png"]
const shoot2 = ["RESOURCES/shooting1.png"]

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
		this.grenadeAmmo = 6;
  }

  draw(ctx){
		ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
  }

	clear(ctx,iw,ih){
		ctx.clearRect(0,0,iw,ih);
	}

	update(ctx,iw,ih,controller,time){

				if(this.facinghorizontal && !controller.space && !controller.up && !controller.right && !controller.left && !controller.shoot){
					this.restleft(time);
				}
				else if(this.facinghorizontal === false && !controller.space && !controller.up && !controller.right && !controller.left && !controller.shoot){
					this.rest(time);
				}

				if (controller.space && this.jumping == false && this.prone != true) {

			  	this.dy -= 40;
			  	this.jumping = true;
					this.img.src = run1[1];

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

			  if (controller.left) {
					this.facinghorizontal = true;
			    this.dx -= 4;
					this.runleft(time);
					if(this.prone){
						this.dx += 3;
					}
			  }

			  if (controller.up) {
					this.facingup = true;
					this.prone = false;
			  }
				else{
					this.facingup = false;
				}

				if (controller.right) {
					this.facinghorizontal = false;
			    this.dx += 4;
					this.run(time);
					if(this.prone){
						this.dx -= 3;
					}
			  }

				if(controller.down){
					this.gunRepeat = machineVel;
					this.height = this.crouch;
					this.prone = true;
					this.facingup = false;
				}
				else{
					this.gunRepeat = pistolVel;
					this.height = this.crouch;
					this.prone = false;
					this.height = 2*this.crouch;
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
						console.log(this.shootTimer);
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
						this.y = this.canvas.scrollHeight-(3*this.height);
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


}
