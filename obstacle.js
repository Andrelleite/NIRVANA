const w = 100;
const h = 90;


//----------------------------------------------------------------------------------------
//--- NO EFFECT. ON WORKING PROGRES
//----------------------------------------------------------------------------------------

class Obstacle{



	constructor(x,y,ctx,canvas,img){
			this.img = img;
			this.x = x;
			this.y = y;
			this.width = w;
			this.height = h;
			this.ctx = ctx;
			this.canvas = canvas;
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

	update(){
		this.draw(ctx);
	}

}


intersection(r){
		var x,y,w,h;
		x = Math.max(this.x,r.x);
		y = Math.max(this.y,r.y);
		w = Math.min(this.x+this.width,r.width+r.height)-x;
		h = Math.min(this.y+this.height,r.y+r.height)-y;
		return [x,y,w,h];
}
