// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers']).run(function($ionicPlatform) {

	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});

})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('app', {
		url: "/app",
		abstract: true,
		templateUrl: "http://kaz.kochab.uberspace.de/MP3-unicon/unicon_ionic/www/templates/menu.html",
		controller: 'AppCtrl'
	})

	.state('app.profil', {
		url: "/app",
		abstract: true,
		templateUrl: "http://kaz.kochab.uberspace.de/MP3-unicon/unicon_ionic/www/templates/profil.html",
		controller: 'AppCtrl'
	})

	.state('app.home', {
		url: "/",
		views: {
			'menuContent': {
				templateUrl: "http://kaz.kochab.uberspace.de/MP3-unicon/unicon_ionic/www/templates/home.html",
				controller: 'HomeCtrl'
			}
		}
	})


	.state('app.browse', {
		url: "/browse",
		views: {
			'menuContent': {
				templateUrl: "http://kaz.kochab.uberspace.de/MP3-unicon/unicon_ionic/www/templates/browse.html",
				controller: 'BrowseCtrl'
			}
		}
	})

	.state('app.detail', {
		url: "/browse/:jamId",
		views: {
			'menuContent': {
				templateUrl: "http://kaz.kochab.uberspace.de/MP3-unicon/unicon_ionic/www/templates/detail.html",
				controller: 'JamdetailCtrl'
			}
		}
	})

	.state('app.myjams', {
		url: "/myjams",
		views: {
			'menuContent': {
				templateUrl: "http://kaz.kochab.uberspace.de/MP3-unicon/unicon_ionic/www/templates/myjams.html",
				controller: 'MyJamCtrl'
			}
		}
	})

	.state('app.create', {
		url: "/create",
		views: {
			'menuContent': {
			  templateUrl: "http://kaz.kochab.uberspace.de/MP3-unicon/unicon_ionic/www/templates/create.html",
			  controller: 'CreateCtrl'
			}
		}
	});
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/');
})

.directive('onFinishRender',['$timeout', function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			if (scope.$last === true) {
				scope.$evalAsync(attr.onFinishRender);
			}
		}
	};
}]);

/*function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var radlon1 = Math.PI * lon1/180
	var radlon2 = Math.PI * lon2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	dist = dist * 1.609344;
	return dist
}*/