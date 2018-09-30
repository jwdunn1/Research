// Forked from:
// Box Fitting
// j.tarbell   January, 2004
// Processing 0085 Beta syntax update April, 2005
// Albuquerque, New Mexico
// complexification.net
// Ported to p5 with a number of modifications by jWilliamDunn 20180929

var num = 0,
    maxnum = 1000,
    dim = 900,
    boxes = [],
    maxpal = 256,
    numpal = 0,
    img;

function setup() {
  createCanvas(900, 900);
  frameRate(30);
  noStroke();
  for (var i=0;i<3;i++)
    makeNewBox();
}

function draw() {
  background(127);
  for (var n=0;n<num;n++)
    boxes[n].draw();
}

function makeNewBox() {
  if (num<maxnum) {
    console.log(num);
    boxes[num] = new Box(num);
    num++;
  }
}

class Box {
  constructor(id) {
    // random initial conditions
    this.chaste = true;
    this.id = id;
    this.selfinit();
  }
  selfinit() {
    // position
    this.okToDraw = false;    
    this.x = int(random(dim));
    this.y = int(random(dim));
    this.s = 0;
    this.myc = int(random(maxpal)); //somecolor(1.0*this.y/dim);
  }
  draw() {
    this.expand();
    if (this.okToDraw) {
      fill(this.myc);
      rect(this.x,this.y, this.s,this.s);
    }
  }
  // Returns true if two rects r1 and r2 overlap
  doOverlap(r1, r2) {
    if (r1.x > r2.x+r2.s // r1 is right to r2
    || r1.x+r1.s < r2.x  // r1 is left to r2
    || r1.y > r2.y+r2.s  // r1 is above r2
    || r1.y+r1.s < r2.y) // r1 is below r2
      return false;
    return true;
  } 
  expand() {
    this.s+=2;
    // look for obstructions around perimeter at width d
    var obstructions = 0, p;

    for (p=0; p<num; p++)
      if ((this.id != boxes[p].id) && this.doOverlap(this, boxes[p]))
        obstructions++;

    if (obstructions>0) {
      this.s-=2;
      if (this.chaste) {
        makeNewBox();
        this.chaste = false;
      }
    } else {
      this.okToDraw = true;
    }
  }
}