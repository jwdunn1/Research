function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(100);
  hexagon(400,100, 200);
}

// version 4
// better performance. See https://jsperf.com/hexagon
function hexagon(x,y, r) {
  push();
  translate(x,y);
  beginShape();
  vertex(r,0);
  vertex(r*0.5,r*0.8660254);
  vertex(-r*0.5,r*0.8660254);
  vertex(-r,0);
  vertex(-r*0.5,-r*0.8660254);
  vertex(r*0.5,-r*0.8660254);
  endShape(CLOSE);
  pop();
}




/* version 2
function hexagon(x,y, s) {
  var a=0, i=PI/3;

  beginShape();
  vertex(x,y);
  for(a=i; a<TWO_PI-i; a+=i) {
    x += s*cos(a);
    y += s*sin(a);
    vertex(x,y);
  }
  endShape(CLOSE);
}
*/

// version 3
function generate(x,y, r,n) { // n>1
  var a=0, i=TWO_PI/n, j=0;
  push();
  translate(x,y);
  beginShape();
  while(j<n) {
    vertex(r*cos(a),r*sin(a));
    a+=i,j++;
  }
  endShape(CLOSE);
  pop();
}



/* version 1
function hexagon(x,y, s) {
  var a=0, i=5;

  beginShape();
  vertex(x,y);
  while(i) {
    a += PI/3;
    x += s*cos(a);
    y += s*sin(a);
    vertex(x,y);
    i--;
  }
  endShape(CLOSE);
}
*/