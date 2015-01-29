'use strict';
var app = angular.module('unicon', ['geolocation']);

app.controller('AppCtrl', function($scope, $http, geolocation, $location, Auth) {
	$scope.loginData = {};
	$scope.myJams = '';

	$scope.createLink = 'konzert_erstellen.html';


	if(typeof Auth.getUser()['id'] != 'undefined'){
		$http.get('http://kaz.kochab.uberspace.de/MP3/api/user/getmyjamcount?id='+Auth.getData("id")).then(function(result) {
		  	console.log(result);
		   $scope.myJams = result.data;
		});
		$scope.createLink = 'konzert_erstellen.html';
	} else {
		$scope.createLink = '#';
	}


	$scope.login = function (){
		console.log(JSON.parse(localStorage.getItem('userData')));
		if(Auth.isLoggedIn()){
			console.log('login');
	  		$('body').addClass('showOverlay').addClass('hideNavigation');
	  	} else {
	  		console.log('redirect');
	  		//$location.path('profil.html');
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
						console.log('auth gibts net');
						Auth.setUser(data);
	    				$('form').slideUp().after('<h1>Sie haben sich erfolgreich eingeloggt!</h1>');
			    		setTimeout(function(){
		    				$scope.$apply(function(){
		    					$scope.close();
		    					$scope.createLink = 'konzert_erstellen.html';
		    				});
			    		},4000);
					} catch(e){
						alert('Es gab ein Fehler beim Anmelden');
						console.log(e);
					}
					


				}
			},
			error: function(e){
          		alert('Unable to get location: ' + e.message);
			}
		});
	};

	$scope.logout = function() {
		/*$http.get('http://kaz.kochab.uberspace.de/MP3/api/user/ajaxlogin?service=logout')
		.then(function(result) {
			console.log(result);
			localStorage.removeItem('userData');

			$('.logout').text('Erfolgreich ausgeloggt')
			setTimeout(function(){
				$('.logout').attr('href', 'index.html').click();
    		},4000);

		});*/
		Auth.logout();
	}

});



