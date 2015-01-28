'use strict';
var app = angular.module('unicon', ['geolocation']);

app.controller('JamCtrl', function($scope, $http, geolocation, $window) {

	// VARIABLEN DEKLARATION
	$scope.formData = {};
	$scope.details = {};
	try {
		$scope.userData = JSON.parse(localStorage.getItem('userData'));
	} catch(e) {
		$scope.userData = {};
	}

	var search = $window.location.search.substring(1);
	$scope.params = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
	//alert(search + ' | ' + $scope.params.id);

	// DETAILS AJAX
	$http.get('http://kaz.kochab.uberspace.de/MP3/api/jam/getdetails?id=' + $scope.params.id).then(function(result) {
		console.log(result.data);
		$scope.details = result.data;
	});


	$scope.jamBeitreten = function(){
		console.log('----- jam beitreten ----------');
		if($scope.userData === null){
			$scope.userData = JSON.parse(localStorage.getItem('userData'));
		}

		if($scope.formData['instrument_id'] === undefined || $scope.userData === null){
			alert('Bitte wähle ein Instrument aus und logge dich ein, damit wir fortfahren können');
		} else {
			$http.get('http://kaz.kochab.uberspace.de/MP3/api/jam/join?jam_id='+$stateParams.jamId+'&user_id='+$scope.userData.id+'&instrument_id='+$scope.formData.instrument_id)
			.then(function(result) {
				console.log(result);
				alert(result.data);
			});
		}
	};

	// Funktion filtert Instrumente und gibt nur freie Instrumente zurück
	$scope.isAvailable = function(instruments){
		var result = [];
console.log('available');
		console.log(instruments);

		angular.forEach(instruments, function(instrument, key) {
		console.log(instrument);
			if(instrument.user_id == '0'){
				result.push(instrument);
			}
		});

		return result;
	};

	$scope.isNotAvailable = function(instruments){
		var result = [];

console.log('not available');
		console.log(instruments);
		angular.forEach(instruments, function(instrument, key) {
		console.log(instrument);
			if(instrument.user_id != '0'){
				result.push(instrument);
			}
		});

		return result;
	};


	$scope.show = function (){
	  	$('body').addClass('showOverlay');

	};

	$scope.close = function (){
	  	$('body').removeClass('showOverlay');
	};



	/*navigator.geolocation.getCurrentPosition(function(position){
		$scope.$apply(function(){
			$scope.userData.geo = [position.coords.latitude,position.coords.longitude];
			localStorage.setItem('userData',JSON.stringify($scope.userData));
		});
	});*/


});