//
// 3D Picking + Interaction
//
// by Thomas Diewald, 2018
//
// p5.js version 0.6.1
//
// This sketch is loosely based on the PixelFlow version which can be found here:
// https://github.com/diwi/PixelFlow/blob/master/examples/Miscellaneous/PickAndMove/PickAndMove.java
// 
// The core part is a simple ID-picking buffer and some coordinate transform
// to move 3D objects with the mouse parallel to the viewer's plane.
// Also, the coordinate transform is used to compute the camera depth for each
// geometry which is then used for shading intensity.
//
// Controls: easycam

// Updates by jWilliamDunn 20190419
//    converted to easycam and later version of p5 0.6.1

// TBD: move to current version of p5


// coordinate transform: world <-> screen
var transform;

// geometry objects
var items = [];

// mouse interaction states
var LOCKED = false;
var FOCUSED = undefined;
var DRAGGED = undefined;

var easycam;

function setup() {

  //pixelDensity(1);
  createCanvas(windowWidth, windowHeight, WEBGL);
  // fix for EasyCam to work with p5 v0.7.2
  /*Dw.EasyCam.prototype.apply = function(n) {
    var o = this.cam;
    n = n || o.renderer,
    n && (this.camEYE = this.getPosition(this.camEYE), this.camLAT = this.getCenter(this.camLAT), this.camRUP = this.getUpVector(this.camRUP), n._curCamera.camera(this.camEYE[0], this.camEYE[1], this.camEYE[2], this.camLAT[0], this.camLAT[1], this.camLAT[2], this.camRUP[0], this.camRUP[1], this.camRUP[2]))
  };*/
    perspective(PI/8, width/height, 1, 6000);

  setAttributes('antialias', true);
  
  transform = new DwCoordinateTransform(width, height);
  
  easycam = createEasyCam({distance:850});
  document.oncontextmenu = function() { return false; }
  document.onmousedown   = function() { return false; }
  
  createItems(50);
  
} 

function windowResized() {
  if(!easycam) return;
  var w = windowWidth;
  var h = windowHeight;
  resizeCanvas(w, h);
}

