//begin
var page=1,forward=false,backward=false,e=[],f,credit;

function setup() {
  createCanvas(858*2,328*2);
  credit="Designed by Alyce Hoggan and developed by jWilliamDunn of Motivara Corp";
  noStroke();
  textFont('Georgia');

  for(var q=0;q<timeline.length;q++)
    timeline[q].button = Hotspot.createNew(timeline[q]);
}

var timeline = [
  {page:2, text:"John Napier", textPos:[75,121], buttonPos:[75,75], highlight:[75,128,4,20]},
  {page:2, text:"William Oughtred", textPos:[225,121], buttonPos:[225,75], highlight:[225,128,4,20]},
  {page:2, text:"Blaise Pascal", textPos:[285,121], buttonPos:[285,75], highlight:[285,128,4,20]},
  {page:2, text:"Samuel Morland", textPos:[375,121], buttonPos:[375,75], highlight:[375,128,4,20]},
  {page:3, text:"Gottfried Leibniz", textPos:[575,121], buttonPos:[575,75], highlight:[575,128,4,20]},
  {page:2, text:"Early computing 1600 - 1640", textPos:[75,218], buttonPos:[75,240], highlight:[75,185,346,14]},
  {page:2, text:"", textPos:[375,218], buttonPos:[375,240], highlight:[375,185,457,14]},
  {page:2, text:"", textPos:[390,218], buttonPos:[390,271], highlight:[390,181,4,20]},
  {page:2, text:"", textPos:[532,218], buttonPos:[675,271], highlight:[675,181,4,20]},

  {page:3, text:"Philipp-Matthaus Hahn", textPos:[75,121], buttonPos:[75,75], highlight:[75,128,4,20]},
  {page:3, text:"Earl of Stanhope", textPos:[225,121], buttonPos:[225,75], highlight:[225,128,4,20]},
  {page:3, text:"J.H. Mueller", textPos:[285,121], buttonPos:[285,75], highlight:[285,128,4,20]},

  {page:4, text:"Joseph-Marie Jacquard", textPos:[75,121], buttonPos:[75,75], highlight:[75,128,4,20]},
  {page:4, text:"Thomas", textPos:[225,121], buttonPos:[225,75], highlight:[225,128,4,20]},
  {page:4, text:"Charles Babbage", textPos:[285,121], buttonPos:[285,75], highlight:[285,128,4,20]},
  {page:4, text:"Augusta Ada", textPos:[375,121], buttonPos:[375,75], highlight:[375,128,4,20]},
  {page:4, text:"George Boole", textPos:[575,121], buttonPos:[575,75], highlight:[575,128,4,20]},
  {page:4, text:"William S. Burroughs", textPos:[600,121], buttonPos:[600,75], highlight:[600,128,4,20]},
  {page:4, text:"Herman Hollerith", textPos:[625,121], buttonPos:[625,75], highlight:[625,128,4,20]},

  {page:5, text:"Eccles and Jordan", textPos:[75,121], buttonPos:[75,75], highlight:[75,128,4,20]},
  {page:5, text:"The beginnings of the digital age", textPos:[354,218], buttonPos:[354,271], highlight:[354,181,4,20]},
  {page:5, text:"Konrad Zuse", textPos:[360,121], buttonPos:[360,75], highlight:[360,128,4,20]},
  {page:5, text:"Alan Turing", textPos:[422,121], buttonPos:[422,75], highlight:[422,128,4,20]},
  {page:5, text:"Jack Kilby", textPos:[517,121], buttonPos:[517,75], highlight:[517,128,4,20]},
  {page:5, text:"Doug Engelbart", textPos:[556,121], buttonPos:[556,75], highlight:[556,128,4,20]},
  {page:5, text:"Steve Jobs/Steve Wozniak", textPos:[652,121], buttonPos:[652,60], highlight:[652,128,4,20]},
  {page:5, text:"Bill Gates/Paul Allen", textPos:[652,121], buttonPos:[652,75], highlight:[652,128,4,20]},
  {page:5, text:"Tim Berners-Lee", textPos:[715,121], buttonPos:[742,75], highlight:[742,128,4,20]},
];

var Hotspot = {
  createNew: function(v){ // v = timeline object
    var o = {}, p=v.buttonPos;
    o.contains = function(mx,my){
      return (mx>p[0] && my>p[1] && mx<=(p[0]+13) && my<=(p[1]+13))
    };
    o.selected = false;
    o.draw = function(){
      if(o.selected) {
        fill(127,113,92);
        textStyle(NORMAL);
        textSize(14);
        text(v.text, v.textPos[0],v.textPos[1]);
        fill(153,0,51);
        var h=v.highlight;
        rect(h[0],h[1], h[2],h[3]);
        cursor(HAND);
      } else {
        fill(0);
      }
      rect(p[0],p[1], 13,13);
    };
    return o;
  }
};

