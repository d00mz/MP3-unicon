'use strict';
var app = angular.module('unicon', ['geolocation']);

app.controller('CreateCtrl', function($scope, $http, geolocation, Auth) {
	$scope.map = false;
	$scope.master = {}; 
	$scope.jam = {}; 
	$scope.user = {}; 
	$scope.genres = $http.get('http://kaz.kochab.uberspace.de/MP3/api/jam/getgenre').then(function(result) {
		console.log(result);
		$scope.genres = result.data;
	});

	$scope.instruments = {};
	$scope.overview = {};


	$scope.clickTest = function() {
		alert('Example of infowindow with ng-click')
	};

	$scope.updateGenre = function(genre){
		console.log(genre);
		//$('#genre_id').attr('value', id);
		angular.extend($scope.overview, {'genre':genre});
		console.log($scope.overview);
		$http.get('http://kaz.kochab.uberspace.de/MP3/api/jam/getinstruments?id='+genre.id).then(function(result) {
			$scope.instruments = result.data;
			console.log($scope.instruments);
			angular.extend($scope.overview, {'instruments':$scope.instruments});
			console.log($scope.overview);
		});
	};


	$scope.update = function(jam) {
		$scope.master = angular.copy(jam);
		alert($scope.master);
	};


	$scope.formSubmit = function(){
		var formData = $("form").serializeObject();
		console.log(formData);
		var form = {
			jam: {},
			jam_user: {
				user_id: Auth.getData('id')
			}
		};

		for(var key in formData){
			if(key == 'genre_id'){
				form.jam[key] = formData[key];
				form.jam_user[key] = formData[key];
			} else if (key == 'instrument_id'){
				form.jam_user[key] = formData[key];
			} else {
				form.jam[key] = formData[key];
			}
		}
		console.log(form);


  		$.ajax({
			type: "POST",
			dataType: "html",
			url: 'http://kaz.kochab.uberspace.de/MP3/api/jam/create',
			data: {
				returnFormat: "plain",
				formData: JSON.stringify(form.jam),
			},
			success: function(data){
				var json = $.parseJSON(data);
				
				form.jam_user.jam_id = json.jam_id;
				$scope.$apply(function(){
					$http.get('http://kaz.kochab.uberspace.de/MP3/api/jam/join?jam_id='+form.jam_user.jam_id+'&user_id='+ form.jam_user.user_id +'&instrument_id='+form.jam_user.instrument_id)
					.then(function(result) {
						if(typeof result.data['success'] != 'undefined'){
							alert(result.data['success']);
						} else {
							alert(result.data['error']);
						}
					});
				});
			}
		});
	};

	$scope.initMap = function(){
		var $latitude = $('#lat');
		var $longitude = $('#lng');
		var uGeo = Auth.getData('geo');

		console.log(Auth.getUser());
		console.log('user geo');
		console.log(uGeo);

		console.log(uGeo[0], uGeo[1]);
		var zoom = 14;

		var LatLng = new google.maps.LatLng(uGeo[0], uGeo[1]);
		$('#lat').attr('value',uGeo[0]);
		$('#lng').attr('value',uGeo[1]);

		var mapOptions = {
			zoom: zoom,
			center: LatLng,
			panControl: false,
			zoomControl: false,
			scaleControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		var map = new google.maps.Map(document.getElementById('map'),mapOptions);

		var marker = new google.maps.Marker({
			position: LatLng,
			map: map,
			title: 'Drag Me!',
			draggable: true
		});

		google.maps.event.addListener(marker, 'dragend', function(marker){
			var latLng = marker.latLng;
			$('#lat').attr('value',latLng.lat());
			$('#lng').attr('value',latLng.lng());
			$scope.$apply(function(){
				$scope.jam.lat = latLng.lat();
				$scope.jam.lng = latLng.lng();
			});
		});

	};


	$scope.initMap();

});

var owl;

$(document).on("click",".overview button",function() {
	console.log($(this).parents('form').serializeArray());
});

$(document).ready(function(){


	$( "#slider" ).slider({
		min: 5,
		max: 45,
		value: 15,
		animate: "fast",
		slide: function( event, ui ) {
			$("#duration").val(ui.value);
		}
	});


	owl = $("#createForm");

	owl.owlCarousel({
		navigation : false,
		navigationText: ['<','>'],
		pagination: false,
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem:true,
		rewindSpeed: 300,
		addClassActive: true,
		autoHeight : true,
		mouseDrag: false,
		touchDrag: false,
		afterMove: function(e){
			console.log(e);
			
			console.log(owl.data('owlCarousel').currentItem);
		}		
	});

	owl.on("swiperight",function(event){
		var $e = $(event.target);
		if($e.attr('id') != 'map' && $e.parents('#map').length == 0 && $e.attr('id') != 'max_length'){
			owl.data("owlCarousel").prev();
		}
	});

	owl.on("swipeleft",function(event){
		var $e = $(event.target);
		if($e.attr('id') != 'map' && $e.parents('#map').length == 0 && $e.attr('id') != 'max_length'){
			owl.data("owlCarousel").next();
		}
	});

});