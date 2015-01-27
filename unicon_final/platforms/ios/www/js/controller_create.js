'use strict';
var app = angular.module('unicon', ['geolocation']);

app.controller('CreateCtrl', function($scope, $http, geolocation) {
	$scope.map = false;
  $scope.master = {}; 
  $scope.jam = {}; 
  $scope.genres = $http.get('http://kaz.kochab.uberspace.de/MP3/api/jam/getgenre').then(function(result) {
      console.log(result);
      $scope.genres = result.data;
  });

	/*$scope.slideHasChanged = function($index){
		console.log($index);
		console.log('scope map: ' + typeof $scope.map);
		if($index == 1 && typeof $scope.map == 'boolean'){
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
          title: 'Konzert'
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
      };*/
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };



	

	$scope.update = function(jam) {
		$scope.master = angular.copy(jam);
    alert($scope.master);
	};


});

$(document).on("click",".overview button",function() {
    console.log($(this).parents('form').serializeArray());
});