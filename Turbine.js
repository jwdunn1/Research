// See https://www.openprocessing.org/sketch/592194
var m=0;
function setup() {
	createCanvas(windowWidth, windowHeight);
	strokeCap(SQUARE);
  noFill();
	ellipseMode(CENTER);
}

function draw() {
	background(238);
	translate(width/2,height/2);
	rotate(m/4*PI/180);
  stroke(0);
	for (var i=0; i<60; i++) {
		push();
			rotate(6*i*PI/180);
			translate(-170,170);
			strokeWeight(12);
			arc(0,0, 400-7,400-7, HALF_PI/4, HALF_PI/2);
			strokeWeight(7);
			arc(0,0, 400+5,400+5, 0, HALF_PI/2);
    pop();
	}
	m--;
	stroke(238);
	strokeWeight(12);
	ellipse(0,0, 356,356);
	ellipse(0,0, 622,622);
}