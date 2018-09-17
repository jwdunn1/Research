// See live demos here:
// http://jsfiddle.net/intrinsica/nbhaxg7k
// https://www.openprocessing.org/sketch/589610 

// A web worker is defined inline. It receives mouseXY 
// updates, and computes a damped trajectory toward the mouse.
// It posts results at 30fps.
var work = "var data = [100,100,100,100]; \
onmessage = function(e) { \
  data[0] = data[0]*0.9 + e.data[0]*0.1; \
  data[1] = data[1]*0.9 + e.data[1]*0.1; \
  data[2] = data[2]*0.95 + e.data[0]*0.05; \
  data[3] = data[3]*0.95 + e.data[1]*0.05; }; \
function draw() {postMessage(data);} \
setInterval(draw, 1000/30); /* draw at 30fps */";

var myWorker, posA = [0,0], posB = [0,0],
		awake=0; // <-- serves as a heartbeat

function setup() {
	createCanvas(windowWidth, windowHeight);

	// define an inline worker and launch it
	var blob = new Blob([work]);
  myWorker = new Worker(window.URL.createObjectURL(blob));
	
	// handle messages from the worker
	myWorker.onmessage = function(e) {
    posA = [e.data[0], e.data[1]];
		posB = [e.data[2], e.data[3]];
		if (awake) backdraw(); // conditional draw
  };
	frameRate(1); // <-- heart beat: 1fps
}

// when main process is minimized, no drawing necessary
function draw() {
  awake++;
	setTimeout(function(){awake--;}, 1000); // <-- needs to be >= frame rate
}

// background draw; driven by worker message callback at 30fps
function backdraw() {
	background(0,0,0,100);
	noFill();
	strokeWeight(25);
	stroke(0,0,255,64);
	ellipse(posB[0], posB[1], 160, 160); // largest ring
	stroke(0,0,255,128);
	ellipse(posA[0], posA[1], 120, 120); // midsize ring
	fill(0,0,255,192);
	noStroke();
	ellipse(mouseX, mouseY, 100, 100); // primary circle
	// send the current mouse coordinates to the web worker
  myWorker.postMessage([mouseX,mouseY]);
}
