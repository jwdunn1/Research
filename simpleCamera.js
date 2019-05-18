// SimpleCamera from Thomas Diewald
class Damp{
  constructor(a,b,c,d){
    this.val_reset=a,
    this.val_start=a,
    this.val_now=a,
    this.val_end=a,
    this.limit=d,
    this.speed=b,
    this.damp=c,
    this.state=null
  }
  active(){return null!==this.state}
  start(a){this.state=a,this.val_start=this.val_now}
  drag(a){
    if(this.active()){
      var b=this.state-a;
      this.val_end=this.val_start+b*this.speed,
      this.limit&&(this.val_end=min(max(this.val_end,this.limit[0]),this.limit[1]))
    }
  }
  end(){this.state=null}
  update(){return this.val_now=this.val_end*this.damp+this.val_now*(1-this.damp),this.val_now}
  reset(a){this.val_end=a===void 0?this.val_reset:a}
}

class SimpleCamera{
  constructor(a){
    this.parent=a,
    this.active=!0,
    this.rx=new Damp(0,+.01,.07),
    this.ry=new Damp(0,+.01,.07),
    this.zoom=new Damp(1e3,-10,.07,[400,1e4]);
    var b=this;
    a.addEventListener("dblclick",function(){b.reset()}),
    a.addEventListener("mousedown",function(a){0===a.button&&b.startOrbit(),2===a.button&&b.startZoom()}),
    a.addEventListener("mouseup",function(a){0===a.button&&b.endOrbit(),2===a.button&&b.endZoom()}),
    a.registerMethod("pre",function(){b.active&&(b.drag(),b.update())})
  }
  startOrbit(){this.rx.start(this.parent.mouseY),this.ry.start(this.parent.mouseX)}
  startZoom(){this.zoom.start(this.parent.mouseY)}
  drag(){this.rx.drag(this.parent.mouseY),this.ry.drag(this.parent.mouseX),this.zoom.drag(this.parent.mouseY)}
  endOrbit(){this.rx.end(),this.ry.end()}
  endZoom(){this.zoom.end()}
  activate(a){this.active=a}
  reset(){this.rx.reset(),this.ry.reset(),this.zoom.reset()}
  update(){this.rx.update(),this.ry.update(),this.zoom.update()}
  apply(a){a=a||this.parent,a.translate(0,0,-this.zoom.val_now),a.rotateX(this.rx.val_now),a.rotateZ(this.ry.val_now)}
}



