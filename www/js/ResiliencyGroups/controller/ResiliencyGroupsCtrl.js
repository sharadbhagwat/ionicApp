'use strict';

angular
  .module('resiliencyGroups.module')
  .controller('ResiliencyGroupsCtrl', function($scope) {
    console.log('ResiliencyGroupsCtrl');

    var request = new XMLHttpRequest();
    request.open("GET", "json/resiliencyGroups.json", false);
    request.send(null)
    var my_JSON_object = JSON.parse(request.responseText);
    console.log(my_JSON_object["items"]);

    $scope.RGs = [];
    angular.forEach(my_JSON_object["items"], function(data){
    	var rgObj = {};
    	rgObj['name'] = data.name;
    	rgObj['state'] = data.state["name"];
    	$scope.RGs.push(rgObj);
    });
	//console.log($scope.RGs);

  });
