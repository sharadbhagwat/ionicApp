'use strict';

angular
  .module('activities.module')
  .controller('activityCtrl', function($scope, $stateParams) {
    console.log('activitiesCtrl');
    var jsonFileName = "json/" + $stateParams.activityId + "-activityId.json"
	var request = new XMLHttpRequest();
	request.open("GET", jsonFileName, false);
	request.send();
	var my_JSON_object = JSON.parse(request.responseText);
	console.log(my_JSON_object);
    
	$scope.activityName = my_JSON_object.name;
	$scope.startTime = my_JSON_object.startTime;
	$scope.endTime = my_JSON_object.endTime;
	$scope.durationMin = my_JSON_object.durationMin;
	$scope.state = my_JSON_object['state'].name;
	
    $scope.objects=[];
    angular.forEach(my_JSON_object["objects"], function(data){
    	var rgObj = {};
    	rgObj['name'] = data.name;
    	rgObj['type'] = data.type["name"];
    	$scope.objects.push(rgObj);
    });
    
    console.log($stateParams);
});
