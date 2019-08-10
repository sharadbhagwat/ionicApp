'use strict';

angular
  .module('activities.module')
  .controller('activitiesCtrl', function($scope) {
    console.log('activitiesCtrl');
//    var xhttp = new XMLHttpRequest();
//    var url = "https://10.221.196.17/api/risks";
//    xhttp.onreadystatechange = function() {
//        console.log(xhttp.responseText);
//    };
//    xhttp.open("GET", url, true);
//    xhttp.setRequestHeader("Accept","application/json");
//    xhttp.setRequestHeader("Content-Type","application/json");
//    xhttp.setRequestHeader("X-VRP-API-VERSION","LATEST");
//    //xhttp.setRequestHeader("Access-Control-Allow-Origin","https://localhost:8100");
//    xhttp.setRequestHeader("Authorization","Bearer 97ceab11f1fb87af631fa34ee9c7f4e2739ba29ee938e8c4d765e75e75c57f27::1B6BE9698E3C4C4597CACB2BB2343CE8");
//    xhttp.send();
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
