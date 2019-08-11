'use strict';

angular
  .module('activities.module')
  .controller('activitiesCtrl', function($scope) {
    console.log('activitiesCtrl');
    var request = new XMLHttpRequest();
    request.open("GET", "json/activities.json", false);
    request.send(null)
    var my_JSON_object = JSON.parse(request.responseText);
    //console.log(my_JSON_object["items"]);
    $scope.Activities = [];
    angular.forEach(my_JSON_object["items"], function(data){
    	var activityObj = {};
    	activityObj['id'] = data.id;
    	activityObj['name'] = data.name;
    	activityObj['startTime'] = data.startTime;
    	activityObj['endTime'] = data.endTime;
    	activityObj['durationMin'] = data.durationMin;
    	activityObj['state'] = data.state['name'];
    	var i;

    	for(i in data.objects)
    	  activityObj['object'] = data.objects[i].name;
    	if(activityObj['object']==undefined){
    	  for(i in data.datacenters)
    	  activityObj['datacenter'] = data.datacenters[i].name;
    	  }
    	else
    	  activityObj['datacenter'] = "";
    	$scope.Activities.push(activityObj);
    });
    //console.log($scope.RGs);
  });
