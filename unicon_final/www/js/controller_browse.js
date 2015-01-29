'use strict';
var app = angular.module('unicon', ['geolocation']);

app.controller('BrowseCtrl', function($scope, $http, geolocation, $window, Auth) {

	$scope.genres = {};

	$http.get('http://kaz.kochab.uberspace.de/MP3/api/jam/getlist').then(function(result) {
		console.log(result.data);
		$scope.genres = result.data;
	});


	$scope.detailView = function(id){
		alert('du willst also die Detailansicht von dem Konzert mit der ID '+ id);
	};

	$scope.calcDistance = function(list){
		var result = [];
		angular.forEach(list, function(item, key) {
			var uGeo =Auth.getData('geo');
			item.distance = $scope.distance(item.lat,item.lng,uGeo[0],uGeo[1]) + ' km';
			result.push(item);
		});

		return result;
	};

	$scope.distance = function(lat1, lon1, lat2, lon2) {
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


});

var owl;
