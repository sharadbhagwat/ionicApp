'use strict';

angular
  .module('resiliencyGroups.module')
  .controller('RgActivitiesCtrl', function($scope, $stateParams) {
    console.log('RgActivitiesCtrl');
    
    var jsonFileName = "json/" + $stateParams.rgId + "-activities.json"
	var request = new XMLHttpRequest();
	request.open("GET", jsonFileName, false);
	request.send(null);
    var my_JSON_object = JSON.parse(request.responseText);
    console.log(my_JSON_object["items"]);
    
    $scope.RGActivities = [];
    angular.forEach(my_JSON_object["items"], function(data){
    	var rgObj = {};
    	rgObj['rgId'] = data.id;
    	rgObj['name'] = data.name;
    	rgObj['startTime'] = data.startTime;
    	rgObj['endTime'] = data.endTime;
    	$scope.RGActivities.push(rgObj);
    });
	console.log($scope.RGs);
    
  });
