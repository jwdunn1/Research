// jWilliamDunn 20191215
function annulus(inner, outer, angle, segs){
	if(segs===undefined)segs=20;
	if(segs<5)segs=5;
	beginShape();
	for(var i=0; i<=segs; i++)
		vertex(outer*Math.cos(angle*i/segs), outer*Math.sin(angle*i/segs));
	for(i=segs; i>=0; i--)
		vertex(inner*Math.cos(angle*i/segs), inner*Math.sin(angle*i/segs));
	endShape(CLOSE);
}