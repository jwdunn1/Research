(function() {
  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d');

  // Event handler to resize the canvas when the document view is changed
  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Redraw everything after resizing the window
    drawStuff(); 
  }
  resizeCanvas();

  function drawStuff() {
    // Do drawing here
    context.strokeRect(10,10, 230,100);
    context.font = '16px serif';
    context.fillText('The canvas is the blue', 30, 30);
    context.fillText('background color seen here.', 30, 50);
    context.fillText('It will resize if the window', 30, 70);
    context.fillText('size is adjusted.', 30, 90);
  }
})();