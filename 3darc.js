// 3d arc construction study
// any key toggles fill/stroke mode


var easycam, angle=Math.PI/4, filler=true;
var camState = {
  distance: 80,
  center  : [46, 15, 1],
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

  perspective(22 * PI/180, width/height, 1, 6000);
  easycam = createEasyCam({distance:420.5});
  document.oncontextmenu = function() { return false; }
  document.onmousedown   = function() { return false; }
  noStroke();
  specularMaterial(0,0,255);
  pointLight(250, 250, 250, 20, 20, 50);

  easycam.setState(camState, 1000); // animate to camState on 1 second
  easycam.state_reset = camState; // state to use on reset
}

function draw() {
  if(!easycam) return;
  //console.log(easycam.getState());
  background(100);
  for(var i=0; i<20; i++) {
    push();
      translate(50*Math.cos(angle*i/20), 50*Math.sin(angle*i/20));
      rotateZ(angle*i/20);
      box(2,2,20);
    pop();
  }
}
function keyPressed() {
  filler = !filler;
  if(filler) {
    noStroke();
    fill(255);
    specularMaterial(0,0,255);
  } else {
    stroke(0);
    noFill();
    strokeWeight(0.1);
  }
}