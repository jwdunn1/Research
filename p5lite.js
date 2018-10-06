/* a minimal implementation of the p5js framework -
   enough to get the following basic sketch operational

function setup() {
  createCanvas(windowWidth,windowHeight);
  textSize(100);
  textFont('Georgia');
}

function draw() {
  background(31);
  
  strokeWeight(1);
  fill(255);
  stroke(127);
  text('Stroked', 10, 80);

  fill(0);
  stroke(255,0,0);
  strokeWeight(4);
  rect(mouseX+100,mouseY, 100,100);

  fill(255);
  noStroke();
  text('Unstroked', width/2-200,height/2);

  fill(0);
  stroke(255,0,0);
  strokeWeight(4);
  rect(mouseX,mouseY, 100,100);

  fill(0);
  noStroke();
  rect(mouseX+98, mouseY+2, 4, 100-4);
}

*/

(function (w) {
  var ctx,set=false,gdoStroke=true,gdoFill=true,
      gFill="#fff",gStroke="#000",gWeight=1,
      gtextSize=12,gtextFont='san-serif',gtextStyle=0;
  w.windowWidth = w.innerWidth,
  w.windowHeight = w.innerHeight,
  w.NORMAL = 0, w.ITALIC = 1, w.BOLD = 2,
  w.ARROW = 'default', w.HAND = 'pointer',
  w.mouseIsPressed=false;

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
    c.addEventListener("mousedown", handleEvt);
    c.addEventListener("mouseup", handleEvt);
    set = true;
  };

  function handleEvt(e){
    if (e.type == "mousemove") {w.mouseX=e.x; w.mouseY=e.y; if(w.mouseMoved)w.mouseMoved();}
    if (e.type == "mousedown") w.mouseIsPressed=true;
    if (e.type == "mouseup") w.mouseIsPressed=false;
  }

  w.scale = function(x,y){
    if(arguments.length==1)y=x;
    ctx.scale(x,y);
  };

  w.background = function(r,g,b){
    if(arguments.length==1)
      ctx.fillStyle = "rgb("+r+","+r+","+r+")";
    if(arguments.length==3)
      ctx.fillStyle = "rgb("+r+","+g+","+b+")";
    ctx.fillRect(0,0,w.width,w.height);
  };

  w.textSize = function(s){
    gtextSize = s;
  };

  w.textStyle = function(s){
    gtextStyle = s;
  };

  w.textFont = function(s){
    gtextFont = s;
  };

  w.text = function(s, x,y){
    ctx.font = gtextSize+"px "+gtextFont;
    if(gtextStyle>0) ctx.font = (gtextStyle==1? "italic " : "bold " )+ctx.font;
    ctx.fillStyle = gFill;
    ctx.strokeStyle = gStroke;
    ctx.lineWidth = gWeight;
    if(gdoStroke)ctx.strokeText(s, x,y);
    if(gdoFill)ctx.fillText(s, x,y);
  };

  w.fill = function(r,g,b){
    if(arguments.length==1)
      gFill = "rgb("+r+","+r+","+r+")";
    if(arguments.length==3)
      gFill = "rgb("+r+","+g+","+b+")";
    gdoFill = true;
  };

  w.noFill = function(){
    gdoFill = false;
  };

  w.stroke = function(r,g,b){
    if(arguments.length==1)
      gStroke = "rgb("+r+","+r+","+r+")";
    if(arguments.length==3)
      gStroke = "rgb("+r+","+g+","+b+")";
    gdoStroke = true;
  };

  w.strokeWeight = function(w){
    gWeight = w;
    gdoStroke = true;
  };

  w.noStroke = function(){
    gWeight = 0;
    gdoStroke = false;
  };

  w.cursor = function(c){
    _.style.cursor = c;
  };

  w.rect = function(x,y,w,h){
    var offset = (gWeight%2==0)?0:0.5;
    ctx.fillStyle = gFill;
    ctx.strokeStyle = gStroke;
    ctx.lineWidth = gWeight;
    ctx.save();
    ctx.beginPath();
    ctx.translate(x,y);
    ctx.rect(offset,offset, w,h);
    ctx.restore();
    if(gdoFill)ctx.fill();
    if(gdoStroke)ctx.stroke();
  };

  w.triangle = function(x1,y1, x2,y2, x3,y3){
    ctx.fillStyle = gFill;
    ctx.strokeStyle = gStroke;
    ctx.lineWidth = gWeight;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x3,y3);
    ctx.closePath();
    ctx.restore();
    if(gdoFill)ctx.fill();
    if(gdoStroke)ctx.stroke();
  };

  function loop(){
    if(set && w.draw) {ctx.setTransform(1,0,0,1,0,0);w.draw();}
    else if(!set && w.setup) w.setup();
    requestAnimationFrame(loop);
  }
  loop();
})(window);