'use strict';

angular.module('resiliencyGroups.module').controller('ResiliencyCtrl',
		function($scope, $stateParams) {
			$scope.rgId = $stateParams.rgId;
			console.log($stateParams.rgId);

			var jsonFileName = "json/" + $stateParams.rgId + ".json"
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
			$scope.recoverability = $scope.risks['risk.recoverability'];
			$scope.continuity = $scope.risks['risk.continuity'];
			$scope.sla = $scope.risks['risk.sla'];
			$scope.assets = [];
			angular.forEach(my_JSON_object["assets"], function(data) {
				var assetsObj = {};
				assetsObj['name'] = data.name;
				$scope.assets.push(assetsObj);
			});

			$scope.activeDC = my_JSON_object["activeDatacenters"][0].name;
			$scope.serviceObjective = my_JSON_object["serviceObjective"].name;

			
			console.log($scope.rgObj);
			
			//Activities details 
			jsonFileName = "json/" + $stateParams.rgId + "-activities.json"
			request = new XMLHttpRequest();
			request.open("GET", jsonFileName, false);
			request.send(null);
			my_JSON_object = JSON.parse(request.responseText);
			console.log(my_JSON_object);
			
			
			var activityObj = {};
			activityObj['success'] = my_JSON_object["meta"]["activity.success"];
			activityObj['fail'] = my_JSON_object["meta"]["activity.fail"];
			activityObj['abort'] = my_JSON_object["meta"]["activity.abort"];
			activityObj['pause'] = my_JSON_object["meta"]["activity.pause"];
			activityObj['pending'] = my_JSON_object["meta"]["activity.pending"];
			activityObj['cancel'] = my_JSON_object["meta"]["activity.cancel"];
			activityObj['running'] = my_JSON_object["meta"]["activity.running"];
			
			
			
			 Highcharts.chart('activitiesDetails', {
			        chart: {
			            plotBackgroundColor: null,
			            plotBorderWidth: null,
			            plotShadow: false,
			            type: 'pie'
			        },
			        title: {
			            text: 'Activities Details'
			        },
			        tooltip: {
			            pointFormat: '<b>{point.name}</b>:<br>{point.percentage:.1f} %<br>Activities: {point.y}'
			        },
			        plotOptions: {
			            pie: {
			                allowPointSelect: false,
			                cursor: 'pointer',
			                dataLabels: {
			                    enabled: true,
			                    format: '<b>{point.name}</b>:<br>{point.percentage:.1f} %<br>Activities: {point.y}'
			                },
			                showInLegend: true
			            }
			        },
			        
			        series: [{
			        	
			           // name: 'Risk Cetegory',
			            colorByPoint: true,
			            data: [{
			                name: 'Finished',
			                y: activityObj['success'],
			                sliced: true,
			                selected: true
			            }, {
			                name: 'Failed',
			                y: activityObj['fail']
			            }, {
			                name: 'Aborted',
			                y: activityObj['abort']
			            }, {
			                name: 'Paused',
			                y: activityObj['pause']
			            }, {
			                name: 'Pending',
			                y: activityObj['pending']
			            }, {
			                name: 'Cancelled',
			                y: activityObj['cancel']
			            }, {
			                name: 'Running',
			                y: activityObj['running']
			            }]
			        }]
			    });
			    
			
			
			
		});