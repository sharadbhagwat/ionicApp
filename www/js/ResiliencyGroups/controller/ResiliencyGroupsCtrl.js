'use strict';

angular
  .module('resiliencyGroups.module')
  .controller('ResiliencyGroupsCtrl', function($scope) {
	  
    console.log('ResiliencyGroupsCtrl');
    
    var my_JSON_object = undefined;
    
    var request = new XMLHttpRequest();
    request.open("GET", "json/resiliencyGroups.json", false);
    request.send(null);
    var my_JSON_object = JSON.parse(request.responseText);
    console.log(my_JSON_object["items"]);
    
    $scope.RGs = [];
	    angular.forEach(my_JSON_object["items"], function(data){
	    	var rgObj = {};
	    	rgObj['rgId'] = data.id;
	    	rgObj['name'] = data.name;
	    	rgObj['state'] = data.state["name"];
	    	rgObj['health'] = data.health["name"];
	    	$scope.RGs.push(rgObj);
	    });
		console.log("sa"+$scope.RGs);
    
});
    

/*
angular.module('resiliencyGroups.module').
controller('ResiliencyGroupsCtrl', function($scope, ResiliencyService){
	ResiliencyService.request().then(function(response){
		console.log(response);
		var my_JSON_object = response.data;
		$scope.RGs = [];
	    angular.forEach(my_JSON_object["items"], function(data){
	    	var rgObj = {};
	    	rgObj['rgId'] = data.id;
	    	rgObj['name'] = data.name;
	    	rgObj['state'] = data.state["name"];
	    	rgObj['health'] = data.health["name"];
	    	$scope.RGs.push(rgObj);
	    });
		console.log("sa"+$scope.RGs);
		// Response from server
	});
});
 
angular.module('resiliencyGroups.module')
.factory('ResiliencyService', function($http){
  return{
    request: function(message){
        return $http({ url:"http://localhost:8080/VRPRestAPI/api/rgs" ,method:"GET"});
    }
  }
});*/
