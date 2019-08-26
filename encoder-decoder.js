// p5.js script encoded to binary, then into space and tabs. Stored into variable "e". Then decoded back to a string and run using eval.
// Decoder is forked from openprocessing.org/sketch/682404
// Encoder is by jWilliamDunn 2019.

// Sample p5 sketch
var z="setup=_=>	createCanvas(600, 600) \n\
draw=_=> ellipse(mouseX, mouseY, 20, 20)";

// ENCODE
var e=z.split('').map((v)=>{let b=v.charCodeAt(0).toString(2);return Array(8-b.length+1).join("0") + b;}).join('').replace(/0/g,"\t").replace(/1/g," ");

// DECODE (and eval)
d=(p)=>{eval(p.replace(/\t/g,"0").replace(/ /g,"1").replace(/[01]{8}/g, (v) => {return String.fromCharCode(parseInt(v,2))}))}
d(e);