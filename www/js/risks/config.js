'use strict';

angular
  .module('risks.module')
  .config(function config($stateProvider) {
    $stateProvider
      .state('app.risks', {
        url: '/risks',
        views: {
          'menuContent': {
            templateUrl: 'templates/risks.html',
            controller: 'risksCtrl'
          }
        }
      })
  });
