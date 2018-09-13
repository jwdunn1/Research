// See live version here: https://www.openprocessing.org/sketch/581986
/***************************************************************************************
   This sketch mathematically calculates future collisions between objects and the resultant reactions.
   When in motion, correct reaction angles are computed by backtracking to the collision point between frames. 
   Drag the three largest objects and/or velocity vectors;  
   "space" bar toggles motion, or t=step motion; other keys: 
   s=30 fps; f=90 fps; v=toggle vectors; g=toggle next collision 'ghost'.
*****************************************************************************************/
/* software design engineer: jWilliamDunn, for kynamatrix
   aim: an experimental attempt to create a mathematically accurate simulation of elastic collision
   1) predict future collisions and display as "ghosts"
   2) backtrack to the collision point when an overlap of objects is detected
   3) compute the Newtonian response to elastic collision
   
   kinetic energy balanced. velocity is independent of frameRate
    
   uses spring() to separate the random initial placement of objects
   
   removed additional collisions beyond the next (filter those beyond the minimum time)
     (create a list of ghosts: each entry has id_A, id_B, and t)
    
   ghosting and draggable placement concept based on: http://blog.generalrelativity.org/actionscript-30/dynamic-circlecircle-collision-detection-in-actionscript-3
   additional references below
   
   applications: flying fish, pinball, billiards, particle systems
*/
boolean collision=false;
Ball b[];
boolean halt=true, step=false;
float currentTime,lastTime, ellapsedTime, startTime;
int renderCount=0;
boolean h1=false, h1v=false;
boolean h2=false, h2v=false;
boolean h3=false, h3v=false;

// Beyond 100, the framerate begins to drop and the screen becomes congested
int NUMOBJS=10;   //100 max   5 min
boolean showVectors=true;
boolean showGhosts=true;
float MAXT=1e16;

float amp=500f; // the visual representation (amplifier) of the velocity vector
int ALPHA75=75;    // the alpha level of the ghost (future) collision objects
int ALPHAMAX=255;

void setup() {
  lastTime = millis(); startTime = lastTime;
	size(816,816); frameRate(90);
  b = new Ball[NUMOBJS];
              // posX,posY,  velX,velY,  radius,  mass,  color
  b[0]= new Ball(100,100,     0.032,0.0, 60, 1000, color(95,90,102));
  b[1]= new Ball(800,500, -0.012,-0.028, 80, 1000, color(70,89,75));  
  b[2]= new Ball(800,100, -0.012,-0.012, 30, 500, lerpColor(b[0].c,b[1].c,0.5));  
  b[3]= new Ball(round(random(100,800)),round(random(100,500)), 0,0, 10, 100, color(127,63,0));
  
  for (int i=4; i<NUMOBJS; i++)
    b[i]= new Ball(round(random(10,890)),round(random(10,590)), 0,0, 4, 40, color(50));
  
  for (int i=3; i<NUMOBJS; i++)
    for (int j=0; j<NUMOBJS; j++)
      if (i!=j) spring(b[i],b[j]);
    
  ellipseMode(RADIUS);
  noStroke();
}

void draw() {
  currentTime = millis();
  background(140,121,96);
  strokeWeight(1);
  stroke(50);
  noFill();
  rect(0,0, width-1,height-1);
  ellapsedTime = currentTime - lastTime;
  lastTime = currentTime;
  float t=0, mint=MAXT; int minj=-1;
 
  for (int i=0; i<NUMOBJS; i++) {
    b[i].t = MAXT;
    if (!halt || step) b[i].move(ellapsedTime);
  }
  
  for (int i=0; i<NUMOBJS; i++) {
    for (int j=i+1; j<NUMOBJS; j++) {  // check for interactions with other objects - optimized
 
        t=TimeOfClosestApproach(b[i],b[j]);  // find the time of collision, if any (changes "collision" variable also)
        if (overlapping(b[i], b[j]) && (!halt || step)) {  // if an overlap is detected during the update, then collision occurred          
          b[i].p.x+=b[i].v.x*t; b[i].p.y+=b[i].v.y*t;  // so, move the balls back to the collision point
          b[j].p.x+=b[j].v.x*t; b[j].p.y+=b[j].v.y*t; 
          
          resolveCollision(b[i],b[j]);  // create new velocity vectors
    
          b[i].p.x-=b[i].v.x*t; b[i].p.y-=b[i].v.y*t;  // and move the balls forward from the collision point
          b[j].p.x-=b[j].v.x*t; b[j].p.y-=b[j].v.y*t; 
        }
        // save the earliest predicted collision
        if (collision)  //  NOTE: the variable "collision" was set in TimeOfClosestApproach()
          if (t>0 && t<mint) {  // filter out all but the minimum t (only the first objects to collide will be rendered)
            b[j].t = t;
            b[j].other = i;
            minj = j; mint = t;
          }
    }
    b[i].render(ALPHAMAX);  // render all of the regular objects
  }
  if (step) step=false;

  if (showGhosts) {
    if (minj != -1)
      renderGhost(b[minj],b[b[minj].other],b[minj].t);  // render the earliest future collision, if any are forecast
  }
  fill(63);
  text("Drag colored balls and/or vectors. Spacebar to toggle motion, or 't' to step. fps:"+round(frameRate), 5, height-5);
}

