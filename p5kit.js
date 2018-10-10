// a minimal implementation of the p5js framework
// hand-coded by jWilliamDunn
(function (w) {
  var ctx,set=false,gdoStroke=true,gdoFill=true,
      gFill="#fff",gStroke="#000",gWeight=1,
      gtextSize=12,gtextFont='san-serif',gtextStyle=0,canv;
  w.windowWidth = w.innerWidth,
  w.windowHeight = w.innerHeight,
  w.NORMAL = 0, w.ITALIC = 1, w.BOLD = 2,
  w.ARROW = 'default', w.HAND = 'pointer',
  w.mouseIsPressed=false;

  w.createCanvas = function(width,height){
    var c = document.getElementById('_');
    c.setAttribute("width", width);
    c.setAttribute("height", height);
    ctx = c.getContext('2d');
    w.width = ctx.canvas.width;
    w.height = ctx.canvas.height;
    w.mouseX = 0, w.mouseY = 0;
    c.addEventListener("mousemove", handleEvt);
    c.addEventListener("mousedown", handleEvt);
    c.addEventListener("mouseup", handleEvt);
    c.addEventListener("touchstart", handleEvt);
    c.addEventListener("touchend", handleEvt);
    canv = c;
    set = true;
  };

  function handleEvt(e){
    if (e.type == "mousedown") {
      var rect = canv.getBoundingClientRect();
      w.mouseX = e.x-rect.left;
      w.mouseY = e.y-rect.top;
      w.mouseIsPressed=true;
      console.log("mousedown",w.mouseX,w.mouseY);
      return;
    }
    if (e.type == "touchstart") {
      var rect = canv.getBoundingClientRect();
      w.mouseX = e.touches[0].clientX-rect.left;
      w.mouseY = e.touches[0].clientY-rect.top;
      w.mouseIsPressed=true;
      console.log("touchstart",w.mouseX,w.mouseY);
      return;
    }
    if (e.type == "mouseup" || e.type == "touchend") {
      w.mouseIsPressed=false;
      console.log("mouseup/touchend",w.mouseX,w.mouseY);
      return;
    }
    if (e.type == "mousemove") {
      var rect = canv.getBoundingClientRect();
      w.mouseX = e.x-rect.left;
      w.mouseY = e.y-rect.top;
      if(w.mouseMoved) w.mouseMoved();
      console.log("mousemove",w.mouseX,w.mouseY);
    }
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