'use strict';

angular
  .module('resiliencyGroups.module')
  .config(function config($stateProvider) {
    $stateProvider
      .state('app.resiliencyGroups', {
        url: '/resiliencyGroups',
        views: {
          'menuContent': {
            templateUrl: 'templates/resiliencyGroups.html',
            controller: 'ResiliencyGroupsCtrl'
          }
        }
      })
      
      .state('app.resiliencyGroup', {
    	    url: '/resiliencyGroups/:rgId',
    	    views: {
    	      'menuContent': {
    	        templateUrl: 'templates/resiliencyGroup.html',
    	        controller: 'ResiliencyCtrl'
    	      }
    	    }
    	  });
  });