void renderGhost(Ball A, Ball B, float _t) {
    // draw ghosts for future collision
    Ball g1 = new Ball(A.p.x+A.v.x*_t, A.p.y+A.v.y*_t, A.v.x,A.v.y, A.r, A.m, A.c);  // create temp objects so the real
    Ball g2 = new Ball(B.p.x+B.v.x*_t, B.p.y+B.v.y*_t, B.v.x,B.v.y, B.r, B.m, B.c);  // ones will not be affected
    resolveCollision(g1,g2);  // creates new velocity vectors  
    g1.render(ALPHA75);
    g2.render(ALPHA75);
}

boolean overlapping(Ball A, Ball B) {
  if (sq(B.p.x-A.p.x)+sq(B.p.y-A.p.y) < sq(A.r+B.r) ) return true; else return false;  //optimized
}

void keyPressed() {
    if (key == ' ') halt = !halt;
    if (key == 'f') frameRate(90);
    if (key == 's') frameRate(30);
    if (key == 'v') showVectors=!showVectors;
    if (key == 'g') showGhosts=!showGhosts;
    if (key == 't') step = true;
}

void mousePressed() {
   if (sq(mouseX-(b[0].p.x+b[0].v.x*amp))+sq(mouseY-(b[0].p.y+b[0].v.y*amp)) < sq(10f) ) 
     h1v = true;
   else {
     if (sq(mouseX-(b[1].p.x+b[1].v.x*amp))+sq(mouseY-(b[1].p.y+b[1].v.y*amp)) < sq(10f) ) 
       h2v = true;
     else {
       if (sq(mouseX-(b[2].p.x+b[2].v.x*amp))+sq(mouseY-(b[2].p.y+b[2].v.y*amp)) < sq(10f) ) 
         h3v = true;
       else {
        if (sq(mouseX-b[0].p.x)+sq(mouseY-b[0].p.y) < sq(b[0].r) ) 
           h1 = true;
         if (sq(mouseX-b[1].p.x)+sq(mouseY-b[1].p.y) < sq(b[1].r) ) 
           h2 = true;
         if (sq(mouseX-b[2].p.x)+sq(mouseY-b[2].p.y) < sq(b[2].r) ) 
           h3 = true;
       }
     }
   }
}

void mouseDragged() {
  if (h1) {
    b[0].p.x += mouseX-pmouseX;
    b[0].p.y += mouseY-pmouseY;
  }
  if (h2) {
    b[1].p.x += mouseX-pmouseX;
    b[1].p.y += mouseY-pmouseY;
  }
  if (h3) {
    b[2].p.x += mouseX-pmouseX;
    b[2].p.y += mouseY-pmouseY;
  }
  if (h1v) {
    b[0].v.x += (mouseX-pmouseX)/amp;
    b[0].v.y += (mouseY-pmouseY)/amp;
  }
  if (h2v) {
    b[1].v.x += (mouseX-pmouseX)/amp;
    b[1].v.y += (mouseY-pmouseY)/amp;
  }
  if (h3v) {
    b[2].v.x += (mouseX-pmouseX)/amp;
    b[2].v.y += (mouseY-pmouseY)/amp;
  }
}

void mouseReleased() {
  h1=false; h1v=false;
  h2=false; h2v=false;
  h3=false; h3v=false;
  
//  println("v1="+b[0].v.x+", "+b[0].v.y+", v2="+b[1].v.x+", "+b[1].v.y);
}

void drawVector(PVector vec, PVector base, float len) {
  pushMatrix();
  float arrowSize = 4;
  translate(base.x, base.y);
  rotate(vec.heading2D());
  float lineLength = vec.mag() * len;
  line(0, 0, lineLength, 0);
  translate(lineLength, 0);
  triangle(0,0, -5,-2, -5,2);
  popMatrix();
}

/* references for quadratic circle(or sphere) collision detection:
   time calculation code based on http://twobitcoder.blogspot.com/2010/04/circle-collision-detection.html
   http://www.gamasutra.com/view/feature/131790/simple_intersection_tests_for_games.php?page=2
   http://compsci.ca/v3/viewtopic.php?t=14897
   */
