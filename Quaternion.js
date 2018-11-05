var easycam, radius=1, v1, v2, q, f;


class Quaternion {
  constructor(v,r) {
    var dir = v.normalize(), s = Math.sin(r/2);
    this.w=Math.cos(r/2), this.x=s*dir.x, this.y=s*dir.y, this.z=s*dir.z;
  }
  rotateVector(v) {
    var x = v.x, y = v.y, z = v.z, o = {},
        qw = this.w, qx = this.x, qy = this.y, qz = this.z;

    var iw = -qx * x - qy * y - qz * z, // see threejs
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x;

    o.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    o.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    o.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return o;
  }
}

function preload() {
  f = loadFont('Roboto.otf');
}

function setup() {
  createCanvas(900,900, WEBGL);
  pixelDensity(2.0);
  perspective(22 * PI/180, width/height, 0.01, 12.55);
  easycam = createEasyCam({distance:12.5});
  document.oncontextmenu = function() { return false; }
  document.onmousedown   = function() { return false; }
  strokeWeight(0.005);
  textFont(f);
  textSize(.1);
  
  // define a vector in some direction
  v1 = createVector(1,1,.5).normalize();
  
  // create a quaternion from an axis and angle
  q = new Quaternion(createVector(0,0,1), Math.PI/2);
  console.log(q);
  
  // apply the quaternion to vector v1 
  v2 = q.rotateVector(v1);
  console.log(v2);
}

// visualize
function draw() {
  if(!easycam) return;
  background(0);
  
  noStroke();
  specularMaterial(255,10);
  sphere(radius, 32,24);

  stroke(0,255,0); // the coordinate system
  line(0,0,0, radius,0,0); // green is the X axis
  fill(127);
  text("X", radius,0);
  stroke(0,0,255);
  line(0,0,0, 0,radius,0); // blue is the Y axis
  text("Y", 0,radius);
  stroke(255,0,0);
  line(0,0,0, 0,0,radius); // red is the Z axis
  push();
    translate(0,0,1);
    text("Z", 0,0);
  pop();

  stroke(127,63,0); // radial orange line (the original vector)
  line(0,0,0, v1.x,v1.y,v1.z);

  stroke(127,0,63); // royal purple line is the rotated vector
  line(0,0,0, v2.x,v2.y,v2.z);
}