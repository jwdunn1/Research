https://www.openprocessing.org/sketch/581313
// Underwater noise thing
var zoom = 500, s = 10, k = 0;
function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(1);
	noStroke();
}
function draw() {
	background(0);
	for(var i = 0; i < width; i += s)
		for(var j = 0; j < height; j += s) {
			fill(0, 0, noise((i+j*0.5)/zoom, j/(zoom*3), k/100)*512-180)
			rect(i,j, s,s);
		}
	k++;
}
