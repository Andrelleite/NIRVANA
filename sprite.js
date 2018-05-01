const pistolVel = 30;
const grenadeVel = 15;
const machineVel = 10;
const shotgunVel = 30;
const spriteSheet =["RESOURCES/marcoChar.png","RESOURCES/marcoCharl.png"];
const rested1 = ["RESOURCES/rested1.png","RESOURCES/rested2.png","RESOURCES/rested3.png","RESOURCES/rested2.png"];
const run1 = ["RESOURCES/run1.png","RESOURCES/run2.png","RESOURCES/run3.png","RESOURCES/run4.png"]
const shoot1 = ["RESOURCES/shoot1.png","RESOURCES/shoot2.png","RESOURCES/shoot3.png"]
const rested2 = ["RESOURCES/rested1.png","RESOURCES/rested2.png","RESOURCES/rested3.png","RESOURCES/rested2.png"];
const run2 = ["RESOURCES/run1.png","RESOURCES/run2.png","RESOURCES/run3.png","RESOURCES/run4.png"]
const shoot2 = ["RESOURCES/shoot1.png","RESOURCES/shoot2.png","RESOURCES/shoot3.png"]

class Sprite{

  constructor(x,y,nw,nh,img,speedx,speedy,ctx,canvas,jump){
    this.x = x-nw;
    this.y = y;
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
  }

  draw(ctx){
		ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
  }

	clear(ctx,iw,ih){
		ctx.clearRect(0,0,iw,ih);
	}

	update(ctx,iw,ih,controller,time){

				if(this.facinghorizontal && !controller.space && !controller.up && !controller.right && !controller.left && !controller.shoot){
					this.rest(time);
				}
				else if(this.facinghorizontal === false && !controller.space && !controller.up && !controller.right && !controller.left && !controller.shoot){
					this.rest(time);
				}

				if (controller.space && this.jumping == false && this.prone != true) {

			  	this.dy -= 40;

			  	this.jumping = true;

			  }

			  if (controller.left) {
					this.facinghorizontal = true;
			    this.dx -= 4;
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
				}else{
					this.gunRepeat = pistolVel;
					this.height = this.crouch;
					this.prone = false;
					this.height = 2*this.crouch;
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
								this.shoot(this.ctx,this.x-20,this.y+this.height/2,-20,0);
							}else{
								this.shoot(this.ctx,this.x-20,this.y+this.height/2,-20,0);
							}

						}

						else if(this.facinghorizontal == false){
							if(this.prone){
								this.shoot(this.ctx,this.x+this.width+20,this.y+this.height/2,20,0);
							}else{
								this.shoot(this.ctx,this.x+this.width+20,this.y+this.height/2,20,0);
							}
						}

					}

				}

				if(controller.trow){
					if(this.trowTimer < time){
						this.trowTimer = time + 10;
						console.log(this.shootTimer);
						if(this.facinghorizontal){
							this.trow(this.ctx,this.x+this.height/2-10,this.y+this.height/3,-14,17);
						}else{
							this.trow(this.ctx,this.x+this.width/2+10,this.y+this.height/3,14,17);
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
		var bul;
		bul = new Bullet(x,y,dx,dy,ctx,this.canvas);
		this.bulletArray.push(bul);


	}

	trow(ctx,x,y,dx,dy){
		var gre;
		gre = new Grenade(x,y,dx,dy,ctx,this.canvas.scrollHeight-this.heightJam);
		this.grenadeArray.push(gre);

	}

	rest(frame){

		var x = frame % 16;
		if(x === 15){
			this.sw++;
			this.img.src = rested1[this.sw % 4];
		}
	}

	run(frame){

		var x = frame % 7;
		if(x === 5){
			this.sw++;
			this.img.src = run1[this.sw % 4];
		}
	}

	shootanim(frame){
		var x = frame % 7;
		if(x === 5){
			this.s++;
			this.img.src = shoot1[this.s % 3];
			console.log(this.s % 3);
		}
	}


}
