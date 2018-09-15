//Neural network in 12 lines of JavaScript, jump to line 25

// First, load a library to do some simple matrix maths like NumPy
var libLoaded=false;
function handleLoad() {
  initNN();         // Once the library is loaded, initialize the NN
  libLoaded=true;   // and begin convergence
}
if (!window.hasOwnProperty('Matrix')) {
  var fileref = document.createElement('script');
  fileref.setAttribute("type", "text/javascript");
  fileref.setAttribute("src", "https://rawgit.com/jwdunn1/TinyMatrix/master/matrix.js");
  document.head.appendChild(fileref);
  fileref.onload = handleLoad;
}

// meanwhile, while that loads, setup the processing environment
function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    background(0);
    frameRate(144);
}

///////////////////////////////////////////////////////////////////////////////
// Below is the actual neural network code
// translated from Andrew Trask's 11 lines of Python
//iamtrask.github.io/2015/07/12/basic-python-network/
// to visualize the network in action, the draw function moves a rectangle
var sig= function(x){return 1/(1+Math.exp(-x));};   //sigmoid function        1
var sigD= function(x){return x*(1-x);};             //and derivative          2
var l0, l1, l2, l2_delta, x, y, syn0, syn1;         //some variables          3
function initNN() {  // group into a callable init function
  x= new Matrix([[0,0,1],[0,1,1],[1,0,1],[1,1,1]]); //input                   4
  y= new Matrix([[0],[1],[1],[0]]);                 //ideal output            5
  syn0= Matrix.randomize(3,4);                      //synapse 0               6
  syn1= Matrix.randomize(4,1);                      //synapse 1               7
}

var draw= function() {
  if (libLoaded) {
    for (var i=0; i<10; i++) { // iterate a few times per draw cycle
      l0= x; l1= l0.dot(syn0).map(sig);             //forward propagation     8
      l2= l1.dot(syn1).map(sig);                    // "       "              9
      l2_delta= y.sub(l2).mul(l2.map(sigD));        //back propagation       10
      syn1= syn1.add(l1.T().dot(l2_delta));         //update weights         11
      syn0= syn0.add(l0.T().dot(l2_delta.dot(syn1.T()).mul(l1.map(sigD))));//12
    }

    //visualize l2 (the output layer) trends toward the ideal output
    // the rect should move toward the target on the screen and size to 200x200
    //background(255);
    fill(66, 80, 133, 19);
    rect((windowWidth/2-100)*(1-l2.$[0][0]),(windowHeight/2-100)*(1-l2.$[3][0]),200*l2.$[1][0],200*l2.$[2][0]);
  }
  
  noFill();
  stroke(20, 20, 133, 20);
  rect((windowWidth/2-100),(windowHeight/2-100),200,200); //target visualized
  noStroke();

  fill(255);rect(0,0,200,20);
  fill(0);text("Frames: "+frameCount, 10, 15);
  if (frameCount>40000) {noLoop();} // no need to go on forever
};