function createItems(count){
  
  randomSeed(2);
  
  var pr = width/2;
  var dmax = pr / 5;
  var dmin = dmax / 2;

  for(var i = 0; i < count; i++){
    
    // new object
    var item = items[i] = {};
    
    // pick id
    item.id = i;
    
    // geometry type
    item.dimx = random(dmin, dmax);
    item.dimy = random(dmin, dmax);
    item.dimz = random(dmin, dmax);
         if(!(i%5)) item.displayGeometry = function(canvas){ canvas.sphere(this.dimx*0.7); };
    else if(!(i%7)) item.displayGeometry = function(canvas){ canvas.torus(this.dimx, this.dimx*0.5, 20, 10); };
    else            item.displayGeometry = function(canvas){ canvas.box(this.dimx, this.dimy, this.dimz); };
    
    // material color
    var rfill = random(196, 255);
    var gfill = random(rfill*0.1, rfill * 0.8);
    var bfill = 0;
    item.cfill = color(rfill, gfill, bfill);
    
    // picking color
    var rpick = (item.id >> 16) & 0xFF;
    var gpick = (item.id >>  8) & 0xFF;
    var bpick = (item.id >>  0) & 0xFF;
    item.cpick = color(rpick, gpick, bpick, 255);
    
    // local object transformation
    var tx = pr / 1.7;
    var ty = 0;
    var tz = (i * 1 / count - 0.5) * pr * 1.5;
    var rz = i * 4 * TWO_PI / count;
    item.mat_local = new p5.Matrix();
    item.mat_local.rotateZ(rz);
    item.mat_local.translate([tx,ty,tz]);
    
    // gizmo
    var s1 = 200, s2 = s1*0.06, c1 = 255, c2 = 64, c3 = 16;
    if(i === 0){
      item.cfill = color(c1,c2,c3);
      item.displayGeometry = function(canvas){ canvas.box(s1,s2,s2); };
      item.mat_local = new p5.Matrix();
      item.mat_local.translate([s1/2,0,0]);
    }
    else if(i === 1){
      item.cfill = color(c2,c1,c3);
      item.displayGeometry = function(canvas){ canvas.box(s2,s1,s2); };
      item.mat_local = new p5.Matrix();
      item.mat_local.translate([0,s1/2,0]);
    }
    else if(i === 2){
      item.cfill = color(c3,c2,c1);
      item.displayGeometry = function(canvas){ canvas.box(s2,s2,s1); };
      item.mat_local = new p5.Matrix();
      item.mat_local.translate([0,0,s1/2]);
    }

    // premultiply object transformation with modelview matrix
    item.applyMatrix = function(canvas, pass){
      
      // canvas modelview/projection matrix
      var uMVMatrix = canvas._renderer.uMVMatrix;
      var uPMatrix  = canvas._renderer.uPMatrix;
      
      // combined canvas modelview + projection
      this.mat_modelviewprojection = new p5.Matrix();
      this.mat_modelviewprojection.mult(uMVMatrix);
      this.mat_modelviewprojection.mult(uPMatrix);
      
      // set combined local + canvas modelview 
      var mat_modelview = new p5.Matrix();
      mat_modelview.mult(this.mat_local);
      mat_modelview.mult(uMVMatrix);
      
      // add some simple focused-animation
      if(pass === 1 && FOCUSED === this){
        var frq = 0.2;
        var amp = (DRAGGED === this) ? 0.05 : 0.05;
        var ds = sin(frameCount*frq) * amp;
        var s1 = 1 + ds * 1.1;
        var s2 = 1 - ds;
        mat_modelview.scale([s2,s2,s1]);
      }
      
      uMVMatrix.set(mat_modelview);
    }
    
    // apply material/fill based on canvas type and states
    item.applyMaterial = function(canvas, pass){
      if(pass === 0){
        canvas.fill(this.cpick);
      }
      else if(pass === 1){
        var r = this.cfill.levels[0];
        var g = this.cfill.levels[1];
        var b = this.cfill.levels[2];
        canvas.ambientMaterial(r,g,b);

        if(FOCUSED === this){
          canvas.ambientMaterial(0,128,255);
        }
        if(DRAGGED === this){
          canvas.ambientMaterial(0,192,255);
        }
      } 
    }
    
    // render
    item.display = function(canvas, pass){
      canvas.push();
      this.applyMatrix(canvas, pass);
      this.applyMaterial(canvas, pass);
      this.displayGeometry(canvas); 
      canvas.pop();
    }

    // Interaction
    item.startDrag = function(){
      DRAGGED = this;

      this.mat_local_pushed = this.mat_local.copy();
      
      var screen = [0,0,0,0];
      var world  = [0,0,0,0];
   
      var mat = new p5.Matrix();
      mat.mult(this.mat_local);
      mat.mult(this.mat_modelviewprojection);
      
      transform.setMatrix(mat);
      transform.worldToScreen(world, screen);
      
      this.on_screen = [];
      this.on_screen[0] = mouseX - screen[0];
      this.on_screen[1] = mouseY - screen[1];
      this.on_screen[2] =      0 - screen[2];
      this.on_screen[3] =      0 - screen[3];   
    }

    item.updateDrag = function(){
      if(DRAGGED !== this){
        return;
      }
      var screen = [0,0,0,0];
      var world  = [0,0,0,0];
      
      screen[0] = mouseX - this.on_screen[0];
      screen[1] = mouseY - this.on_screen[1];
      screen[2] =      0 - this.on_screen[2];
      screen[3] =      0 - this.on_screen[3];
      
      transform.screenToWorld(screen, world);

      this.mat_local = new p5.Matrix();
      this.mat_local.translate(world);
      this.mat_local.mult(this.mat_local_pushed);
    }
  
    item.endDrag = function(){
      DRAGGED = undefined;
    }

  }
}

function draw(){
  if(!easycam) return;
  if(!LOCKED){
    displayScene(this, 0);
    pick(mouseX, mouseY);
  }

  displayScene(this, 1);
}

var pixelbuffer;

function pick(x, y){
  // need to check small region around our pixel of interest, bec antialiasing
  // is applied to the picking buffer. (cant be turned off).
  // Only if all pixels have the same ID we let it through.
  
  if(x < 1 || x > width-2 || 
     y < 1 || y > height-2) return;
  
  y = height-1-y;
  pixelbuffer = readPixels(x-1, y-1, 3, 3, pixelbuffer); // 3x3 window

  var ID = items.length;
  for(var i = 0; i < 9; i++){
    var pid = i * 4;
    var r = pixelbuffer[pid++] & 0xFF;
    var g = pixelbuffer[pid++] & 0xFF;
    var b = pixelbuffer[pid++] & 0xFF;
    var ID_tmp = r << 16 | g << 8 | b;
    if(i===0){
      ID = ID_tmp;
    } else {
      ID = (ID !== ID_tmp) ? items.length : ID;
    }
  }
  FOCUSED = (ID < items.length) ? items[ID] : undefined;
}

