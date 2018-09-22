var t=0.0, x, y, n,
    step=3;

function setup() {
  createCanvas(600, 600);
  noStroke();
  for (y = 2*height/3; y < height; y += step) {
    for (x = 0; x < width; x += step) {
      //draw the water on the bottom
      fill(7,38,67, map(y, 2*height/3, height, 0, 255));
      rect(x,y, step,step);
    }
  }
}

function draw() { 
  fill(255);
  rect(0,0, width,2*height/3); // clear upper 2/3
  
  for (y = 0; y < 2*height/3; y += step) {
    for (x = 0; x < width; x += step) {
      //draw evolving clouds
      n = noise(x/200., y/50., t);
      fill(70, 83, 117, n*map(y, 0, 2*height/3, 255, 0)); 
      rect(x,y, step,step);
    }
  }
  t+= 0.01;
}