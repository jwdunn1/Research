// Experiment with network node movements

var nodes, focus, A, B;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // first, build some random nodes on the screen
  var x, y, i, j, k;
  nodes = [];
  for(x = 0; x < width; x = x + width/20)
    for(y = 0; y < height; y = y + height/20) {
      var px = x + Math.random()*width/20;
      var py = y + Math.random()*height/20;
      var p = {x: px, homeX: px, targetX: px-25+random(50), originX: px,
               y: py, homeY: py, targetY: py-25+random(50), originY: py};
      nodes.push(p);
    }
  // handle screen size and radius of focus area
	var r = Math.min(width,height);
	A = Math.pow(r*0.222222,2);
	B = A * 0.9;
	
  // next, for each point in the list,
  for(i = 0; i < nodes.length; i++) {
    var neighbor = [];
    var p1 = nodes[i];
    // loop through all other nodes,
    for(j = 0; j < nodes.length; j++) {
      var p2 = nodes[j];
      // and if not the present point
      if(p1 != p2) {
        var found = !1;
        // find the three nearest neighbors
        for(k = 0; k < 3; k++)
          if(!found)
            if(neighbor[k] == undefined) {
              neighbor[k] = p2;
              found = !0;
              break;
            }
        if(!found)
          for(k = 0; k < 3; k++)
            if(getDistSq(p1, p2) < getDistSq(p1, neighbor[k])) {
              neighbor[k] = p2;
              found = !0;
              break;
            }
      }
    }
    p1.neighbor = neighbor;
  }
  focus = {x: width/2, y: height/2};

  // finally, create a Node at each vertex
  for(var i in nodes) {
    var c = Node.createNew(nodes[i], 1.5+Math.random()*1.5);
    nodes[i].node = c;
  }
	background(0);
}

function getDistSq(p1, p2) {
  return Math.pow(p1.x-p2.x, 2) + Math.pow(p1.y-p2.y, 2);
}

function draw() {
  background(0, 31);
  var d, p, j;
  for(var i in nodes) {
    nodes[i].active = 0;
    nodes[i].node.active = 0;
    // show nodes within range
    d = Math.abs(getDistSq(focus, nodes[i]));
    if(d < A) {
      nodes[i].node.active = (A-d)/B;
      nodes[i].active = nodes[i].node.active/2;
    }
    p = nodes[i];
    if(p.active)
      for(j in p.neighbor) {
        noFill();
        stroke(0,127,255, p.active*255);
        line(p.x, p.y, p.neighbor[j].x, p.neighbor[j].y);
      }
    nodes[i].node.draw();
  }
}

function mouseMoved(e) {
  focus.x = mouseX;
  focus.y = mouseY;
}

// For more on BlackScript, see: http://gabordemooij.com/index.php?p=/blackscript
var Node = {
  createNew: function(pos,rad) {
    var obj = {};
    obj.pos = pos;
    obj.radius = rad;
    obj.t = parseInt(random(50));

    obj.easing = function(t) {
      var ts = t * t, tc = ts * t;
      return 6*tc*ts - 15*ts*ts + 10*tc;
    };
    obj.draw = function() {
      if(!obj.active) return;
      // tween from originXY to targetXY at a rate specified by the easing function
      obj.pos.x = obj.pos.originX+(obj.pos.targetX - obj.pos.originX)*obj.easing(obj.t/100);
      obj.pos.y = obj.pos.originY+(obj.pos.targetY - obj.pos.originY)*obj.easing(obj.t/100)
      
      // render an ellipse at the present location of this Node
      noStroke();
      fill(0,191,255, obj.active*255);
      ellipse(obj.pos.x, obj.pos.y,	obj.radius*2, obj.radius*2);
      
      // increment the percentage factor t
      obj.t += 1;
      
      // if targetXY achieved, set a new targetXY near the Node's home point
      if(obj.t==100) {
        obj.pos.targetX = obj.pos.homeX-25+random(50), obj.pos.targetY = obj.pos.homeY-25+random(50), obj.t=0;
        obj.pos.originX = obj.pos.x, obj.pos.originY = obj.pos.y;
      }
    };
    return obj;
  }
}
