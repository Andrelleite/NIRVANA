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
		this.height = h;
		this.width = w;
		var newCan = document.createElement("canvas");
		this.newCtx = newCan.getContext("2d");
		this.newCtx.drawImage(this.img, 0,0,this.width,this.height);
		this.imgData =this.newCtx.getImageData(0,0,this.width,this.height).data;

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
