// See https://www.sciencealert.com/strange-optical-illusion-are-lines-straight-or-bent-curvature-blindness
void setup() {
  size(754, 500);
  background(127);
}
void draw() {
  translate(0, height/2);
  for (int x=0; x < 801; x = x+2) {
    float y = 15*sin(x*PI/50);
    noStroke();
		
		if (sin(0+(x+mouseX)*PI/50)>0) 
			fill(255);
		else
			fill(0);
    ellipse(x, y-200, 3, 3);
	  ellipse(x, y-150, 3, 3);
	
    if (sin(300+(x+mouseX)*PI/50)>0) //x>mouseX-25 && x<mouseX+25) 
			fill(0);
		else
			fill(255);
    ellipse(x, y-50, 3, 3);
	  ellipse(x, y, 3, 3);

    if (sin(0+(x+mouseX)*PI/50)>0) 
			fill(255);
		else
			fill(0);
    ellipse(x, y+100, 3, 3);
	  ellipse(x, y+150, 3, 3);
	
	}
}