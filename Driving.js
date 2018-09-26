// "Driving through Iceland” sketch by dotlassie
// port to p5 by jWilliamDunn 20180925

var h=256,t=0,T=0,x=0,y=0,c;
function setup() {
  createCanvas(512, 512);
  noStroke();
  fill(204);
  rect(0,0, 511,511);
}
function draw(){
  t+=x=.3-mouseY/h/5;
  T+=mouseX/h*x-x;

  for(y=0;++y<h;){
    fill(h-y,h-y,h-y,85);
    rect(0,h+y,h*2,1);
    x=h/y+t; c=x%20*9;
    fill(c,c,c,85);
    x=T+noise(x/99)*60-30;
    rect(h-x*y-2*y,h+y,y*4,1);
  }
}