function readPixels(x, y, w, h, pixels){
  pixels = pixels || new Uint8Array(w * h * 4);
  var gl = this._renderer.GL;
  gl.readPixels(x, y, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  return pixels;
}

function displayScene(canvas, pass){
  // pass 0: picking
  // pass 1: rendering

  canvas.push();
  canvas.resetMatrix();
  easycam.apply(canvas);
  
  canvas.perspective(60*PI/180, width/height, 10, 10000);
  
  canvas.noStroke();
  canvas.background(255);

  if(pass === 1){
    canvas.background(8);
    canvas.ambientLight(80);
    canvas.pointLight(255, 255, 255, 0, 0, 0);
    canvas.pointLight(255, 255, 255, 0, 0, 0);
  }
  
  for(var i = 0; i < items.length; i++){
    items[i].display(canvas, pass);
  }
  
  canvas.pop();
}

function mousePressed(){
  if(mouseButton === LEFT){
    if(FOCUSED){
      LOCKED = true;
      FOCUSED.startDrag();
      easycam.setAutoUpdate(false);
      return;
    }
  }
}

function mouseDragged() {
  if(FOCUSED){
    FOCUSED.updateDrag();
  }
}

function mouseReleased(){
  if(FOCUSED){
    LOCKED = false;
    FOCUSED.endDrag();
  }
  easycam.setAutoUpdate(true);
}

// https://github.com/diwi/PixelFlow/blob/master/src/com/thomasdiewald/pixelflow/java/utils/DwCoordinateTransform.java
class DwCoordinateTransform{
  
  constructor(screen_w, screen_h){
    this.screen_w = screen_w;
    this.screen_h = screen_h;
    this.projmodelview     = new p5.Matrix();
    this.projmodelview_inv = new p5.Matrix();
  }
  
  setMatrix(mvp){
    this.projmodelview.set(mvp);
    this.projmodelview_inv = new p5.Matrix();
    this.projmodelview_inv.invert(mvp);
  }

  // this transforms a vec4-coordinate from world-space to screen-space
  worldToScreen(world, screen){
    var src = [world[0], world[1], world[2], 1];
    // transform
    screen = this.mult(this.projmodelview, src, screen);
    // ndc/clip -> screen
    var w_inv = 1.0/screen[3];
    screen[0] = ((screen[0] * w_inv) * +0.5 + 0.5) * this.screen_w;
    screen[1] = ((screen[1] * w_inv) * -0.5 + 0.5) * this.screen_h;
    screen[2] = ((screen[2] * w_inv) * +0.5 + 0.5);
    return screen;
  }
  
  // this transforms a vec4-coordinate from screen-space to model-space
  screenToWorld(screen, world){
    var src = [screen[0], screen[1], screen[2], 1];
    // screen -> ndc
    src[0] = ((src[0]/this.screen_w) * 2 - 1) * +1;
    src[1] = ((src[1]/this.screen_h) * 2 - 1) * -1;
    src[2] = ((src[2]              ) * 2 - 1) * +1;
    // transform
    world = this.mult(this.projmodelview_inv, src, world);
    var w_inv = 1.0/world[3];
    world[0] *= w_inv;
    world[1] *= w_inv;
    world[2] *= w_inv;
    return world;
  }
  
  mult(mat, src, dst){
    var m4 = mat.mat4;
    var s0 = src[0], s1 = src[1], s2 = src[2], s3 = src[3];
    dst = (dst && dst.constructor === Array) ? dst : [];
    dst[0] = m4[ 0]*s0 + m4[ 4]*s1 + m4[ 8]*s2 + m4[12]*s3;
    dst[1] = m4[ 1]*s0 + m4[ 5]*s1 + m4[ 9]*s2 + m4[13]*s3;
    dst[2] = m4[ 2]*s0 + m4[ 6]*s1 + m4[10]*s2 + m4[14]*s3;
    dst[3] = m4[ 3]*s0 + m4[ 7]*s1 + m4[11]*s2 + m4[15]*s3;
    return dst;
  }

}
