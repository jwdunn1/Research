// See https://www.openprocessing.org/sketch/592054

var posA = [0,0],
		posB = [0,0],
		pidA = [],
		pidB = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	//frameRate(15);
	
	// PID controller pair for the mid-sized ring
	pidA[0] = new PID(0.5,0.005,0.1); // Adjust PID gains here.
	pidA[1] = new PID(0.5,0.005,0.1); // Values p=0.5, i=0.005, d=0.1 work well.
	
	// PID controller pair for the larger ring
	pidB[0] = new PID(0.2,0.001,0.0);
	pidB[1] = new PID(0.2,0.001,0.0);
}

class PID {
	constructor(p,i,d) {
		this.p = p;
		this.i = i;
		this.d = d;
		this.iTerm = 0;
		this.prevDif = 0;
	}
	correction(cur,target){
		var dif = target - cur;
		var	dTerm = (dif - this.prevDif) * this.d;
		this.iTerm += dif * this.i;
		this.prevDif = dif;
		return dif * this.p + this.iTerm + dTerm;
	}
}

function draw() {
	background(0,0,0,100);
	noFill();
	strokeWeight(25);
	stroke(0,0,255,64);
	posB[0] += pidB[0].correction(posB[0],mouseX);
	posB[1] += pidB[1].correction(posB[1],mouseY);
	ellipse(posB[0], posB[1], 160, 160); // largest ring

	stroke(0,0,255,128);
	posA[0] += pidA[0].correction(posA[0],mouseX);
	posA[1] += pidA[1].correction(posA[1],mouseY);
	ellipse(posA[0], posA[1], 120, 120); // midsize ring
	fill(0,0,255,192);
	noStroke();
	ellipse(mouseX, mouseY, 100, 100); // primary circle
}