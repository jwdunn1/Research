/***********************************************************************************************************
  economy
  engineer: jWilliamDunn

  todo:
  add a rule for partial load departure
  add production and consumer
  add route planner

  changeLog:
  20181126: repair drawHalfSphere; move to processingjs; halting condition
  20130710: initial simulation of resource movement from one point to another

/***********************************************************************************************************/

int NUMB=5;  // number of buildings
int NUMV=20; // number of vehicles

economy e;
building b[];
vehicle v[];

void setup() {
  size(900,900,P3D);
  perspective(PI*35/180f, float(width)/float(height), 1f, 25600f);

  e = new economy();

  background(255);
  frameRate(24);   // max 480! in P2.0
  strokeWeight(0.333);
  
  b = new building[NUMB];
  v = new vehicle[NUMV];
  
  b[0] = new building(100,100, 1000000);  // x,y, inv  <-- SOURCE
  b[1] = new building(800,800, 0);        //           <-- DEPOT
  b[2] = new building(900,0, 0);          //           <-- WAYPOINTS
  b[3] = new building(200,800, 0); 
  b[4] = new building(600,200, 0); 
  v[0] = new vehicle(0, 160,160, 5, 1000, 1);  // id, x,y, vel, qty, destination
  v[1] = new vehicle(1, 700,400, 7, 0, 0); 
  v[2] = new vehicle(2, 300,600, 7, 0, 0);
  v[3] = new vehicle(3, 200,200, 5, 1000, 1);
  v[4] = new vehicle(4, 240,240, 5, 1000, 1);
  for (int i=5; i<NUMV; i++) 
    v[i] = new vehicle(i, 240+i*20,240+i*20, 5, 0, 1);  // additional vehicles
  ellipseMode(RADIUS);
  noStroke();
}

void draw() {
  background(255);
  lights();
  pointLight(63, 63, 63,   // color
             0,-1400,450); // position
  camera(-mouseX*4+width*2,mouseY*4,800, 450,450,0, 0,0,-1);
  fill(200);
  rect(-200,-200,1300,1300);
  
  e.cycle();
  for (int i=0; i<NUMB; i++) b[i].render();
  for (int i=0; i<NUMV; i++) v[i].render();

  fill(127);
  noStroke();
  translate(400,600,-50);
  rotateX(PI/2);
  drawHalfSphere(48, 25, 100, 8);  // cosmetic only
}


class economy {
  void cycle() {
    for (int i=0; i<NUMV; i++) { // for all vehicles
    // transport/routing
    if (v[i].v > 0) { // if in motion, keep going toward destination
      PVector dir = new PVector(b[v[i].bID].x-v[i].x, b[v[i].bID].y-v[i].y, 0);
      dir.normalize();
      dir.mult(v[i].v);
      v[i].x += dir.x; v[i].y += dir.y;
      // if destination is within range, stop and unload
      if (dist(b[v[i].bID].x, b[v[i].bID].y, 0, v[i].x, v[i].y, 0) < 50) {
        v[i].v = 0;
        v[i].unloading = true;
      }
      dir = null;
    }
    // shipping/receiving
    if (v[i].unloading) { // unloading takes time
     if (v[i].currentLoad > 0) {
       v[i].currentLoad -= v[i].loadingRate;
       b[v[i].bID].inventory += v[i].loadingRate;
     }
     if (v[i].currentLoad <= 0) {
        v[i].currentLoad = 0;
        v[i].unloading = false;
        if (v[i].bID == 1) {
          v[i].bID = 1+ceil(random(1f)*3f); // go to building 2,3, or 4
          v[i].v = 7;  // at unloaded speed
        }
      }
    }

     if (v[i].bID == 0 && v[i].v == 0 && v[i].currentLoad <= 0) {
       v[i].loading = true;
       v[i].currentLoad = 0; // cannot be negative!
     }
     
     if ((v[i].bID >= 2) && v[i].v == 0 && v[i].currentLoad <= 0) {
        v[i].bID = 0; // go to building 0
         v[i].v = 7;  // at unloaded speed
     }
    
     if ( v[i].loading) {
       if (v[i].currentLoad < v[i].capacity) {
         if(b[v[i].bID].inventory>0) { // transaction
           b[v[i].bID].inventory -= v[i].loadingRate;
           v[i].currentLoad += v[i].loadingRate;
         }
       }
       if (v[i].currentLoad >= v[i].capacity) { // if fully loaded
          v[i].currentLoad = v[i].capacity;
          v[i].loading = false;
          if (v[i].bID == 0) {
            v[i].bID = 1; // take load to building 1
            v[i].v = 5; // at slower speed
          }
      }
       
     }    
  }
  }
}

