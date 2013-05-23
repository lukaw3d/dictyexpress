function ProfileGraph($scope, $http, $rootScope){
	var pExperiment = function(){return $rootScope.experiment;};
	$rootScope.$watch("selectedDDBs", function() {
		$scope.reload();
    });
	$rootScope.$watch("selectedSpecies", function() {
		$scope.reload();
    });
	
	var profile = null;
	var currentExperiment = null;
	$rootScope.selectedDDBs = ["DDB_G0273069","DDB_G0279387","DDB_G0284861","DDB_G0285597","DDB_G0289025"];
	
	$scope.reload = function(){
		profile = null;
		currentExperiment = null;
		$scope.refresh();
		
		for(var i in pExperiment()){
			if(pExperiment()[i]["species"]==$rootScope.selectedSpecies) currentExperiment = pExperiment()[i];
		}
		$scope.currentExperiment = currentExperiment;
		
		$http.get('api/profile?'+encodeURI('ddbs='+$rootScope.selectedDDBs.join(",")+'&species='+$rootScope.selectedSpecies)).success(function(data){
			profile = data;
			$scope.refresh();
		});
	};
	$scope.refresh = function(){
		var dataForSeries=[{name: " ",data: []}];
		if(profile){
			dataForSeries=[];
			for(ee in profile){
				dataForSeries.push({
					name: ee,
					data: profile[ee]
				});
			}
		}
		
		$('#containerProfileGraph').highcharts({
			credits: {enabled:false},			
			chart: {type: 'line'},
			title: {
				text: null,
				x: -20 //center
			},
			xAxis: {
				title: {text: 'time [hrs]'},
				min: 0,
				max: 24,
				tickInterval: 2
			},
			yAxis: {
				title: {
					text: 'Scaled Read Counts'
				},
				min:0,
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}],
				labels: {format: '{value}'}
			},
			exporting: {
				enabled: true,

				buttons: 			
				{
					contextButton:{
						enabled: true,
						text: 'Export',
						menuItems: [{
							text: 'Export to PNG',							
							onclick: function() {
								this.exportChart({
									type: 'image/png'
								});
							}
						}, {
							text: 'Export to PDF',							
							onclick: function() {
								this.exportChart({
									type: 'application/pdf'
								});
							},
							separator: false
						}, {
							text:'null',
							separator: true
						},{
							text: 'Print chart',							
							onclick: function() {
								this.print();
							},
							separator: false							
						}]
					}

				}
			},
			tooltip: {
				shared: true,
				crosshairs: true,
				positioner: function (boxWidth, boxHeight, point) {
					return {x:point.plotX, y:0};
				},
				formatter: function() {
					var str = 'Time: <b>'+ this.x +'h';
					$.each(this.points, function(i, point) {
						if(point.y) str += '<br><span style="color:'+point.series.color+';">'+ point.series.name +': '+ point.y.toFixed(3) +'</span>';
					});
					return str;
				}
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'top',
				x: -10,
				y: 100,
				borderWidth: 0
			},
			plotOptions: {
				series: {
					pointStart: 0,
					pointInterval: 4,
					cursor: 'pointer',
					events: {
						click: function(event) {
							angular.element('[ng-controller=ComparisonGraph]').scope().selectedOneGene = dataForSeries[this.index].name;
							angular.element('[ng-controller=ComparisonGraph]').scope().$digest();
						}
					}
				}
			},
			// get data
			series: dataForSeries
	
		});
	};
}
