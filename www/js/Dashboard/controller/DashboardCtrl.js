'use strict';

angular
  .module('dashboard.module')
  .controller('DashboardCtrl', function($scope) {
	  
	    var request = new XMLHttpRequest();
	    request.open("GET", "json/assets.json", false);
	    request.send(null);
	    var my_JSON_object = JSON.parse(request.responseText);
	    
	   //var my_JSON_object = loadDoc("http://localhost:8080/VRPRestAPI/api/assets");
	    
	    var request1 = new XMLHttpRequest();
	    request1.open("GET", "json/risks.json", false);
	    request1.send(null);
	    var my_JSON_object_risk = JSON.parse(request1.responseText);
	    
	    
	    var rgObj = {};
	    rgObj['LinuxData'] = my_JSON_object["hosts"]["operatingSystem"]["Linux"];
	    rgObj['WindowsData'] = my_JSON_object["hosts"]["operatingSystem"]["Windows"];
	    rgObj['UnknownData'] = my_JSON_object["hosts"]["operatingSystem"]["Unknown"];
        
        
        var riskObj = {};
        riskObj['recoverability'] = my_JSON_object_risk["meta"]["category"]["risk.recoverability"];
        riskObj['continuity'] = my_JSON_object_risk["meta"]["category"]["risk.continuity"];
        riskObj['sla'] = my_JSON_object_risk["meta"]["category"]["risk.sla"];
        
    console.log('DashboardCtrl');
 // Build the chart
    Highcharts.chart('hostsDetails', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Hosts by Platform and OS'
        },
        tooltip: {
            pointFormat: '<b>{point.name}</b>:<br>{point.percentage:.1f} %<br>Hosts: {point.y}'
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>:<br>{point.percentage:.1f} %<br>Hosts: {point.y}'
                },
                showInLegend: true
            }
        },
        
        series: [{
        	
            name: 'Hosts',
            colorByPoint: true,
            data: [{
                name: 'Linux',
                
                y: rgObj['LinuxData'],
                sliced: true,
                selected: true
            }, {
                name: 'Windows',
                y: rgObj['WindowsData']
            }, {
                name: 'Unknown',
                y: rgObj['UnknownData']
            }]
        }]
    });
    
    
    
    Highcharts.chart('riskDetails', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Risk Details'
        },
        tooltip: {
            pointFormat: '<b>{point.name}</b>:<br>{point.percentage:.1f} %<br>Total: {point.y}'
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>:<br>{point.percentage:.1f} %<br>Total: {point.y}'
                },
                showInLegend: true
            }
        },
        
        series: [{
        	
           // name: 'Risk Cetegory',
            colorByPoint: true,
            data: [{
                name: 'Recoverability',
                y: riskObj['recoverability'],
                sliced: true,
                selected: true
            }, {
                name: 'Continuity',
                y: riskObj['continuity']
            }, {
                name: 'SLA',
                y: riskObj['sla']
            }]
        }]
    });
    
    
    
    function loadDoc(url) {
    	  var xhttp = new XMLHttpRequest();
    	 // var url = "http://192.168.1.143:8080/SpringBootRestApi/api/user/";
    	  $scope.responseText = undefined;
    	  xhttp.onreadystatechange = function() {
    	  	$scope.responseText = xhttp.responseText;
    	  	
    	  	if(angular.isDefined($scope.responseText) && $scope.responseText!=""){
    	  		return $scope.responseText;
    	  	}
    	  };
    	  xhttp.open("GET", url, true);
    	  xhttp.setRequestHeader("Accept","application/json");
    		xhttp.setRequestHeader("Content-Type","application/json");
    	  xhttp.send();
    	  //return $scope.responseText;
    	}
 
		
  });
