'use strict';
var app = angular.module('unicon', ['geolocation']);

app.controller('IngameCtrl', function($scope, $http, geolocation, $window, Auth) {

	// VARIABLEN DEKLARATION

	$scope.timeleft = 1000;
	$scope.ingame = {}; // Jam Daten
	$scope.sound = {
		duration: 8341.666,
		cadence: 2
	}

	$scope.myInstrument = '';

	// Timer für Jam Handler
	$scope.timer = false;
	$scope.syncMyInstrumentTimer = false;

	// Shakeevent
	$scope.shake = new Shake({
		threshold: 1 
	});

	// Zähler für Shakeanzahl
	$scope.shakeCounter = {
		last: '',
		current: 0,
		loopFinished: 1
	};
	var socket;



	var search = $window.location.search.substring(1);
	$scope.params = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');

	$scope.stringToDate = function(mydate)  {
		var s = mydate.split(/[-: ]/);
		return new Date(s[0], s[1]-1, s[2], s[3], s[4], s[5]);
	};

	$scope.addMinutes = function(mydate, minutes) {
	    var copiedDate = mydate;
	    return new Date(copiedDate.getTime() + minutes * 60000);
	};

	$http.get('http://kaz.kochab.uberspace.de/MP3/api/jam/getlivedata?id=' + $scope.params.id + '&user_id=' + Auth.getData('id') ).then(function(result) {

		$scope.ingame = result.data[0];
		console.log($scope.ingame);

		// Objekt um Spielstatus erweitern
		for(var i = 0; i < $scope.ingame.instruments.length; i++){

			var geoData = [];

			if($scope.ingame.instruments[i].isMine){
				$scope.myInstrument = i;
				geoData = Auth.getData('geo');
			}

			$scope.ingame.instruments[i].playState = {
				stage: 0,
				oldStage: 0,
				volume: 0,
				geo: geoData
			};

			console.log($scope.ingame.instruments[i]);
		}

		// connect to Websocket
		$scope.wsConnect(); 

	});


	// wird ausgeführt sobald man der erste im Jam ist oder
	/**
	 * [init]
	 * Ausgeführt wenn:
	 * - sobald man der 1. ist
	 * - sobald man der x. ist und man Instrumentdaten bekommt
	 **/
	$scope.init = function(){
		$scope.shake.start();
        window.addEventListener('shake', $scope.shakeHandler, false);

        /**
         * Jamhandler Interval setzen
         * Timeout synchronisiert die Browser und gleicht den WS Delay aus
         **/
        $scope.timer = '';
        setTimeout(function(){
			$scope.updateMyInstrument();
	        $scope.jamHandler();

			$scope.timer = setInterval(function(){ 
	        	$scope.jamHandler();
	        }, $scope.sound.duration / $scope.sound.cadence);

        }, ($scope.sound.duration / $scope.sound.cadence)-50);

        /**
         * Interval um sicher zu stellen, dass die letzten Jam Daten zu den anderen Clients synchronisiert werden
         **/
        setTimeout(function(){
			$scope.syncMyInstrumentTimer = setInterval(function(){ 
				$scope.updateMyInstrument();
	        }, $scope.sound.duration / $scope.sound.cadence);

        }, ($scope.sound.duration / $scope.sound.cadence)-100);
	};

	/**
	 * [shakeHandler]
	 * Zählfunktion für die Shakes
	 */
	$scope.shakeHandler = function(){
		currentShakes += 1;
		$scope.updateMyInstrument();
	};

	$scope.updateMyInstrument = function(){
		//console.log('---- update my instrument ----');

		$scope.ingame.instruments[$scope.myInstrument].playState.volume = 1;

		// neue Komplexität einstufen
		var newStage = '';
		if(currentShakes == 0){
			newStage = 0;
			$scope.ingame.instruments[$scope.myInstrument].playState.volume = 0;
		} else if(currentShakes <= 2){
			newStage = 1;
			$scope.ingame.instruments[$scope.myInstrument].playState.volume = 1;
		} else if(currentShakes > 2 && currentShakes <= 3){
			newStage = 2;
			$scope.ingame.instruments[$scope.myInstrument].playState.volume = 1;
		} else {
			newStage = 3;
			$scope.ingame.instruments[$scope.myInstrument].playState.volume = 1;
		}

		// neue Komplexität eintragen
		$scope.ingame.instruments[$scope.myInstrument].playState.stage = newStage;

		socket.emit('settingsInstrument', {
			id: $scope.ingame.instruments[$scope.myInstrument].id,
			loopFinished: $scope.shakeCounter.loopFinished,
			myShakes: currentShakes,
			playState: $scope.ingame.instruments[$scope.myInstrument].playState
		});
	};


	$scope.jamHandler = function(){
		console.log('---------------------- neuer Takt ('+ $scope.shakeCounter.loopFinished +'/'+ $scope.sound.cadence +') -------');
		var mydate = $scope.stringToDate($scope.ingame.startDate);
		//console.log($scope.addMinutes(mydate, $scope.ingame.duration) - new Date());

		// Instrumentdaten rausschicken
		//console.log('mein Instrument ', $scope.ingame.instruments[$scope.myInstrument].playState);

		for(var i = 0; i < $scope.ingame.instruments.length; i++){
			console.log($scope.ingame.instruments[i]);
				if($scope.ingame.instruments[i].id == 8) { console.log($scope.ingame.instruments[i].playState); }

			var inst 		= $scope.ingame.instruments[i].icon,
				indexOld 	= $scope.ingame.instruments[i].playState.oldStage,
				indexNew 	= $scope.ingame.instruments[i].playState.stage,
				volume 		= $scope.ingame.instruments[i].playState.volume;

			$scope.playAtTime(inst, indexOld, indexNew, volume);
			//$scope.crossFade(inst, indexOld, indexNew, volume);
		}

		$scope.ingame.instruments[$scope.myInstrument].playState.oldStage = $scope.ingame.instruments[$scope.myInstrument].playState.stage;

		$scope.shakeCounter.loopFinished++;

		if($scope.shakeCounter.loopFinished == $scope.sound.cadence+1) $scope.shakeCounter.loopFinished = 1;
		currentShakes = 0;
	};


	/*
		Websocket funktionen
	*/
	$scope.wsConnect = function(){
		socket = new io.connect('http://kaz.kochab.uberspace.de:64182');
		socket.on('connect',function() {
			console.log('Client has connected to the server!');
		});

		// Automatically emitted by server on connect
		socket.on('users',function(data) {
			console.log('users triggered ',data);
			if(data.currentUsers == 1){
				$scope.init();
			}
		});

		/**
		 * [description]
		 * data Object:
		 * id: instrument id,
		 * loopFinished: 1 bis 4 (4 -> loop beendet),
		 * playState: { geo, volume, komplexität }
		 */
		socket.on('updateInstrument',function(data) {
			console.log('New Instrument Data! -- id: ' + data.id + ' | shake: '+ data.myShakes + ' | stage: '+data.playState.stage + ' | old: '+ data.playState.oldStage);
			for(var i = 0; i < $scope.ingame.instruments.length; i++){
				if($scope.ingame.instruments[i].id == data.id){

					$scope.ingame.instruments[i].playState = data.playState;

					//console.log($scope.ingame.instruments[i].playState);

				}
			}

			if(typeof $scope.timer == 'boolean' && data.loopFinished == $scope.sound.cadence){
				console.log('received data & loop just finished - starting timer');
				$scope.init();
				$scope.shakeCounter.loopFinished = 1;
			} else if (typeof $scope.timer == 'boolean'){
				$scope.jamHandler();
			}
		});

		// Add a disconnect listener
		socket.on('disconnect',function() {
			console.log('The client has disconnected!');
		});
	};



	/* 
		Musik Funktionen
	 */
	$scope.play = function(instrument, audioIndex, value){
		var $audio = $('.' + instrument + ' > audio:eq(' + audioIndex + ')');
		$audio[0].currentTime = 0;
		$audio[0].volume = value;
		if (value != 0) {
			$audio[0].play();
		} else {
			$audio[0].pause();
		}
	};

	$scope.playAtTime = function(instrument, audioOut, audioIn, value){
		var aout=audioOut,
			ain=audioIn;

		if(audioOut != 0) aout -= 1;
		if(audioIn != 0) ain -= 1;

		var $audioOut = $('.' + instrument + ' > audio:eq(' + aout + ')');
		var $audioIn = $('.' + instrument + ' > audio:eq(' + ain + ')');

		//console.log('('+audioOut +'=='+ audioIn +'&&!'+ $audioIn[0].paused +') || '+ audioOut +' !='+ audioIn + '||'+ $scope.sound.cadence +'== 1)');

		//if((audioOut ==audioIn &&! $audioIn[0].paused ) || audioOut != audioIn || $scope.sound.cadence== 1){
		if(audioIn != 0){

			// alten Track pausieren
			/*console.log($('.' + instrument + ' > audio').not($audioIn[0]));
			$('.' + instrument + ' > audio').not($audioIn[0]).each(function(){
				$(this)[0].pause();
			});*/
			// -------- pausieren --------



			// neuen Track an passendem Takt abspielen
			var startTime = 0;
			var calc = (($scope.sound.duration/$scope.sound.cadence) * ($scope.shakeCounter.loopFinished-1));
			if(calc != 0) startTime = calc/1000;
			console.log('starting at: ' + startTime);
			$audioIn[0].currentTime = startTime;
			$audioIn[0].volume = 1;

			$('.' + instrument + ' > audio')[0].pause();
			$audioIn[0].play();

		} else {
			$audioOut.stop();
			$audioIn.stop();
		}
	};

	/*$scope.fadeMusic = function(instrument, audioIndex, value){
		var $audio = $('.' + instrument + ' audio:eq(' + audioIndex + ')');
		$audio[0].play();
		$audio.animate({ volume: value }, 1000);
	};

	$scope.crossFade = function(instrument, audioOut, audioIn, value){
		var $fadeOut = $('.' + instrument + ' audio:eq(' + audioOut + ')');
		var $fadeIn = $('.' + instrument + ' audio:eq(' + audioIn + ')');

		$fadeOut.animate({ volume: 0 }, 1000);

		$fadeIn[0].volume = 0;
		$fadeIn[0].currentTime = 0;
		$fadeIn[0].play();
		$fadeIn.animate({ volume: value }, 1000);

		
	};*/



	$scope.distance = function(lat1, lon1, lat2, lon2, unit) {
	    var radlat1 = Math.PI * lat1/180;
	    var radlat2 = Math.PI * lat2/180;
	    var radlon1 = Math.PI * lon1/180;
	    var radlon2 = Math.PI * lon2/180;
	    var theta = lon1-lon2;
	    var radtheta = Math.PI * theta/180;
	    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	    dist = Math.acos(dist);
	    dist = dist * 180/Math.PI;
	    dist = dist * 60 * 1.1515;
	    dist = dist * 1.609344;
	    return dist.toFixed(2);
	};

	$scope.startJam = function(){
		alert('wir koennen Starten');
	};


});


// Sends a message to the server via sockets
function sendMessageToServer(msg) {
	socket.emit('new message', msg);
	socket.emit('new message', {
		message: msg + 'second'
	});
};



var currentShakes = 0;
