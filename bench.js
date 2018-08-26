// A performance test of object creation
// comparing old-style class (ES5), new-style class (ES6),
// and BlackScript Ex Nihilo.
// See also: http://gabordemooij.com/index.php?p=/blackscript
// Below is the node.js version.
// Browser version: https://jsperf.com/ex-nihilo

var Benchmark = require('benchmark');

Benchmark.prototype.setup = function() {

  const pageRecord = {
    createNew: function(id, pgNum, svg) {
      var o = {
        id: id,
        pageNumber: pgNum,
        size: 0,
        svg: svg,
        img: '',
        isImgLoading: false,
        isImgLoaded: false,
        isSvgLoading: false,
        isSvgLoaded: false,
        renderPlaceholder: true,
        renderSvg: false,
        renderImg: false,
        inlineSvg: ''
      };
      return o;
    }
  }
  
  class pageClass {
    constructor ({
      id,
      pageNumber,
      svg
    }) {
      this.id = id
      this.pageNumber = pageNumber
      this.svg = svg
      this.size = 0
      this.img = ''
      this.isImgLoading = false
      this.isImgLoaded = false
      this.isSvgLoading = false
      this.isSvgLoaded = false
      this.renderPlaceholder = true
      this.renderSvg = false
      this.renderImg = false
      this.inlineSvg = ''
    }
  }
  
  function pageFunction(id, pageNumber, svg) {
    this.id = id
    this.pageNumber = pageNumber
    this.svg = svg
    this.size = 0
    this.img = ''
    this.isImgLoading = false
    this.isImgLoaded = false
    this.isSvgLoading = false
    this.isSvgLoaded = false
    this.renderPlaceholder = true
    this.renderSvg = false
    this.renderImg = false
    this.inlineSvg = ''
  }        
};
Benchmark.prototype.teardown = function() {
  pages = null;     
  };  

var suite = new Benchmark.Suite;

// add tests
suite
.add('OldStyleClass', function() {
  const pages = new Array(100)
  for (let i = 0, max = 100; i < max; i++) {
    const p = new pageFunction(
      i,
      i + 1,
      '/viewer/' + (i + 1) + '.svg'
    )
    pages[i] = p
  }
})
.add('NewStyleClass', function() {
  const pages = new Array(100)
  for (let i = 0, max = 100; i < max; i++) {
    const p = new pageClass({
      id: i,
      pageNumber: i + 1,
      svg: '/viewer/' + (i + 1) + '.svg'
    })
    pages[i] = p
  }
})
.add('Ex Nihilo', function() {
  const pages = new Array(100)
  for (let i = 0, max = 100; i < max; i++) {
    const p = pageRecord.createNew(
      i,
      i + 1,
      '/viewer/' + (i + 1) + '.svg'
    )
    pages[i] = p
  }
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });