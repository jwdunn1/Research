var easycam, filler=true;
var camState = {
  distance: 120,
  center  : [0,0,0], //[46, 15, 1],
  rotation: [-0.07, -0.76, -0.56, 0.3],
};

function setup() {
  createCanvas(900, 900, WEBGL);

  // fix for EasyCam to work with p5 v0.7.2
  Dw.EasyCam.prototype.apply = function(n) {
    var o = this.cam;
    n = n || o.renderer,
    n && (this.camEYE = this.getPosition(this.camEYE), this.camLAT = this.getCenter(this.camLAT), this.camRUP = this.getUpVector(this.camRUP), n._curCamera.camera(this.camEYE[0], this.camEYE[1], this.camEYE[2], this.camLAT[0], this.camLAT[1], this.camLAT[2], this.camRUP[0], this.camRUP[1], this.camRUP[2]))
  };

  perspective(PI/8, width/height, 1, 6000);
  easycam = createEasyCam({distance:450});
  // set initial camera state
  easycam.setState(camState, 1000); // animate to camState on 1 second
  easycam.state_reset = camState; // state to use on reset
  // prevent context menus
  document.oncontextmenu = function() { return false; }
  document.onmousedown   = function() { return false; }

  noStroke();
  pointLight(9,80,98, 20,20,20);
  pointLight(173,41,89, -20,-20,-20);
  pointLight(0,255,0, 0,-20,40);
}

function draw() {
  if(!easycam) return;
  background(100);
  specularMaterial(255,255,255);
  box(20,20,20);
  push();
    translate(20,20,20);
    fill(9,80,98);
    sphere(0.5);
  pop();
  push();
    translate(-20,-20,-20);
    fill(173,41,89);
    sphere(0.5);
  pop();
  push();
    translate(0,-20,40);
    fill(0,255,0);
    sphere(0.5);
  pop();
}

function keyPressed() {
  console.log(easycam.getState()); // useful for setting initial state
  filler = !filler;
  if(filler) {
    noStroke();
    fill(255);
    specularMaterial(255,255,255);
  } else {
    stroke(0);
    noFill();
    strokeWeight(0.05);
  }
}