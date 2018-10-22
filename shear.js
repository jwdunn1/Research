// Study of the shearing transform
// (x,y) -> (x+y, y-x)
// forming a mnml operation rotation (with a slight scale increase)
// useful for things like the Mikola Lysenko's super-fast l1-path-finder

var isq2=1;
function setup() {
  createCanvas(900, 900);
  ellipseMode(CENTER);
  isq2 = 1/Math.sqrt(2); // optional scale down a little
}

function draw() {
  background(100);
  stroke(0);
  line(width/2,0, width/2,height);
  line(0,height/2, width,height/2);
  stroke(110);
  line(0,0, width,width);
  line(width,0, 0,width,);

  translate(width/2,height/2);
  noFill();
  ellipse(0,0, 300,300);
  ellipse(0,0, 600,600);
  ellipse(0,0, 900,900);
  var x=mouseX-0.5-width/2, y=mouseY-0.5-height/2;
  stroke(0);
  fill(255);
  beginShape();
  vertex(x,y);
  vertex(x+100, y);
  vertex(x+100, y+100);
  vertex(x, y+100);
  endShape(CLOSE);
  fill(255,0,0);
  noStroke();
  ellipse(x,y, 5,5);
  
  stroke(0);
  fill(255);
  beginShape(); //sheared shape
  vertex((x+y)*isq2,(y-x)*isq2);
  vertex((x+100+(y))*isq2, (y-(x+100))*isq2);
  vertex((x+100+(y+100))*isq2, ((y+100)-(x+100))*isq2);
  vertex((x+(y+100))*isq2, ((y+100)-x)*isq2);
  endShape(CLOSE);
  fill(255,0,0);
  noStroke();
  ellipse((x+y)*isq2,(y-x)*isq2, 5,5);
}