function draw() {
  scale(2);
  cursor(ARROW);
  displayPage(page);
  if(page<5) {
    // handle the next button
    if (mouseX>833 && mouseY>153 &&
        mouseX<=845 && mouseY<=177) {
      fill(153,0,51);
      cursor(HAND);
      if (!forward && mouseIsPressed) {
        page+=1;
        f = timeline.filter(function(x) { return x.page == page; });
        forward=true;
        setTimeout(function(){forward=false;},500);
        return;
      }
    }
    else {
      fill(166,163,156);
    }
    triangle(833,153, 845,165, 833,177);
  }

  if(page>1) {
    // handle the back button
    if (mouseX>15 && mouseY>153 &&
        mouseX<=27 && mouseY<=177) {
      fill(153,0,51);
      cursor(HAND);
      if (!backward && mouseIsPressed) {
        page-=1;
        f = timeline.filter(function(x) { return x.page == page; });
        backward=true;
        setTimeout(function(){backward=false;},500);
        return;
      }
    }
    else {
      fill(166,163,156);
    }
    triangle(27,153, 15,165, 27,177);
  }
  fill(0,0,255);
  textFont("Arial");
  textSize(5);
  text(parseInt(mouseX)+","+parseInt(mouseY), mouseX,mouseY);
  textFont('Georgia');
}

function renderTimeline() {
  fill(204);
  rect((75-30),130, 3,70);
  rect((75-15),130, 3,70);

  var offset=0;
  for(var i=0;i<5;i++) {
    fill(102);
    rect((75+offset),130, 3,70); //dark (first reference)
    offset+=15;
    for(var j=0;j<9;j++) {
      fill(204);
      rect((75+offset),130, 3,70);
      offset+=15;
    }
  }

  rect(35,101, 790,29); // top bar
  rect(35,199, 790,29); // bot bar

  fill(166,163,156);
  rect(35,144, 790,41); // main timeline

  textSize(14);
  textStyle(ITALIC);
  fill(0);
  text("People", 37,31);
  text("Events", 37,308);

  // brackets on the left
  fill(204);
  rect(15,17, 16,113);
  rect(15,199, 16,113);
  fill(255);
  rect(16,18, 16,111);
  rect(16,200, 16,111);
}

function displayPage(n) {
  var date,i,q;
  background(255);
  textSize(14);
  fill(127,113,92);
  textStyle(NORMAL);
  switch(n) {
    case 1:
    fill(166,163,156);
    rect(35,144, 790,41); // main timeline

    fill(131,128,120);
    textSize(23);
    textStyle(NORMAL);
    text('Do you know your computer history? Explore this interactive timeline!', 50,173);
    fill(255);
    text('Do you know your computer history? Explore this interactive timeline!', 49,172);

    fill(153,0,51);
    rect(146,35, 1,109); // red lines
    rect(300,185, 1,113);
    rect(622,63, 1,81);
    triangle(833,153, 845,165, 833,177); // forward button

    fill(0);
    textSize(11);
    textStyle(BOLD);
    text('How to interpret this timeline:', 158,43);
    textStyle(NORMAL);
    text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec nulla', 158,65);
    text('vitae tortor luctus commodo finibus eget nibh. Proin nec arcu mi. Nullam eget', 158,80);
    text('eros sed mauris aliquam blandit eu pellentesque ipsum. Curabitur faucibus', 158,95);
    text('sollicitudin facilisis. Vivamus fermentum.)', 158,110);

    text('lorem vel augue consectetur, vitae tempor dolor fermentum.', 312,253);
    text('Integer sed dolor sed purus rutrum rutrum. Nulla id volutpat', 312,(253+15));
    text("nibh. Maecenas sed purus sapien. Ut vitae purus arcu. Aenean", 312,(253+30));
    text('dignissim turpis et convallis.', 312,(253+45));


    text('Phasellus et maximus dui,', 635,72);
    text('vulputate id egestas nec.', 635,(72+15));
    text('Phasellus sed quam non', 635,(72+30));
    text('ex auctor lobortis id arcu', 635,(72+45));
    text('facilisis erat in pharetra.', 635,(72+60));
    return;
    
    case 2:
    date=1600;
    break;

    case 3:
    date=1700;
    break;

    case 4:
    date=1800;
    break;

    case 5:
    date=1900;
    break;
  }
  renderTimeline();

  textSize(24);
  textStyle(NORMAL);
  fill(131,128,120);
  for(i=0;i<5;i++)
    text(Math.abs(date+i*20), (70+i*150),173);
  fill(255);
  for(i=0;i<5;i++)
    text(Math.abs(date+i*20), (69+i*150),172);

  for(q=0;q<f.length;q++) {
    f[q].button.selected=f[q].button.contains(mouseX,mouseY);
    f[q].button.draw();
  }

}
//end