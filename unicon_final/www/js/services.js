'use strict';

/* Services */

var uniconServices = angular.module('uniconServices', ['ngResource']);

uniconServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);