class building {
  int ID;
  float x;
  float y;
  int type;
  int occupancy;
  int rate;  // rate of production 
  int maxInventory;
  int inventory;  // storage
  
  building(int _x, int _y, int _i) {
    x = _x; y = _y; inventory = _i;
  }
  void render() {
    pushMatrix();
    translate(x,y,25);
    fill(127);
    box(50);
    float i=inventory/1000f;
    translate(-25,-25,i/2-25);
    fill(0);
    box(10,10,i);
    popMatrix();
  }
}

class vehicle {
  int ID;
  float x;
  float y;
  int v;  // scalar velocity
  int pID; // driver
  int bID; // building ID, destination
  int capacity=1000;
  int currentLoad;
  boolean unloading = false;
  boolean loading = false;
  int loadingRate=20;

  vehicle(int _id, int _x, int _y, int _v, int _l, int _t) {
    x = _x; y = _y; v = _v; currentLoad = _l; bID = _t; ID = _id;
  }
  void render() {
    pushMatrix();
    noStroke();
    // render just above the ground plane
    translate(x,y,1f+(float)ID*0.2f);
    fill(255-round(currentLoad*255f/1000f)); // paint to indicate load
    float r=5+currentLoad*5f/1000f;
    ellipseQ(r);
    popMatrix();
  }
}

void ellipseZ(float r) {
    int steps=60;
    for (int n = 0; n < steps; n++) {
      float angle=(float)n/(float)steps*2f*PI;
      pushMatrix();
        translate(r/2*cos(angle), r/2*sin(angle), 0);  // polar to cartesian
        rotateZ(angle);                                // orient the box toward the center point
        box(r,2f*PI*r/(float)steps,0.01);
      popMatrix();
    }
}

void ellipseQ(float r) {
    int steps=60; float lastX, lastY;
    
    beginShape(TRIANGLE_FAN);
    vertex(0,0);
    vertex(r,0); lastX=r; lastY=0;
        for (int n = 1; n < steps; n++) {
          float angle=(float)n/(float)steps*2f*PI;
            vertex(r*cos(angle), r*sin(angle));  // polar to cartesian
        }
    vertex(r,0);
    endShape();
    
    lastX=r; lastY=0;
    /*strokeWeight(0.01f);stroke(63); 
    for (int n = 1; n < steps; n++) {
       float angle=(float)n/(float)steps*2f*PI;
       line(lastX, lastY, r*cos(angle), r*sin(angle));
       lastX=r*cos(angle);
       lastY=r*sin(angle);
     }
     line(lastX, lastY, r, 0);*/
}

class path {
}

 /*scalex - scaling of sphere around x-axis
   scaley - scaling of sphere around y-axis
   r - radius of sphere
   beg - starting index of the sphere (0=full half-sphere)
   modified from Sumpfratte's post of 08-05-2004, 11:42 PM
   located here: http://www.opengl.org/discussion_boards/showthread.php/159402-half-sphere
  */

 void drawHalfSphere(int scaley, int scalex, float r, int beg) {
   int i, j;
   float v[][];
 
   v = new float[scalex*scaley][3];
 
   for (i=0; i<scalex; ++i) {
     for (j=0; j<scaley; ++j) {
       v[i*scaley+j][0]=r*cos(j*2*PI/scaley)*cos(i*PI/(2*scalex));  // x-axis
       v[i*scaley+j][1]=r*sin(i*PI/(2*scalex));
       v[i*scaley+j][2]=r*sin(j*2*PI/scaley)*cos(i*PI/(2*scalex));  // z-axis
     }
   }
   beginShape(QUADS);
     for (i=beg; i<scalex-1; ++i) {
       for (j=0; j<scaley; ++j) {
         vertex(v[i*scaley+j][0], v[i*scaley+j][1], v[i*scaley+j][2]);
         vertex(v[i*scaley+(j+1)%scaley][0], v[i*scaley+(j+1)%scaley][1], v[i*scaley+(j+1)%scaley][2]);
         vertex(v[(i+1)*scaley+(j+1)%scaley][0], v[(i+1)*scaley+(j+1)%scaley][1], v[(i+1)*scaley+(j+1)%scaley][2]);
         vertex(v[(i+1)*scaley+j][0], v[(i+1)*scaley+j][1], v[(i+1)*scaley+j][2]);
       }
     }
   endShape();
   // Add the missing top piece
   beginShape(TRIANGLE_FAN);
   vertex(0, r, 0);
   int top=(scalex-1)*scaley;
   for (j=0; j<scaley; ++j)
     vertex(v[top+j][0], v[top+j][1], v[top+j][2]);
   vertex(v[top][0], v[top][1], v[top][2]);
   endShape();
 }