'use strict';

angular
  .module('resiliencyGroups.module')
.controller('ResiliencyCtrl', function($scope, $stateParams) {
	$scope.rgId = $stateParams.rgId;
	console.log($stateParams.rgId);
	
	var jsonFileName = "json/"+$stateParams.rgId+".json"
	 var request = new XMLHttpRequest();
    request.open("GET", jsonFileName, false);
	 
	    request.send(null);
	    var my_JSON_object = JSON.parse(request.responseText);
	    console.log(my_JSON_object);
	    $scope.rgObj = {};
	    $scope.rgObj['name'] = my_JSON_object.name;
	    $scope.rgObj['underMaintenance'] = my_JSON_object.underMaintenance;
	    $scope.rgObj['state'] = my_JSON_object["state"].name;
	    $scope.rgObj['health'] = my_JSON_object["health"].name;
	   
	    $scope.risks = my_JSON_object["risks"].category;
	    $scope.recoverability =$scope.risks['risk.recoverability']; 
	    $scope.continuity =$scope.risks['risk.continuity']; 
	    $scope.sla =$scope.risks['risk.sla']; 
	    $scope.assets = [];
	    angular.forEach(my_JSON_object["assets"], function(data){
	    	var assetsObj = {};
	    	assetsObj['name'] = data.name;
	    	$scope.assets.push(assetsObj);
	    });
	    
	    $scope.activeDC = my_JSON_object["activeDatacenters"][0].name;
	    $scope.serviceObjective = my_JSON_object["serviceObjective"].name;
	    
	     /*$scope.rgObj['activeDatacenters'] = activeDC[0].name;*/
	    
	   /* $scope.RGs = [];
	    angular.forEach(my_JSON_object["items"], function(data){
	    	var rgObj = {};
	    	rgObj['rgId'] = data.id;
	    	rgObj['name'] = data.name;
	    	rgObj['state'] = data.state["name"];
	    	$scope.RGs.push(rgObj);
	    });*/
		console.log($scope.rgObj);
});