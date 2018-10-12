/**
* city builder 
*
* @author aa_debdeb
* @date 2016/04/29
* ported to p5 by jWilliamDunn 20181011
* improvements:
*   -gate the addition of buildings by frameRate to prevent slowdown
*   -moveable lighting using mouse
*   -reset on click
*/

var blocks = [],num = 30,bsize = 20, x,y,z;

function setup(){
  createCanvas(600, 600, WEBGL);
  reset();
  noStroke();
  stroke(128);
  fill(255);
}

function reset(){
  for(x = 0; x < num; x++){
    blocks[x] = [];
    for(y = 0; y < num; y++){
      blocks[x][y] = 0;
    }
  }	
}
function mousePressed(){
  reset();
}
function draw(){
  background(255);
  var dirX = (mouseX / width - 0.5) * 2;
  var dirY = (mouseY / height - 0.5) * 2;
  directionalLight(250, 250, 250, -dirX, -dirY, 0.25);
  ambientMaterial(250);
  translate(0, 0, -200);
  rotateX(PI / 3);
  rotateZ(frameCount * 0.005);
  for(x = 0; x < num; x++){
    for(y = 0; y < num; y++){
      for(z = 0; z < blocks[x][y]; z++){
        push();
        translate(x * bsize - width / 2, y * bsize - height / 2, z * bsize);
        box(bsize);
        pop();
      }
    }
  }
  var sum = 0;
  var eachSum = [];
  for(x = 0; x < num; x++){
    eachSum[x] = [];
    for(y = 0; y < num; y++){
      var left = x != 0 ? x - 1: num - 1;
      var right = x != num - 1 ? x + 1: 0;
      var up = y != 0 ? y - 1: num - 1;
      var down = y != num - 1 ? y + 1: 0;
      var s = blocks[x][y] + blocks[left][y] + blocks[right][y]
                + blocks[x][up] + blocks[x][down] + 1;
      sum += s;
      eachSum[x][y] = s;  
    }
  }
  var rnd = random(1);
  var prob = 0.0; 
  for(x = 0; x < num; x++){
    for(y = 0; y < num; y++){
      prob += float(eachSum[x][y]) / sum;
      if(rnd < prob && frameRate()>24){
        blocks[x][y] += 1;
        return;
      }
    }
  }  
}