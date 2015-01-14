var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
		
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		context = new AudioContext();

		console.log(context);

        myShakeEvent.start();
        window.addEventListener('shake', this.shakeHandler, false);

    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        $('audio').on('click',this.bufferResources);
        $('.bufferResources').on('click',this.bufferResources);
        $('.play').on('click',this.playback);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

    },
    // Buffer soundfiles
    bufferResources: function(event){

		bufferLoader = new BufferLoader(context, [
			'sounds/guitar_sprite.wav',
		], app.bufferFinish);

        bufferLoader.load();
        console.log(bufferLoader);

    },
    bufferFinish: function(bufferList){	
		console.log('finished Buffering');
        alert('setting Timer');
        $('.loader').addClass('start');

    	/*for(var i = 0; i<bufferList.length; i++){
			sources[i] = context.createBufferSource();
			sources[i].buffer = bufferList[i];
			sources[i].connect(context.destination);
			console.log(bufferList[0]);
			myShakeInterval = parseInt(spriteSettings.duration);
			//sources[i] = bufferList[i];
    	}*/

		console.log('timer: ' + spriteSettings.duration);

		//app.shakeIntervalHandler();
        clearInterval(myShakeTimer);
    	myShakeTimer = setInterval(function(){ console.log('interval'); app.shakeIntervalHandler(); }, spriteSettings.duration*1000);
    },
    playback: function(event){

    	var soundId = $(this).data('id');
    	//sources[soundId].start(0);
    	//
    	var startTime = context.currentTime;
    	app.playSound(bufferLoader.bufferList[soundId], startTime);
        console.log(bufferLoader.bufferList[soundId]);
    },
    shakeHandler: function(){
        shakeCounter += 1;
        $('.shakeCounter h2.shake span').html(shakeCounter);
    },
    shakeIntervalHandler: function(){
    	console.log('shakeIntervalHandler');
        $('.shakeCounter h2.interval span').html(shakeCounter);

		var id = '';
        if(shakeCounter <= 3){
        	id = 0;
        } else if(shakeCounter > 3 && shakeCounter <= 6){
        	id = 1;
        } else {
        	id = 2;
        }
        console.log('shakes during interval: ' + shakeCounter);

		console.log('starting sound: ' + id + '('+id * spriteSettings.duration+')');


        shakeCounter = 0;
        $('.shakeCounter h2.shake span').html(shakeCounter);

        // Audio element with audio sprite
        var startTime = id * spriteSettings.duration;
        $('audio:eq(0)')[0].currentTime = startTime;
        $('audio:eq(0)')[0].play();

        id = Math.floor(Math.random() * 2) + 1;
        var startTime = id * spriteSettings.duration;
        $('audio:eq(1)')[0].currentTime = startTime;
        $('audio:eq(1)')[0].play();


        id = Math.floor(Math.random() * 2) + 1;
        var startTime = id * spriteSettings.duration;
        $('audio:eq(2)')[0].currentTime = startTime;
        $('audio:eq(2)')[0].play();

        // without audio element
        /*var startTime = context.currentTime - ( id * spriteSettings.duration);
    	app.playSound(bufferLoader.bufferList[id], startTime);*/
    },
	playSound: function(buffer, time) {
		console.log(buffer);
		console.log(time);


		if(typeof playing.guitar != 'undefined') {
			console.log(playing);
			playing.guitar.stop();
		}

		var source = context.createBufferSource();
		source.buffer = buffer;
		source.connect(context.destination);
		source.start(time);

		playing.guitar = source;
	}

};


//create a new instance of shake.js.
var myShakeEvent = new Shake({
    threshold: 1 // optional shake strength threshold
});

var spriteSettings = {
    duration: 9.134125,
    amount: 3
};


var myShakeTimer,
    myShakeInterval;
var shakeCounter = 0;


// Global Vars
var context,
	bufferLoader;

var sources = new Array();
var playing = {};

// Init App
app.initialize();



