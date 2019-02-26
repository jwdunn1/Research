// Biham-Middleton-Levine Traffic Model in p5.js
// Forked from openprocessing.org/sketch/27491 by Daniel L. Lu
// Ported to p5 by jWilliam Dunn 20190208

var xsize = 256, ysize = 256, speed = 3, fpsTheoretical = 60, 
    iterations = 0, 
    population,
    rule = [0,0,0,0,2,2,1,1,1,2,2,2,0,2,2,1,1,1,0,0,0,0,2,2,1,1,1],
    pixles = new Array(xsize*ysize),
    slexip = new Array(xsize*ysize),
    x, y,
    density = 34;  // adjust this value 0 to 100

function color2state(c){
  return c==0xFF0000?1:(c==0x0000FF?2:0);
}

function state2color(s){
  return s==1?0xFF0000:(s==2?0x0000FF:0xFFFFFF);
}

function trafficSet(){
  var index = 0;
  loadPixels();
  population = 0;
  for(x=0; x<xsize; x++){
    for(y=0; y<ysize; y++){
      index = (y*xsize+x)*4;
      pixles[y*xsize+x] = 0;
      slexip[y*xsize+x] = 0;
      if(random(100)<density){
        population++;
        pixels[index+1] = 0x00;
        pixels[index+3] = 0xFF;
        if(random(100)<50){
          pixles[y*xsize+x] = 1;
          pixels[index] = 0xFF;
          pixels[index+2] = 0x00;
        }else{
          pixles[y*xsize+x] = 2;
          pixels[index] = 0x00;
          pixels[index+2] = 0xFF;
        }
      }
    }
  }
  iterations = 0;
}

function setup(){
  createCanvas(256,256);
  frameRate(fpsTheoretical);
  textSize(14);
  ellipseMode(CENTER);
  noStroke();
  background(0);
  trafficSet();
  console.log(slexip[0]);
}

function draw(){
  for(var i=0; i<speed; i++){
    iterations++;
    for(x = 0; x<xsize; x++){
      for(y = 0; y<ysize; y++){
        slexip[y*xsize+x] = rule[pixles[y*xsize+(x+1)%xsize]+3*pixles[y*xsize+x]+9*pixles[y*xsize+(x+xsize-1)%xsize]];
      }
    }
    for(x = 0; x<xsize; x++){
      for(y = 0; y<ysize; y++){
        pixles[y*xsize+x] = rule[slexip[x+((y+1)%ysize)*xsize]+3*slexip[y*xsize+x]+9*slexip[x+((y+ysize-1)%ysize)*xsize]];
      }
    }
  }
  var index = 0;
  for(var i = 0; i<xsize*ysize; i++){
    var c = state2color(pixles[i]);
    index = i*4;
    pixels[index] = 0x00; // red
    pixels[index+1] = 0x00; // green
    pixels[index+2] = 0x00; // blue
    pixels[index+3] = 0xFF; // alpha
    if(c == 0xFF0000){
      pixels[index] = 0xFF;
      pixels[index+2] = 0x00;
    } else if(c == 0x0000FF){
      pixels[index] = 0x00;
      pixels[index+2] = 0xFF;
    } //else pixels[index+1] = 0xFF;
  }
  updatePixels();
}