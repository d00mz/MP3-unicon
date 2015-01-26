angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, Auth) {
  // Form data for the login modal
  $scope.loginData = {};

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.guuude = function(){
		alert('guden');
	};

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		console.log('Doing login', $scope.loginData);

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		// $timeout(function() {
		//   $scope.closeLogin();
		// }, 1000);

		console.log('starting auth');
		console.log(Auth.login($scope.loginData.username,$scope.loginData.password));
		//console.log(Auth.currentUser());

		$timeout(function() {
			console.log('timer login: ' + typeof Auth.currentUser());
			console.log(Auth.currentUser());
			$scope.closeLogin();
		}, 2000);


		
	};
})

.controller('BrowseCtrl', function($scope) {
	$scope.genres = [
		{ 
			title: 'Rock', 
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



	$scope.slideHasChanged = function($index){
		console.log($index);
		
	};
})

.controller('JamdetailCtrl', function($scope, $stateParams, $http, $ionicLoading, Auth) {
	console.log($stateParams);
	$scope.details = {};
	$scope.userGeo = [];

	navigator.geolocation.getCurrentPosition(function(position){
		$scope.$apply(function(){
			Auth.setGeo([position.coords.latitude,position.coords.longitude]);
	    	console.log('geolocation detected');
	    	console.log($scope.userGeo);
	    	console.log(Auth.currentUser());
		});
	});

	$http.get('http://kaz.kochab.uberspace.de/MP3/api/jam/getdetails?id=' + $stateParams.jamId).then(function(result) {
		console.log(result.data);
		$scope.details = result.data;
	});

	$scope.show = function() {
		$ionicLoading.show({
			template: 'Loading...'
		});
	};
	$scope.hide = function(){
		$ionicLoading.hide();
	};

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

	$scope.tests = [{
		id: 1,
		name: 'Mein Jam',
		description: 'ai gude das wird en subber jam werden',
		lat: 9.235146511,
		lng: 52.13546351,
		genre_id: 1,
		max_distance: 100,
		duration: 15,
		max_user: 4,
		startDate: "2015-01-23 15:10:00",
		instruments: [
			{
				id: 1, // genre_instruments Instrumenten ID
				user_id: 2, // jam_users
				name: 'Gitarre',
				source: 'guitar_sprite.wav'
			},
			{
				id: 2, // genre_instruments Instrumenten ID
				user_id: 0, // jam_users
				name: 'Drum',// genre_instruments
				source: 'drum_sprite.wav'// genre_instruments
			},
			{
				id: 3, // genre_instruments Instrumenten ID
				user_id: 0, // jam_users
				name: 'Bass',// genre_instruments
				source: 'bass_sprite.wav'// genre_instruments
			}
		]
	}];
})



.controller('CreateCtrl', function($scope, $stateParams, $http, Auth, $compile, $ionicLoading) {
$scope.map = false;

	$scope.slideHasChanged = function($index){
		console.log($index);
		console.log('scope map: ' + typeof $scope.map);
		if($index == 4 && typeof $scope.map == 'boolean'){
		console.log('initialize');
		console.log($("#map123"));
        var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map123"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
        
		console.log('scope map: ' + typeof $scope.map);
     }
		
	};

      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };




	$scope.master = {}; 
	//$scope.genres = dataService.getData();
	$scope.genres = [];
	//$scope.documents = [];
	$http.get('http://kaz.kochab.uberspace.de/MP3/api/jam/getgenre')
	  .then(function(result) {
	  	console.log(result);
	    $scope.genres = result.data;
	});
	

	$scope.update = function(jam) {
		$scope.master = angular.copy(jam);
	};


    
      
    });
