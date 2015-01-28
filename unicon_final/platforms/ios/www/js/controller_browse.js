'use strict';
var app = angular.module('unicon', ['geolocation']);

app.controller('BrowseCtrl', function($scope, $http, geolocation, $window) {
	try {
		$scope.userData = JSON.parse(localStorage.getItem('userData'));
	} catch(e) {
		$scope.userData = {};
	}

	$scope.genres = [
		{ 
			title: 'Reggae', 
			id: 1, 
			image: 'reggae.jpg',
			jams: [
				{
					divider: 'die naechsten 15 min',
					list: [
						{"id":"12","name":"Uni JAM","description":"Das ist die BEschreibung des Tests","lat":"49.9027","lng":"8.85866","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-23 15:10:00","created":"2015-01-21 10:25:29"},
						{"id":"22","name":"Der aller letzte Jam","description":"Das ist die BEschreibung des Tests","lat":"49.9027","lng":"8.85866","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-23 15:10:00","created":"2015-01-21 10:25:29"},
						{"id":"5","name":"Ruven's Jam","description":"test","lat":"49.8704","lng":"8.62465","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 21:40:54"},
						{"id":"4","name":"mein jamname","description":"Ai gude das ist die beschreibung des jams","lat":"49.8704","lng":"8.62459","genre_id":"1","max_distance":"100","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 21:37:20"}
					]
				},{
					divider: 'die naechste Stunde',
					list: [
						{"id":"6","name":"N\u00e4chster Jam","description":"test","lat":"49.8704","lng":"8.62465","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 21:41:15"},
						{"id":"7","name":"N\u00e4chster Jam","description":"test","lat":"49.8704","lng":"8.62465","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 22:09:36"},
						{"id":"8","name":"Noch ein neuer Jam","description":"test","lat":"49.8704","lng":"8.62465","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 22:10:47"},
						{"id":"9","name":"Ein weiterer Jam","description":"test","lat":"49.8704","lng":"8.62465","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 22:11:17"},
						{"id":"10","name":"Ein weiterer Jam 1","description":"test","lat":"49.8704","lng":"8.62465","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 22:11:33"},
					]
				},{
					divider: 'die naechsten Tage',
					list: [
						{"id":"11","name":"Ein weiterer Jam 2","description":"test","lat":"49.8704","lng":"8.62465","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 22:12:53"},
						{"id":"14","name":"Lorem ipsum","description":"Ai gude das ist die beschreibung des jams","lat":"49.8704","lng":"8.62459","genre_id":"1","max_distance":"100","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 21:37:20"},
						{"id":"15","name":"Dolor sit amet","description":"test","lat":"49.8704","lng":"8.62465","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 21:40:54"},
						{"id":"16","name":"Banaler Jam","description":"test","lat":"49.8704","lng":"8.62465","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 21:41:15"},
						{"id":"17","name":"Interactive Music","description":"test","lat":"49.8704","lng":"8.62465","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 22:09:36"},
						{"id":"18","name":"GEO JAM","description":"test","lat":"49.8704","lng":"8.62465","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 22:10:47"},
						{"id":"19","name":"Wir Rocken","description":"test","lat":"49.8704","lng":"8.62465","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 22:11:17"},
						{"id":"20","name":"Voll Abrocken","description":"test","lat":"49.8704","lng":"8.62465","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 22:11:33"},
						{"id":"21","name":"Gas geben","description":"test","lat":"49.8704","lng":"8.62465","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 22:12:53"}
					]
				}
			]
		},
		{ 
			title: 'Deep House',
			id: 2, 
			image: 'house.jpg',
			jams: [
				{
					divider: 'die naechsten 30 min',
					list: [
						{"id":"12","name":"Uni JAM","description":"Das ist die BEschreibung des Tests","lat":"49.9027","lng":"8.85866","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-23 15:10:00","created":"2015-01-21 10:25:29"},
						{"id":"22","name":"Der aller letzte Jam","description":"Das ist die BEschreibung des Tests","lat":"49.9027","lng":"8.85866","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-23 15:10:00","created":"2015-01-21 10:25:29"},
						{"id":"5","name":"Ruven's Jam","description":"test","lat":"49.8704","lng":"8.62465","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 21:40:54"}				
					]
				},{
					divider: 'die naechsten Tage',
					list: [
						{"id":"11","name":"Ein weiterer Jam 2","description":"test","lat":"49.8704","lng":"8.62465","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 22:12:53"},
						{"id":"14","name":"Lorem ipsum","description":"Ai gude das ist die beschreibung des jams","lat":"49.8704","lng":"8.62459","genre_id":"1","max_distance":"100","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 21:37:20"},
						{"id":"15","name":"Dolor sit amet","description":"test","lat":"49.8704","lng":"8.62465","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 21:40:54"},
						{"id":"16","name":"Banaler Jam","description":"test","lat":"49.8704","lng":"8.62465","genre_id":"1","max_distance":"45","duration":"0","max_user":"4","startDate":"2015-01-24 10:40:48","created":"2015-01-20 21:41:15"}
					]
				}
			]
		}
	];

	$scope.detailView = function(id){
		alert('du willst also die Detailansicht von dem Konzert mit der ID '+ id);
	};

	$scope.calcDistance = function(list){
		var result = [];
		angular.forEach(list, function(item, key) {
			try {
				item.distance = $scope.distance(item.lat,item.lng);
			} catch(e){
				item.distance = '-'
			}
			result.push(item);
		});

		return result;
	};

	$scope.distance = function(lat, lon){
		var radlat1 = Math.PI * lat/180
		var radlat2 = Math.PI * $scope.userData.geo[0]/180
		var radlon1 = Math.PI * lon/180
		var radlon2 = Math.PI * $scope.userData.geo[1]/180
		var theta = lon1-lon2
		var radtheta = Math.PI * theta/180
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist)
		dist = dist * 180/Math.PI
		dist = dist * 60 * 1.1515
		dist = dist * 1.609344;
		return dist.toFixed(2);
	}


	$scope.initCarousel = function(){
		owl = $("#browseCarousel");

		owl.owlCarousel({

			navigation : false,
			pagination: false,
			slideSpeed : 300,
			paginationSpeed : 400,
			singleItem:true,
			rewindSpeed: 300,
			addClassActive: true,
			autoHeight : true,
			transitionStyle : "fadeUp"
		});

		var myShakeEvent = new Shake({
			threshold:100000,
    		timeout: 1000
		});
        myShakeEvent.start();
        //window.addEventListener('shake', sliderNext, false);

        function sliderNext(){
        	owl.trigger('owl.next');
        }

		$(document).on('click', 'button.list-item',function(e){
			var id = $(this).data('id');
			$scope.$apply(function(){
				$scope.detailView(id);
			});
		});
	};

	navigator.geolocation.getCurrentPosition(function(position){
		$scope.$apply(function(){
			if($scope.userData === null) $scope.userData = {};
			$scope.userData.geo = [position.coords.latitude,position.coords.longitude];
		});
	});


});

var owl;