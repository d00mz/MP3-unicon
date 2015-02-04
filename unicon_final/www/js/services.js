app.factory('Auth', function($rootScope,geolocation,$http){
	$rootScope.userData = JSON.parse(localStorage.getItem('userData'));
	console.log($rootScope.userData);
	if($rootScope.userData == null){
		$rootScope.userData = {};
		console.log('userdata is null');
	} else {
		console.log('userdaten vorhanden');
	}

	navigator.geolocation.getCurrentPosition(function(position){
		$rootScope.$apply(function(){
			console.log($rootScope.userData);
			var geoObj = {
				geo: [position.coords.latitude,position.coords.longitude]
			};

			$rootScope.userData = angular.extend($rootScope.userData, geoObj);

			console.log('set geo');
			console.log($rootScope.userData);
			localStorage.setItem('userData', JSON.stringify($rootScope.userData));
		});
	});


	return{
		setUser : function(aUser){
			console.log($rootScope.userData);
			console.log(aUser);
			$rootScope.userData = angular.extend($rootScope.userData, JSON.parse(aUser));
			console.log($rootScope.userData);
			localStorage.setItem('userData', JSON.stringify($rootScope.userData));
		},
		isLoggedIn : function(){
			if(typeof $rootScope.userData['id'] != 'undefined'){
				return false;
			} else {
				return true;
			}
		},
		getUser : function(){
			return $rootScope.userData;
		},
		getData : function(key){
			return $rootScope.userData[key];
		},
		getUserPosition : function(){
			return $rootScope.userData.geo;
		},
		logout: function(){
			$http.get('http://kaz.kochab.uberspace.de/MP3/api/user/ajaxlogin?service=logout')
			.then(function(result) {
				console.log(result);
				var geoObj = {geo: $rootScope.userData.geo };
				$rootScope.userData = {};
				$rootScope.userData = angular.extend($rootScope.userData,geoObj);
				localStorage.removeItem('userData');
				localStorage.setItem('userData', JSON.stringify($rootScope.userData));

				$('.logout').text('Erfolgreich ausgeloggt')
				setTimeout(function(){
					$('.logout').removeAttr('ng-click').attr('href', 'index.html');
					$('.logout').click();
	    		},2000);

			});
		}
	}
});
