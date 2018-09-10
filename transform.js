var m=[1,0,0,1,0,0], q=[];

function reset() {
  m=[1,0,0,1,0,0];
}
function push_() {
  q.push([m[0],m[1],m[2],m[3],m[4],m[5],]);
  push();
}
function pop_() {
  m = q.pop();
  pop();
}

function getInverse(o) {
  var a = o[0], b = o[1], c = o[2],
      d = o[3], e = o[4], f = o[5],
      m = [1,0,0,1,0,0],
      dt = (a * d - b * c);
  m[0] =  d / dt; m[1] = -b / dt;
  m[2] = -c / dt; m[3] =  a / dt;
  m[4] =  (c * f - d * e) / dt;
  m[5] = -(a * f - b * e) / dt;
  return m;
}

function localToGlobal(x,y) {
  var _X = x * m[0] + y * m[2] + m[4],
      _Y = x * m[1] + y * m[3] + m[5];
  return({x:_X,y:_Y});
}

function globalToLocal(x,y) {
  var n = getInverse(m);
  var _X = x * n[0] + y * n[2] + n[4],
      _Y = x * n[1] + y * n[3] + n[5];
  return({x:_X,y:_Y});
}

function translate_(x,y) {
  m[4] += m[0] * x + m[2] * y;
  m[5] += m[1] * x + m[3] * y;
  translate(x,y);
}

function scale_(x,y) {
  m[0] *= x; m[1] *= x;
  m[2] *= y; m[3] *= y;
  scale(x,y);
}

function rotate_(r) {
  var c = Math.cos(r), s = Math.sin(r);
  var m11 =  m[0] * c + m[2] * s,
      m12 =  m[1] * c + m[3] * s,
      m21 = -m[0] * s + m[2] * c,
      m22 = -m[1] * s + m[3] * c;
  m[0] = m11;  m[1] = m12;
  m[2] = m21;  m[3] = m22;
  rotate(r);
}


// TEST //////////////////////////////////////////////////

//rotate(45*Math.PI/180);
//translate(50,90);
//scale(2,2);
//console.log(modelXY(0,0));
// set transform array in the canvas context
//context.transform(m[0],m[1],m[2],m[3],m[4],m[5]);