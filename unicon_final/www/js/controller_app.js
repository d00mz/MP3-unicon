'use strict';
var app = angular.module('unicon', ['geolocation']);

app.controller('AppCtrl', function($scope, $http, geolocation, $location, Auth) {
	$scope.loginData = {};
	$scope.myJams = '';
	$scope.userData = Auth.getUser();

	$scope.createLink = 'konzert_erstellen.html';
	$scope.myJamLink = 'myjams.html';


	if(typeof Auth.getUser()['id'] != 'undefined'){
		$http.get('http://kaz.kochab.uberspace.de/MP3/api/user/getmyjamcount?id='+Auth.getData("id")).then(function(result) {
		  	console.log(result);
		   $scope.myJams = result.data;
		});
		$scope.createLink = 'konzert_erstellen.html';
		$scope.myJamLink = 'myjams.html';
	} else {
		$scope.createLink = '#';
		$scope.myJamLink = '#';
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
								$scope.myJamLink = 'myjams.html';
		    				});
			    		},4000);
					} catch(e){
						alert('Es gab ein Fehler beim Anmelden');
						console.log(e);
					}
					


				}
			},
			error: function(e){
          		alert('Unable to get location: ' + e);
			}
		});
	};

	$scope.logout = function() {
		console.log('logging user out');
		Auth.logout();
	}

});



