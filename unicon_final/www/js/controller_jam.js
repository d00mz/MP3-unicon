'use strict';
var app = angular.module('unicon', ['geolocation']);

app.controller('JamCtrl', function($scope, $http, geolocation, $window, Auth) {

	// VARIABLEN DEKLARATION
	$scope.formData = {};
	$scope.details = {};
	$scope.infotext= "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.";

	var search = $window.location.search.substring(1);
	$scope.params = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');

	// DETAILS AJAX
	$http.get('http://kaz.kochab.uberspace.de/MP3/api/jam/getdetails?id=' + $scope.params.id).then(function(result) {
		console.log(result.data);


		var uGeo =Auth.getData('geo');
		result.data[0].distance = $scope.distance(result.data[0].lat,result.data[0].lng,uGeo[0],uGeo[1]) + ' km';
		result.data[0].joined = false;


		$scope.details = result.data;

	});



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


	$scope.jamBeitreten = function(){
		if($scope.details[0].joined){
			alert($scope.infotext);
		} else {
			if($scope.formData['instrument_id'] === undefined || Auth.isLoggedIn()){
				alert('Bitte wähle ein Instrument aus und logge dich ein, damit wir fortfahren können');
			} else {
				$http.get('http://kaz.kochab.uberspace.de/MP3/api/jam/join?jam_id='+$scope.params.id+'&user_id='+ Auth.getData('id') +'&instrument_id='+$scope.formData.instrument_id)
				.then(function(result) {
					
					if(typeof result.data['success'] != 'undefined'){
						for(var i = 0; i < $scope.details[0].instruments.length; i++){
							if($scope.details[0].instruments[i].id == $scope.formData.instrument_id){
								$scope.details[0].instruments[i].user_id = Auth.getData('id');
							}
						}
							alert(result.data['success']);
							$scope.close();
					} else {
							alert(result.data['error']);
					}
				});
			}
		}
	};

	// Funktion filtert Instrumente und gibt nur freie Instrumente zurück
	$scope.isAvailable = function(instruments){
		var result = [];

		angular.forEach(instruments, function(instrument, key) {
		
			if(instrument.user_id == '0'){
				result.push(instrument);
			}
		});

		return result;
	};

	$scope.isNotAvailable = function(instruments){
		var result = [];

		angular.forEach(instruments, function(instrument, key) {
			if(instrument.user_id != '0'){
				result.push(instrument);
			}

			if(instrument.user_id == Auth.getData('id')){
				$scope.infotext = 'Sie sind diesem Jam bereits beigetreten!';
				$scope.details[0].joined = true;
			}
		});
		return result;
	};


	$scope.show = function (){
	  	$('body').addClass('showOverlay hideInnerWrap');

	};

	$scope.close = function (){
	  	$('body').removeClass('showOverlay hideInnerWrap');
	};

});