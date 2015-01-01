var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
		
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		context = new AudioContext();

		this.getLocation(this.generateMap);

    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        $('.bufferResources').on('click',this.bufferResources);
        $('.play').on('click',this.playback);
        $('.updatePos').on('click',this.updateMarker);
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

        console.log('Received Event: ' + id);
    },
    // Buffer soundfiles
    bufferResources: function(event){

		bufferLoader = new BufferLoader(context, [
			'sounds/01.wav',
			'sounds/02.wav',
			'sounds/03.wav',
		], app.bufferFinish);

		bufferLoader.load();
    },
    bufferFinish: function(bufferList){	
    	for(var i = 0; i<bufferList.length; i++){
			sources[i] = context.createBufferSource();
			sources[i].buffer = bufferList[i];
			sources[i].connect(context.destination);
    	}

		console.log('finished Buffering');
		$('.buffer').slideUp();
		$('.playback').slideDown().removeClass('hide');
    },
    playback: function(event){
    	var soundId = $(this).data('id');
    	sources[soundId].start(0);
    },

    // Geolocation
    getLocation: function(callback) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(callback);
		}
	},
	generateMap: function(position){
		var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);  

		// Calling the constructor, thereby initializing the map  
		var map = new google.maps.Map(document.getElementById('map'), {  
			zoom: 15,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});  
						
		marker = new google.maps.Marker({
			position: latlng, 
			map: map
		});

	},
    // Geolocation
	setMarker: function(position){
		console.log('setMarker');
		console.log(position.coords.latitude + ' , ' +  position.coords.longitude);
		var newPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		marker.setPosition(newPosition);
	},
    updateMarker: function() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(app.setMarker);
		}
	}

};

// Init App
app.initialize();

// Global Vars
var context;
var bufferLoader;
var sources = new Array();