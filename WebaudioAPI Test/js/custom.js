function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}


BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}

window.onload = init;
var context;
var bufferLoader;
var sources = new Array();

function init() {
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();

  bufferLoader = new BufferLoader(context, [
      'sounds/01.wav',
      'sounds/02.wav',
      'sounds/03.wav',
  ], finishedLoading);

  bufferLoader.load();
}

function finishedLoading(bufferList) {
  // Create two sources and play them both together.
  sources[0] = context.createBufferSource();
  sources[1] = context.createBufferSource();
  sources[2] = context.createBufferSource();

  sources[0].buffer = bufferList[0];
  sources[1].buffer = bufferList[1];
  sources[2].buffer = bufferList[2];

  sources[0].connect(context.destination);
  sources[1].connect(context.destination);
  sources[2].connect(context.destination);
}

$(document).on('click', '.sound-1', function(){
  sources[0].start(0);
});

$(document).on('click', '.sound-2', function(){
  sources[1].start(0);
});

$(document).on('click', '.sound-3', function(){
  sources[2].start(0);
});