float TimeOfClosestApproach(Ball A, Ball B) {
  PVector Pab = PVector.sub(A.p, B.p);
  PVector Vab = PVector.sub(A.v, B.v);
  float a = PVector.dot(Vab, Vab);
  float b = 2 * PVector.dot(Pab, Vab);
  float c = PVector.dot(Pab, Pab) - (A.r + B.r) * (A.r + B.r);
  float discriminant = b * b - 4 * a * c;
  float t=0;
  collision = false;  // assume no collision
  if (a != 0) {
    if (discriminant < 0) t = -b / (2 * a);
    else {
      float t0 = (-b + (float)sqrt(discriminant)) / (2 * a);
      float t1 = (-b - (float)sqrt(discriminant)) / (2 * a);
      t = min(t0, t1);
      if (t > 0) collision = true;
    }
  }
  return t;
}

/* references for elastic collision resolution:
   collision math from http://www.openprocessing.org/sketch/35721
   with corrections based on http://www.emanueleferonato.com/2007/08/19/managing-ball-vs-ball-collision-with-flash
   */
void resolveCollision (Ball A, Ball B) {  // modified to work with vector Ball class
  PVector vA = new PVector(A.v.x, A.v.y);
  PVector vB = new PVector(B.v.x, B.v.y);
  PVector preA = new PVector();
  PVector preB = new PVector();
  PVector finalA = new PVector();
  PVector finalB = new PVector();
  PVector newa = new PVector();
  PVector newb = new PVector();
  float dx, dy, t, magA, magB, d1, d2;

  dx = A.p.x-B.p.x;
  dy = A.p.y-B.p.y;
  t = atan2(dy, dx);  // collision angle
  magA = sqrt(vA.x*vA.x + vA.y*vA.y);
  magB = sqrt(vB.x*vB.x + vB.y*vB.y);
  d1 = atan2(vA.y, vA.x); // direction 1
  d2 = atan2(vB.y, vB.x); // direction 2
  preA.set(magA*cos(d1-t), magA*sin(d1-t), 0);
  preB.set(magB*cos(d2-t), magB*sin(d2-t), 0);
  finalA.set(((A.m-B.m)*preA.x + 2f*B.m*preB.x) / (A.m+B.m), preA.y, 0);  // kinetic swap occurs here
  finalB.set(((B.m-A.m)*preB.x + 2f*A.m*preA.x) / (A.m+B.m), preB.y, 0);
  newa.set( (cos(t)*finalA.x + cos(t + HALF_PI)*finalA.y), (sin(t)*finalA.x + sin(t + HALF_PI)*finalA.y), 0 );
  newb.set( (cos(t)*finalB.x + cos(t + HALF_PI)*finalB.y), (sin(t)*finalB.x + sin(t + HALF_PI)*finalB.y), 0 );

  A.v.x = newa.x; A.v.y = newa.y;
  B.v.x = newb.x; B.v.y = newb.y;
}

class Ball {  // now using vectors
  float r, m;
  PVector p;
  PVector v;
  color c;
  int other;
  float t;
  
  Ball(float _x, float _y, float _vx, float _vy, float _r, float _m, color _c) {
    p= new PVector(_x, _y);
    v= new PVector(_vx,_vy);
    r= _r; m= _m; c=_c;
  }
  
  void move(float time) {
    p.x += v.x*time;
    p.y += v.y*time;
    perimeterBounce();
  }
  
  void render(int _a) {
  noStroke(); fill(c, _a);
  ellipse(p.x, p.y, r, r);

  // display vector of travel (amplified)
  if (showVectors && m>100) {
    stroke(63, _a); fill(63, _a);
		strokeWeight(4);
    drawVector(v, p, amp);
    noStroke();
    }
  }

  private void perimeterBounce() {
    if (p.x>width-r) { v.x = -v.x; p.x = width-r; }
    if (p.y>height-r) { v.y = -v.y; p.y = height-r; }
    if (p.x<r) { v.x = -v.x; p.x = r; }
    if (p.y<r) { v.y = -v.y; p.y = r; }
  }

}

void spring(Ball A, Ball B) {
    PVector ab = new PVector();
    ab.set(A.p.x, A.p.y, 0);
    ab.sub(B.p.x, B.p.y, 0);
    ab.normalize();
    int failSafe=0;
    while(dist(A.p.x, A.p.y, B.p.x, B.p.y) <= (A.r + B.r)) {
      A.p.x += ab.x; A.p.y += ab.y;
      failSafe++;
      if (failSafe >1000) {
        println("Running loop fault");
        break;
      }
    }
}