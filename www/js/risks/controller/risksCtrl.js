'use strict';

angular
  .module('risks.module')
  .controller('risksCtrl', function($scope) {
    console.log('risksCtrl');
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
    request.open("GET", "json/risks.json", false);
    request.send(null)
    var my_JSON_object = JSON.parse(request.responseText);
    //console.log(my_JSON_object["items"]);
    $scope.Risks = [];
    angular.forEach(my_JSON_object["items"], function(data){
    	var riskObj = {};
    	riskObj['name'] = data.name;
    	riskObj['severity'] = data.severity["name"];
    	riskObj['object'] = data.affectedObject['name'];
    	$scope.Risks.push(riskObj);
    });
    //console.log($scope.RGs);
  });
