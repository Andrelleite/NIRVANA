
const sb = ["Sounds/all_00057.wav","Sounds/scream2.mp3","Sounds/all_00072.wav","ui.mp3"];


class Sound{

	constructor(){
		this.soundboard = sb;
		this.volume = sessionStorage.getItem("Volumefx");
		this.audio = new Audio();
		this.audio.volume = this.volume;
		this.audio.muted = false;

	}


	SoldierScream(){
		this.audio.src = sb[3];
		this.audio.play();
	}

	SpriteWalk(){
		this.audio.src = sb[2];
		this.audio.play();
	}

	SoldierShoot(){
		this.audio.src = sb[0];
		this.audio.play();
	}

	HitMark(){
		this.audio.src = sb[1];
		this.audio.play();
	}

	setVolume(v){
		this.audio.volume = v;
	}

	setMuted(m){
		this.audio.muted = m;
	}

}
