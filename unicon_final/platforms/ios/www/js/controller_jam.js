'use strict';
var app = angular.module('unicon', ['geolocation']);

app.controller('JamCtrl', function($scope, $http, geolocation) {
	console.log($stateParams);

	// VARIABLEN DEKLARATION
	$scope.formData = {};
	$scope.details = {};
	$scope.userData = JSON.parse(localStorage.getItem('userData'));

	// DETAILS AJAX
	$http.get('http://kaz.kochab.uberspace.de/MP3/api/jam/getdetails?id=' + $stateParams.jamId).then(function(result) {
		console.log(result.data);
		$scope.details = result.data;
	});

	$ionicModal.fromTemplateUrl('http://kaz.kochab.uberspace.de/MP3-unicon/unicon_ionic/www/templates/detail_join.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
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
		});

		return result;
	};







	navigator.geolocation.getCurrentPosition(function(position){
		$scope.$apply(function(){
			console.log($scope.userData);
			$scope.userData.geo = [position.coords.latitude,position.coords.longitude];
			console.log($scope.userData);
			localStorage.setItem('userData',JSON.stringify($scope.userData));
	    	console.log('geolocation detected');
		});
	});

	$scope.show = function() { $scope.modal.show(); };
	$scope.close = function(){ $scope.modal.hide(); };

	// Distance Calculation
	$scope.distance = function(lat, lon){
		var radlat1 = Math.PI * lat/180
		var radlat2 = Math.PI * $scope.userGeo[0]/180
		var radlon1 = Math.PI * $scope.userGeo[1]/180
		var radlon2 = Math.PI * lon/180
		var theta = lon1-lon2
		var radtheta = Math.PI * theta/180
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist)
		dist = dist * 180/Math.PI
		dist = dist * 60 * 1.1515
		dist = dist * 1.609344;
		return dist.toFixed(2);
	}

});