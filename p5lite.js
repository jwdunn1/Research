/* a minimal implementation of the p5js framework -
   enough to get the following basic sketch operational

function setup() { // called once
  createCanvas(windowWidth, windowHeight);
  background(100);
}

function draw() { // called on every frame update
  ellipse(mouseX, mouseY, 20, 20);
}

*/

(function (w) {
  var ctx,set=false,gFill="#fff",gStroke="#000",gWeight=1;
  w.windowWidth = w.innerWidth,
  w.windowHeight = w.innerHeight;

  w.createCanvas = function(width,height){
    var c = document.createElement('canvas');
    c.id = '_';
    c.setAttribute("width", width);
    c.setAttribute("height", height);
    document.body.appendChild(c);
    ctx = c.getContext('2d');
    w.width = ctx.canvas.width;
    w.height = ctx.canvas.height;
    w.mouseX = 0, w.mouseY = 0;
    c.addEventListener("mousemove", handleEvt);
    set = true;
  }

  function handleEvt(e){
    if (e.type == "mousemove") w.mouseX=e.x, w.mouseY=e.y;
  }

  w.background = function(c){
    if(arguments.length==1)
      ctx.fillStyle = "rgb("+c+","+c+","+c+")";
    ctx.fillRect(0,0,w.width,w.height);
  }

  w.ellipse = function(x,y,w,h){
    ctx.fillStyle = gFill;
    ctx.strokeStyle = gStroke;
    ctx.lineWidth = gWeight;
    ctx.save();
    ctx.beginPath();
    ctx.translate(x,y);
    if (w < h) {
      ctx.scale(1, h/w);
      ctx.arc(0,0, w/2, 0,2*Math.PI, false);
    }
    else {
      ctx.scale(w/h, 1);
      ctx.arc(0,0, h/2, 0,2*Math.PI, false);
    }
    ctx.restore();
    ctx.stroke();
    ctx.fill();
  }

  function loop(){
    if(set && w.draw) w.draw();
    else if(!set && w.setup) w.setup();
    requestAnimationFrame(loop);
  }
  loop();
})(window);