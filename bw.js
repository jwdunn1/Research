var pg,o;
function setup() {
  createCanvas(900, 900);
  background(255);
  pg = createGraphics(width/2, height);
  o = new Obj(0,0,200,200);
}

function draw() {
  o.update(mouseX,mouseY);
  background(255);
  fill(0);
  noStroke();
  o.draw(0);

  pg.background(0);
  pg.fill(255); 
  pg.noStroke(); 
  o.draw(1);

  image(pg, width/2, 0);
}

class Obj {
  constructor(x,y,w,h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  update(x,y){
    this.x = x;
    this.y = y;
  }
  draw(level){
    if (level == 0) {
      fill(0);
      triangle(this.x,this.y, this.x+this.w,this.y, this.x+this.w/2,this.y+this.h);
    } else {
      fill(255); 
      pg.triangle(this.x-width/2,this.y, this.x-width/2+this.w,this.y, this.x-width/2+this.w/2,this.y+this.h);
    }
  }
}