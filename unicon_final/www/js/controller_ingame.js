'use strict';
var app = angular.module('unicon', ['geolocation']);

app.controller('IngameCtrl', function($scope, $http, geolocation, $window, Auth) {

	// VARIABLEN DEKLARATION
	$scope.formData = {};
	$scope.details = {};
	$scope.timeleft = 1000;

	$scope.ingame = {
		name: 'gude',
	};

	var search = $window.location.search.substring(1);
	$scope.params = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');

	$scope.stringToDate = function(mydate)  {
		var s = mydate.split(/[-: ]/);
		return new Date(s[0], s[1]-1, s[2], s[3], s[4], s[5]);
	};

	// DETAILS AJAX
	$http.get('http://kaz.kochab.uberspace.de/MP3/api/jam/getdetails?id=' + $scope.params.id).then(function(result) {
		console.log(result.data);


		var uGeo =Auth.getData('geo');
		result.data[0].distance = $scope.distance(result.data[0].lat,result.data[0].lng,uGeo[0],uGeo[1]) + ' km';
		result.data[0].joined = false;
		$scope.details = result.data;
		$('timer')[0].addCDSeconds(Math.abs(($scope.stringToDate(result.data[0].startDate) - new Date()) / 1000).toFixed(0)).start();
		console.log($scope.timeleft);

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

	$scope.startJam = function(){
		alert('wir koennen Starten');
	};


});