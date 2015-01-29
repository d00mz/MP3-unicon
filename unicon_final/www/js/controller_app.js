'use strict';
var app = angular.module('unicon', ['geolocation']);

app.controller('AppCtrl', function($scope, $http, geolocation, $window) {
	$scope.loginData = {};
	$scope.myJams = '';
	/*$scope.userData = $http.get('http://kaz.kochab.uberspace.de/MP3/api/user/getdata').then(function(result) {
	  	console.log(result);
	   return result.data;
	});*/
	try {
		$scope.userData = JSON.parse(localStorage.getItem('userData'));
	} catch(e) {
		$scope.userData = {};
	}

	console.log($scope.userData);
	console.log($scope.userData.length);
	if(typeof $scope.userData['id'] != 'undefined'){
		$http.get('http://kaz.kochab.uberspace.de/MP3/api/user/getmyjamcount?id='+$scope.userData["id"]).then(function(result) {
		  	console.log(result);
		   $scope.myJams = result.data;
		});
	}



	$scope.login = function (){
		console.log(JSON.parse(localStorage.getItem('userData')));
		if(JSON.parse(localStorage.getItem('userData')) == null){
			console.log('login');
	  		$('body').addClass('showOverlay').addClass('hideNavigation');
	  	} else {
	  		console.log('redirect');
	  		window.navigator.href = 'profil.html';
	  		$('#navMain .profil').attr('href', 'profil.html').click();
	    }

	};

	$scope.close = function (){
	  	$('body').removeClass('showOverlay hideNavigation');
	};

	$scope.doLogin = function() {
		console.log('Doing login', $scope.loginData);

		var form_data= [{"name":"username","value":$scope.loginData.username},{"name":"password","value":$scope.loginData.password},{"name":"returnUrl","value":"/MP3/"},{"name":"service","value":"login"}];
    	$.ajax({
			type: "POST",
			dataType: "html",
            cache: false,
			url: '/MP3/api/user/ajaxlogin/',
			data: form_data,
			success: function(data){
				console.log(data);
					console.log(typeof data);
				if(typeof data == 'string' && data == ''){
					localStorage.removeItem('userData');
					console.log('userdaten werden aus localstorage gelöscht');
				} else {
					try {
						var jsonData = JSON.parse(data);
						localStorage.setItem('userData',data);
						$scope.$apply(function(){
	    					$scope.userData = jsonData;
	    				});
					} catch(e){
						alert('Es gab ein Fehler beim Anmelden');
						console.log(e);
					}
					
		    		$('form').slideUp().after('<h1>Sie haben sich erfolgreich eingeloggt!</h1>');
		    		setTimeout(function(){
	    				$scope.$apply(function(){
	    					$scope.close();
	    				});
		    		},4000);

				}
			},
			error: function(e){
          		alert('Unable to get location: ' + e.message);
			}
		});
	};

	$scope.logout = function() {
		$http.get('http://kaz.kochab.uberspace.de/MP3/api/user/ajaxlogin?service=logout')
		.then(function(result) {
			console.log(result);
			localStorage.removeItem('userData');

			$('.logout').text('Erfolgreich ausgeloggt')
			setTimeout(function(){
				$('.logout').attr('href', 'index.html').click();
    		},4000);

		});
	}

});


