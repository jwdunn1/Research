// fork origin: https://www.openprocessing.org/sketch/403027
var UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3,
 maxNodeSize = 3,
 minNodeSize = 1,
 maxNodeAge = 200,
 maxPathAge = 1000;

var nodes=[];
var paths=[];

function setup() {
  createCanvas(242,242);
} 

function draw() {
  background(4,4,47);
  strokeWeight(1);
  stroke(0,0,255);
  noFill();
  rect(0,0, 241,241);
  console.log(frameRate(),nodes.length,paths.length);
  var i = 0;
  var plen = paths.length;
  while(i < paths.length){
    paths[i].render();
    i++;
  }
  i = 0;
  var nlen = nodes.length;
  while(i < nlen){
    nodes[i].render();
    i++;
  }
  i = 0;
  while(i < nodes.length){ // remove old nodes
    nodes[i].update();
    i++;
  }
  i = 0;
  while(i < paths.length){ // remove old paths
    paths[i].update();
    i++;
  }
  if(Math.random() < .05){
    // 5% chance to spawn a path
    var x = Math.round(Math.random() * width);
    var y = Math.round(Math.random() * height);
    paths.push(new Path(x, y, paths.length));
  }
}

// Some interactivity

function mousePressed(){
  paths.push(new Path(mouseX, mouseY, paths.length))
}

// Resettable

function keyPressed(){
  nodes = [];
  paths = []; 
}

class Point {
  constructor(x, y){
    this.x = x || 0; // Default position to (0, 0)
    this.y = y || 0;
  }
  setPosition(x, y){
    this.x = x;
    this.y = y;
  }
}

// A node is a square
class Node{
  constructor(x, y, arrayPos, parentPath) {
    this.size = minNodeSize + Math.round((Math.random() * maxNodeSize));
    // Center the point
    x -= this.size / 2;
    y -= this.size / 2;
    this.position = new Point(x, y);
    this.age = 0;
    this.arrayPos = arrayPos;
    this.parentPath = parentPath;
    this.level = Math.round(Math.random() * 100)
  }
  update() {
    this.age++;
    if(this.age > maxNodeAge){
      console.log("removing node");
      removeNode(this);
    }
  }
  render() {
    noStroke();
    fill(2,175,196);
    if(this.age - maxNodeAge >= -10)
      fill(64);
    var x = this.position.x;
    var y = this.position.y;
    rect(x, y, this.size, this.size);
    //triangle(x,y, x+size,y+size, x-1,y+size+1);
    //ellipse(x, y, size, size);
  }
}

// Paths are the lines that spawn nodes.
// You can click to spawn a node. This will also spawn a path.

class Path {
  constructor(x, y, arrayPos) {
    this.path = [];
    this.position = new Point(x, y);
    this.direction = Math.round(Math.random() * 4);
    this.path.push(new Point(this.position.x, this.position.y));
    this.arrayPos = arrayPos;
    this.level = Math.round(Math.random() * 127)
    this.age = 0;
  }
  update() {
    this.age++;
    if(this.age > maxPathAge){
      console.log("removing path");
      removePath(this);
    }
  }
  render() {
    // Move based on direction
    if(this.direction == UP){
      this.position.y -= 1;
    }
    else if(this.direction == DOWN){
      this.position.y += 1;
    }
    else if(this.direction == LEFT){
      this.position.x -= 1;
    }
    else{
      this.position.x += 1;
    }
    
    // Stop if a wall
    if(this.position.x <= 0 || this.position.x >= width){
      removePath(this);
      return;
    }
    else if(this.position.y <= 0 || this.position.y >= height){
      removePath(this);
      return;
    }
    
    // Spawn a node?
    var decider = Math.random();
    
    if(decider < .02){
      nodes.push(new Node(this.position.x, this.position.y, nodes.length, this));
    }
    
    if(decider < .02){
      var newDirection = Math.round(Math.random() * 4);
      if(newDirection != this.direction){
        this.direction = newDirection;
        this.path.push(new Point(this.position.x, this.position.y));
      }
    }
    
    // Draw the path
    var lastPoint = this.position;
  	for(var i = this.path.length - 1; i >= 0; i--){
      var x1, y1, x2, y2;
      x1 = lastPoint.x;
      y1 = lastPoint.y;
      var currentPoint = this.path[i];
      x2 = currentPoint.x;
      y2 = currentPoint.y;
      stroke(2,127,255,127);
      strokeWeight(2);
      line(x1, y1, x2, y2);
      lastPoint = currentPoint;
    }
  }
}

// Delete a node
function removeNode(n){
  // Update array indexes
  var index = n.arrayPos;
  for(var i = 0; i < nodes.length; i++){
    if(nodes[i].arrayPos > index){
      nodes[i].arrayPos --;
    }
  }
  // Remove the node
  nodes.splice(index, 1);
}

// Delete a path
function removePath(p){
  // Update array indexes
  var index = p.arrayPos;
  for(var i = 0; i < paths.length; i++){
    if(paths[i].arrayPos > index){
      paths[i].arrayPos --;
    }
  }
  var i = 0;
  // remove all child nodes
  while(i < nodes.length){
    var n = nodes.pop(i);
    if(n.parentPath == p){
      removeNode(n);
    }
    i++;
  }
  // Remove the path
  paths.splice(index, 1);
}