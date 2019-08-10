'use strict';

angular
  .module('activities.module')
  .controller('activityCtrl', function($scope, $stateParams) {
    console.log('activitiesCtrl');
    console.log($stateParams);
});
