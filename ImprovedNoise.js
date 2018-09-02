// http://mrl.nyu.edu/~perlin/noise
// forked from: https://github.com/mrdoob/three.js/blob/master/examples/js/ImprovedNoise.js
// random function from: jsfiddle.net/Llorx/z2y097ad
var perlin = function(fl) {
  function t(a) {
    return a * a * a * (a * (6 * a - 15) + 10)
  }
  function h(a, c, b) {
    return c + a * (b - c)
  }
  function g(a, b, d, e) {
      a &= 15;
      var c = 8 > a ? b : d;
      b = 4 > a ? d : 12 == a || 14 == a ? b : e;
      return (0 == (a & 1) ? c : -c) + (0 == (a & 2) ? b : -b)
  }
  var b = [], sd;
  function random(){do{var b=1E4*Math.sin(sd++);
    b-=fl(b)}while(.15>b||.9<b);
    return(b-.15)/.75;
  }
  var o = {
    seed: function(s) {
      var r = (s === undefined?Math.random:(sd=s,random));
      for (var i = 0; 256 > i ; i ++) b[i] = i;
      for (i = 255; 0 < i; i--) {
        var j = fl(r() * (i + 1)), z = b[i];
        b[i] = b[j]; b[j] = z;
      }
      for (var f = 0; 256 > f; f++) b[256 + f] = b[f];
    },
    noise: function(a, c, d) {
      var e = fl(a),
          k = fl(c),
          m = fl(d),
          n = e & 255, p = k & 255, l = m & 255;
      a -= e; c -= k; d -= m;
      e = a - 1; k = c - 1; m = d - 1;
      var f = t(a), w = t(c), q = b[n] + p, x = b[q] + l;
      q = b[q + 1] + l;
      p = b[n + 1] + p;
      n = b[p] + l;
      l = b[p + 1] + l;
      return h(t(d), h(w, h(f, g(b[x], a, c, d), g(b[n], e, c, d)), h(f, g(b[q], a, k, d), g(b[l], e, k, d))), h(w, h(f, g(b[x + 1], a, c, m), g(b[n + 1], e, c, d - 1)), h(f, g(b[q +
          1], a, k, m), g(b[l + 1], e, k, m))))
    }
  };
  o.seed();
  return o;
}(Math.floor);