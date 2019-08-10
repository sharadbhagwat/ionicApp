'use strict';

angular
  .module('resiliencyGroups.module')
  .controller('ResiliencyGroupsCtrl', function($scope) {
	  
	  
    console.log('ResiliencyGroupsCtrl');
    
    
 //  loadData();
    
    var request = new XMLHttpRequest();
    request.open("GET", "json/resiliencyGroups.json", false);
    request.send(null)
    var my_JSON_object = JSON.parse(request.responseText);
    console.log(my_JSON_object["items"]);
    
    $scope.RGs = [];
    angular.forEach(my_JSON_object["items"], function(data){
    	var rgObj = {};
    	rgObj['rgId'] = data.id;
    	rgObj['name'] = data.name;
    	rgObj['state'] = data.state["name"];
    	$scope.RGs.push(rgObj);
    });
	console.log($scope.RGs);
	
	
	function loadData() {
		var xhttp = new XMLHttpRequest();
		  var url = "http://192.168.1.143:8080/SpringBootRestApi/api/user/";
		  xhttp.onreadystatechange = function() {
		  alert(xhttp.responseText);
		  };
		  xhttp.open("GET", url, true);
		  xhttp.setRequestHeader("Accept","application/json");
			xhttp.setRequestHeader("Content-Type","application/json");
		  xhttp.send();
		}
		
  });
