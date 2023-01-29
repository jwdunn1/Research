// a minimal implementation of the p5js framework
// rendering to either a canvas or svg element
// hand-coded by jWilliamDunn
function p5(sketch, canvid) {

(function (w) {
  var version="1.2.0",ctx,svg='http://www.w3.org/2000/svg',gT={},
      set=false,gdoStroke=true,gdoFill=true,gStrokeCap='round',
      gfillSet=false,gstrokeSet=false,gStk=[],
      gFill="#fff",gStroke="#000",gWeight=1,looping=true,vertices=[],
      gtextSize=12,gtextFont='sans-serif',gtextStyle=0,canv,handleEvt;
  w.windowWidth = w.innerWidth, w._pixelDensity=1,
  w.windowHeight = w.innerHeight,
  w.NORMAL = 0, w.ITALIC = 1, w.BOLD = 2, w.CLOSE = 'close',
  w.ROUND = 'round', w.SQUARE = 'butt', w.PROJECT = 'square',
  w.ARROW = 'default', w.HAND = 'pointer', w.frameCount=1,
  w.mouseIsPressed=false;

  handleEvt = function(e) {
    if (e.type == "mousedown") {
      var rect = canv.getBoundingClientRect();
      w.mouseX = (e.x-rect.left)*w.width/rect.width;
      w.mouseY = (e.y-rect.top)*w.height/rect.height;
      w.mouseIsPressed=true;
      return;
    }
    if (e.type == "touchstart") {
      var rect = canv.getBoundingClientRect();
      w.mouseX = (e.touches[0].clientX-rect.left)*w.width/rect.width;
      w.mouseY = (e.touches[0].clientY-rect.top)*w.height/rect.height;
      w.mouseIsPressed=true;
      return;
    }
    if (e.type == "touchmove") {
      var rect = canv.getBoundingClientRect();
      w.mouseX = (e.touches[0].clientX-rect.left)*w.width/rect.width;
      w.mouseY = (e.touches[0].clientY-rect.top)*w.height/rect.height;
      if(w.mouseMoved) w.mouseMoved();
      e.preventDefault();
      return;
    }
    if (e.type == "mouseup" || e.type == "touchend") {
      w.mouseIsPressed=false;
      return;
    }
    if (e.type == "mousemove") {
      var rect = canv.getBoundingClientRect();
      w.mouseX = (e.x-rect.left)*w.width/rect.width;
      w.mouseY = (e.y-rect.top)*w.height/rect.height;
      if(w.mouseMoved) w.mouseMoved();
    }
  };

  w.createCanvas = function(width,height) {
    var c = document.getElementById(canvid);
    c.s=c.setAttribute;
    c.s("width", width);
    c.s("height", height);
    if(c.nodeName=='svg'){
      c.s("preserveAspectRatio","xMinYMin meet");
      c.s("viewBox","0 0 "+width+" "+height);
      w.width = c.width.baseVal.value;
      w.height = c.height.baseVal.value;
      gT = {x:0,y:0,r:0};
    } else {
      w.drawingContext = ctx = c.getContext('2d');
      w.width = ctx.canvas.width;
      w.height = ctx.canvas.height;
      ctx.fillStyle = gFill;
      ctx.strokeStyle = gStroke;
      ctx.lineWidth = gWeight;
      ctx.lineCap = gStrokeCap;
    }
    w.mouseX = w.width/2, w.mouseY = w.height/2;
    c.a=c.addEventListener;
    c.a("mousemove", handleEvt);
    c.a("mousedown", handleEvt);
    c.a("mouseup", handleEvt);
    c.a("touchstart", handleEvt);
    c.a("touchmove", handleEvt);
    c.a("touchend", handleEvt);
    canv = c;
    set = true;
    return c;
  };
  w.pixelDensity = function(val) {
    if(canv.nodeName=='svg') console.log("'pixelDensity' unsupported for svg");
    else {
      w._pixelDensity = val;
      w.resizeCanvas(w.width, w.height, true);
    }
  };
  w.resizeCanvas = function(wide,high, noRedraw) {
    w.width = wide;
    w.height = high;
    canv.setAttribute("width", wide*w._pixelDensity);
    canv.setAttribute("height", high*w._pixelDensity);
    canv.style.width = wide+"px";
    //canv.style.height = high+"px";
    if(canv.nodeName!='svg'){
      ctx.fillStyle = gFill;
      ctx.strokeStyle = gStroke;
      ctx.lineWidth = gWeight;
      ctx.lineCap = gStrokeCap;
      ctx.scale(w._pixelDensity,w._pixelDensity); // necessary???
    }
  };

  w.scale = function(x,y) {
    if(canv.nodeName=='svg') console.log("'scale' unsupported for svg");
    else {
      if(arguments.length==1)y=x;
      ctx.scale(x,y);
    }
  };

  w.clear = function() {
    if(canv.nodeName=='svg') console.log("'clear' unsupported for svg");
    else ctx.clearRect(0,0, w.width,w.height);
  };

  w.background = function(r,g,b,a) {
    if(canv.nodeName=='svg') {
      var fillB, e=document.createElementNS(svg,'rect');
      if(arguments.length==1)
        fillB='string'===typeof r?r:"rgb("+r+","+r+","+r+")";
      if(arguments.length==2) fillB="rgba("+r+","+r+","+r+","+g/255+")";
      if(arguments.length==3) fillB="rgb("+r+","+g+","+b+")";
      if(arguments.length==4) fillB="rgba("+r+","+g+","+b+","+a/255+")";
      e.s=e.setAttribute;
      e.s("x",0);e.s("y",0);
      e.s("width",w.width);e.s("height",w.height);
      e.s("fill",fillB);
      canv.appendChild(e);
      return e;
    } else {
      ctx.save();
      if(arguments.length==1) ctx.fillStyle='string'===typeof r?r:"rgb("+r+","+r+","+r+")";
      if(arguments.length==2) ctx.fillStyle = "rgba("+r+","+r+","+r+","+g/255+")";
      if(arguments.length==3) ctx.fillStyle = "rgb("+r+","+g+","+b+")";
      if(arguments.length==4) ctx.fillStyle = "rgba("+r+","+g+","+b+","+a/255+")";
      ctx.fillRect(0,0,w.width,w.height);
      ctx.restore();
    }
  };

  w.fill = function(r,g,b,a) {
    if(arguments.length==1) gFill='string'===typeof r?r:"rgb("+r+","+r+","+r+")";
    if(arguments.length==2) gFill="rgba("+r+","+r+","+r+","+g/255+")";
    if(arguments.length==3) gFill="rgb("+r+","+g+","+b+")";
    if(arguments.length==4) gFill="rgba("+r+","+g+","+b+","+a/255+")";
    gdoFill=true;gfillSet=true;
    if(canv.nodeName!='svg') ctx.fillStyle = gFill;
  };

  w.noFill = function() {
    gdoFill = false;
  };

  w.stroke = function(r,g,b,a) {
    if(arguments.length==1) gStroke='string'===typeof r?r:"rgb("+r+","+r+","+r+")";
    if(arguments.length==2) gStroke="rgba("+r+","+r+","+r+","+g/255+")";
    if(arguments.length==3) gStroke="rgb("+r+","+g+","+b+")";
    if(arguments.length==4) gStroke="rgba("+r+","+g+","+b+","+a/255+")";
    gdoStroke=true;gstrokeSet=true;
    if(canv.nodeName!='svg') ctx.strokeStyle = gStroke;
  };

  w.strokeWeight = function(w) {
    gWeight = w;
    gdoStroke = true;
    if(canv.nodeName!='svg') ctx.lineWidth = gWeight;
  };

  w.strokeCap = function(val) {
    gStrokeCap = val;
    if(canv.nodeName!='svg') ctx.lineCap = val;
  };

  w.noStroke = function() {
    //gWeight = 0;
    gdoStroke = false;
  };

  w.cursor = function(c) {
    canv.style.cursor = c;
  };

  w.loadImage = function(file) {
    if(canv.nodeName=='svg') return file;
    var img = new Image();
    img.src = file;
    return img;
  };
  w.image = function(img, x,y) {
    if(canv.nodeName=='svg'){
      var e=document.createElementNS(svg,'image');
      e.s=e.setAttribute;e.s("x",x);e.s("y",y);e.s("href",img);
      canv.appendChild(e);
      return e;
    }
    else ctx.drawImage(img, x,y);
  };

  w.shearX = function(r) {
    if(canv.nodeName=='svg') console.log("'shearX' unsupported for svg");
    else ctx.transform(1,0,Math.tan(r),1,0,0);
  };

  w.random = function(l,h) {
    var r=Math.random();
    return void 0===l?r:void 0===h?l instanceof Array?l[Math.floor(r*l.length)]:r*l:t*(h-l)+l;
  };
  w.lerp = function(init,dest, qty) {return init + qty*(dest-init);};
  w.sin=Math.sin, w.cos=Math.cos, w.atan2=Math.atan2,
  w.PI=Math.PI, w.TAU=2*Math.PI, w.floor=Math.floor;
  w.radians = function(a) {return a*Math.PI/180;};
  w.degrees = function(r) {return r*180/Math.PI;};

  w.translate = function(x,y) {
    if(canv.nodeName=='svg') {
      gT.x+=x*Math.cos(gT.r)-y*Math.sin(gT.r);
      gT.y+=x*Math.sin(gT.r)+y*Math.cos(gT.r);
    }
    else ctx.translate(x,y);
  };
  w.rotate = function(r) {
    if(canv.nodeName=='svg') gT.r+=r;
    else ctx.rotate(r);
  };

  w.push = function() {
    if(canv.nodeName=='svg') gStk.push({gTx:gT.x,gTy:gT.y,gTr:gT.r,
      gfs:gfillSet,gds:gdoStroke,gdf:gdoFill,
      gss:gstrokeSet,gf:gFill,gs:gStroke,gw:gWeight,
      gts:gtextSize,gtf:gtextFont,gst:gtextStyle});
    else {
      ctx.save();
      gStk.push({gfs:gfillSet,gds:gdoStroke,gdf:gdoFill,
        gss:gstrokeSet,gf:gFill,gs:gStroke,gw:gWeight,
        gts:gtextSize,gtf:gtextFont,gst:gtextStyle});
    }
  };

  w.pop = function() {
    var o=gStk.pop();
    gfillSet=o.gfs;gdoStroke=o.gds;gdoFill=o.gdf;
    gstrokeSet=o.gss;gFill=o.gf,gStroke=o.gs,gWeight=o.gw;
    gtextSize=o.gts,gtextFont=o.gtf,gtextStyle=o.gst;
    if(canv.nodeName=='svg') gT.x=o.gTx,gT.y=o.gTy,gT.r=o.gTr;
    else ctx.restore();
  };

  // TEXT
  w.textSize = function(s) {
    gtextSize = s;
  };

  w.textStyle = function(s) {
    gtextStyle = s;
  };

  w.textFont = function(s) {
    gtextFont = s;
  };

  w.text = function(s, x,y) {
    if(canv.nodeName=='svg') {
      var e=document.createElementNS(svg,'text');
      e.style.fontSize=gtextSize+"px";
      e.style.fontFamily=gtextFont;
      e.s=e.setAttribute;e.s("x",x);e.s("y",y);e.innerHTML=s;
      if(gdoStroke&&gstrokeSet){e.s("stroke-width",gWeight);e.s("stroke",gStroke);}
      e.s("fill",gdoFill?(gfillSet?gFill:"#000"):"none");
      e.style.rotate=gT.r+"rad";
      e.style.translate=gT.x+"px "+gT.y+"px";
      canv.appendChild(e);
      return e;
    } else {
      ctx.font = gtextSize+"px "+gtextFont;
      if(gtextStyle>0) ctx.font = (gtextStyle==1? "italic " : "bold " )+ctx.font;
      if(gdoStroke&&gstrokeSet)ctx.strokeText(s, x,y);
      ctx.save();
        if(!gfillSet)ctx.fillStyle = "#000";
        if(gdoFill)ctx.fillText(s, x,y);
      ctx.restore();
    }
  };

  // PATHS
  w.ellipse = function(x,y, w,h) {
    if(canv.nodeName=='svg') {
      var e=document.createElementNS(svg,'ellipse');
      e.s=e.setAttribute;
      e.s("cx",x);e.s("cy",y);e.s("rx",w/2);e.s("ry",h/2);
      if(gdoStroke){e.s("stroke-width",gWeight);e.s("stroke",gStroke);}
      e.s("fill",gdoFill?gFill:"none");
      e.style.rotate=gT.r+"rad";
      e.style.translate=gT.x+"px "+gT.y+"px";
      canv.appendChild(e);
      return e;
    } else {
      ctx.beginPath();
      ctx.ellipse(x,y, w/2,h/2, 0,0,2*Math.PI);
      if(gdoFill)ctx.fill();
      if(gdoStroke)ctx.stroke();
    }
  };

  w.circle = function(x,y, d) {
    if(canv.nodeName=='svg') {
      var e=document.createElementNS(svg,'circle');
      e.s=e.setAttribute;
      e.s("cx",x);e.s("cy",y);e.s("r",d/2);
      if(gdoStroke){e.s("stroke-width",gWeight);e.s("stroke",gStroke);}
      e.s("fill",gdoFill?gFill:"none");
      e.style.rotate=gT.r+"rad";
      e.style.translate=gT.x+"px "+gT.y+"px";
      canv.appendChild(e);
      return e;
    } else w.ellipse(x,y, d,d);
  }; // or use arc?

  w.line = function(x1,y1, x2,y2) {
    if(canv.nodeName=='svg') {
      var e=document.createElementNS(svg,'line');
      e.s=e.setAttribute;
      e.s("x1",x1);e.s("y1",y1);
      e.s("x2",x2);e.s("y2",y2);
      e.s("stroke-width", gWeight);
      e.s("stroke",gStroke);
      e.s("stroke-linecap",gStrokeCap)
      e.style.rotate=gT.r+"rad";
      e.style.translate=gT.x+"px "+gT.y+"px";
      canv.appendChild(e);
      return e;
    } else {
      ctx.beginPath();
      ctx.moveTo(x1,y1);
      ctx.lineTo(x2,y2);
      if(gdoStroke)ctx.stroke();
    }
  };

  w.rect = function(x,y, w,h) {
    if(canv.nodeName=='svg') {
      var e=document.createElementNS(svg,'rect');
      e.s=e.setAttribute;
      e.s("x",x);e.s("y",y);
      e.s("width",w);e.s("height",h);
      if(gdoStroke){e.s("stroke-width",gWeight);e.s("stroke",gStroke);}
      e.s("fill",gdoFill?gFill:"none");
      e.style.rotate=gT.r+"rad";
      e.style.translate=gT.x+"px "+gT.y+"px";
      canv.appendChild(e);
      return e;    
    } else {
      ctx.beginPath();
      ctx.rect(x,y, w,h);
      if(gdoFill)ctx.fill();
      if(gdoStroke)ctx.stroke();
    }
  };

  w.triangle = function(x1,y1, x2,y2, x3,y3) {
    w.beginShape();
    w.vertex(x1,y1);w.vertex(x2,y2);w.vertex(x3,y3);
    return w.endShape(w.CLOSE);
  };

  w.quad = function(x1,y1, x2,y2, x3,y3, x4,y4) {
    w.beginShape();
    w.vertex(x1,y1);w.vertex(x2,y2);
    w.vertex(x3,y3);w.vertex(x4,y4);
    return w.endShape(w.CLOSE);
  };

  w.beginShape = function() {vertices = [];};
  w.vertex = function(x,y){vertices.push([x,y]);};
  w.endShape = function(mode) {
    var v, i, numVerts;
    if (mode===w.CLOSE) vertices.push(vertices[0]);
    numVerts = vertices.length;
    if(canv.nodeName=='svg') {
      var e=document.createElementNS(svg,'path');
      path = "M"+vertices[0][0]+" "+vertices[0][1]+" ";
      for (i = 1; i < numVerts; i++) {
        v = vertices[i];
        path = path + "L"+v[0]+" "+v[1]+" ";
      }
      if(mode===w.CLOSE) path = path + "Z";
      e.s=e.setAttribute;
      e.s("d",path);
      if(gdoStroke){
        e.s("stroke-width", gWeight);
        e.s("stroke", gStroke);}
      e.s("fill", gdoFill?gFill:"none");
      e.style.rotate=gT.r+"rad";
      e.style.translate=gT.x+"px "+gT.y+"px";
      canv.appendChild(e);
      return e;
    } else {
      ctx.beginPath();
      ctx.moveTo(vertices[0][0], vertices[0][1]);
      for (i = 1; i < numVerts; i++) {
        v = vertices[i];
        ctx.lineTo(v[0],v[1]);
      }
      if(mode===w.CLOSE)ctx.closePath();
      if(gdoFill)ctx.fill();
      if(gdoStroke)ctx.stroke();
    }
  };

  w.loop = function() {if(looping)return;looping=true;loop();};
  w.noLoop = function() {looping=false;};
  function loop() { if(!looping)return;
    if(set && w.draw) {
      if(canv.nodeName!='svg') ctx.setTransform(w._pixelDensity,0,0,w._pixelDensity,0,0);
      w.draw();
      w.frameCount++;
      }
    else if(!set && w.setup) {w.setup();if(w.draw===undefined)looping=false;}
    requestAnimationFrame(loop);
  }
  if(typeof w === "function")w(w); // instantiate non-global mode
  loop();
})(sketch);

}
//create a global sketch instance
new p5(window, "_");