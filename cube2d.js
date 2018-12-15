/* Fork of *@*http://www.openprocessing.org/sketch/151053*@* */
/* Ported to p5 by jWilliamDunn on 20181213 */

/* UTILITY ROUTINES FROM PROCESSINGJS
 * Java's arrays are pre-filled when declared with
 * an initial size, but no content. JS arrays are not.
 */
function isNumericalJavaType(type) { // internal helper function
  if (typeof type !== "string") return false;
  return ["byte", "int", "char", "color", "float", "long", "double"].indexOf(type) !== -1;
}
var createJavaArray = function(type, bounds) {
  var result = null, defaultValue = null;
  if (typeof type === "string") {
    if (type === "boolean") {
      defaultValue = false;
    } else if (isNumericalJavaType(type)) {
      defaultValue = 0;
    }
  }
  if (typeof bounds[0] === 'number') {
    var itemsCount = 0 | bounds[0];
    if (bounds.length <= 1) {
      result = [];
      result.length = itemsCount;
      for (var i = 0; i < itemsCount; ++i) {
        result[i] = defaultValue;
      }
    } else {
      result = [];
      var newBounds = bounds.slice(1);
      for (var j = 0; j < itemsCount; ++j) {
        result.push(createJavaArray(type, newBounds));
      }
    }
  }
  return result;
};

//GEOMETRY
var verts = [],	finalverts = [];
var edges = [];

// SIZE
var SCALE = 0;

// ROTATION
var angles = [], incs = [];
var matrices = [];
var finalmatrix = [];
var rot = [];

// PERSPECTIVE
var d = 0;

function init() {
  var a = [8,3];
  verts = createJavaArray('float', a);
  a = [8,2];
  finalverts = createJavaArray('float', a);
  a = [12,2];
  edges = createJavaArray('int', a);
  a = [3,3,3];
  matrices = createJavaArray('float', a);
  a = [3,3];
  finalmatrix = createJavaArray('float', a);
  a = [3];
  angles = createJavaArray('float', a);
  incs = createJavaArray('float', a);
  rot = createJavaArray('boolean', a);
  for (var i = 0; i < 3; i++) {
      angles[i] = 0;
      incs[i] = random(0.015);
      rot[i] = true;
  }
  rot[1] = false;
  incs[0] = 0.002544;
  incs[2] = 0.004748;

  SCALE = height / (2 * sqrt(3));
  d = SCALE * 3;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 3; j++) {
      verts[i][j] = -100;
    }
    var curi = i;
    for (var k = 2; k >= 0; k--) {
      if (curi >= pow(2, k)) {
        verts[i][k] = 100;
        curi -= pow(2, k);
      }
    }
  }

  var linecount = 0;
  for (var i = 0; i < 8; i++) {
    for (var j = 1; j < 8; j *= 2) {
      if (i < (i ^ j)) {
        edges[linecount][0] = i;
        edges[linecount][1] = i ^ j;
        linecount++;
      }
    }
  }
}

function setup () {
  createCanvas(450, 450);
	pixelDensity(2);
  ellipseMode(CENTER);
  stroke(63, 63, 255);
  fill(63, 63, 255);
  strokeWeight(2);
  init();
}

var multiply = function (matr1, matr2) {
  var a = [3,3];
  var matr12 = createJavaArray('float', a);
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      matr12[i][j] = 0;
      for (var k = 0; k < 3; k++) {
        matr12[i][j] += matr1[i][k] * matr2[k][j];
      }
    }
  }
  return matr12;
};


var rotpoint = function (vert, matrix) {
  var a = [3], xy = createJavaArray('float', a);
  for (var i = 0; i < 3; i++) {
    xy[i] = 0;
    for (var j = 0; j < 3; j++) {
      xy[i] += vert[j] * matrix[j][i];
    }
  }
  return xy;
};

var projection = function (vert) {
  var xy = createJavaArray('float', [3]);
  xy[2] = vert[2];

  xy[0] = vert[0] * d / (d + xy[2]);
  xy[1] = vert[1] * d / (d + xy[2]);

  return xy;
};

function draw () {
  background(0);
  push();
  translate(width / 2, height / 2);

  for (var i = 0; i < 3; i++) {
    if (rot[i]) {
      angles[i] += incs[i];
    }
  }

  var rotcount = 0;
  for (var a = 0; a < 2; a++) {
    for (var b = a + 1; b < 3; b++) {
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (i === j && (i === a || i === b)) {
            matrices[rotcount][i][j] = cos(angles[rotcount]);
          } else if (i === j) {
            matrices[rotcount][i][j] = 1;
          } else if ((i !== a && i !== b) || (j !== a && j !== b)) {
            matrices[rotcount][i][j] = 0;
          } else if (i === a && j === b) {
            matrices[rotcount][i][j] = -sin(angles[rotcount]);
          } else if (i === b && j === a) {
            matrices[rotcount][i][j] = sin(angles[rotcount]);
          } else {
            println("Error!");
          }
        }
      }
      rotcount++;
    }
  }
  finalmatrix = matrices[0];
  for (var i = 1; i < 3; i++) {
    finalmatrix = multiply(matrices[i], finalmatrix);
  }
  for (var i = 0; i < 8; i++) {
    finalverts[i] = projection(rotpoint(verts[i], finalmatrix));
  }
  for (var i = 0; i < 12; i++) {
    var x1 = 0, y1 = 0, x2 = 0,
        y2 = 0, z1 = 0, z2 = 0;
    x1 = finalverts[edges[i][0]][0];
    y1 = finalverts[edges[i][0]][1];
    z1 = finalverts[edges[i][0]][2];
    x2 = finalverts[edges[i][1]][0];
    y2 = finalverts[edges[i][1]][1];
    z2 = finalverts[edges[i][1]][2];
    if (i === 7 || i === 5) {
        var t1 = x1, t2 = y1, t3 = z1;
        x1 = x2; y1 = y2; z1 = z2;
        x2 = t1; y2 = t2; z2 = t3;
    }
    line(x1, y1, x2, y2);
    var mwid = (300 - z1) / 30;
    noStroke();
    fill(63, 63, 255, 210 + parseInt(mwid * 3,1));
    ellipse(x1, y1, mwid, mwid);
    stroke(63, 63, 255);
    fill(63, 63, 255);
  }
  pop();
}