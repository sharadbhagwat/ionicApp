'use strict';

angular
  .module('activities.module')
  .config(function config($stateProvider) {
    $stateProvider
      .state('app.activities', {
        url: '/activities',
        views: {
          'menuContent': {
            templateUrl: 'templates/activities.html',
            controller: 'activitiesCtrl'
          }
        }
      })
      .state('app.activity', {
    	    url: '/activities/:activityId',
    	    views: {
    	      'menuContent': {
    	        templateUrl: 'templates/activity.html',
    	        controller: 'activityCtrl'
    	      }
    	    }
    	  });
  });
