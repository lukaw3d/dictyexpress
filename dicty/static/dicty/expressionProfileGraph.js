function ProfileGraph($scope, $http){
	$scope.specie = 'D. discoideum';
	var profile = null;
	var currentExperiment = null;
	$scope.selectedDDBs = ["DDB_G0273069","DDB_G0279387","DDB_G0284861","DDB_G0285597","DDB_G0289025"];
	$scope.selectedGene = $scope.selectedDDBs[0];
	
	$scope.reload = function(){
		profile = null;
		currentExperiment = null;
		$scope.refresh();
		$http.get('api/experiment').success(function(data){
			for(var i in data){
				if(i["species"]==$scope.specie) currentExperiment = data[i];
			}
			$scope.refresh();
		});
		$http.get('api/profile?'+encodeURI('ddbs='+$scope.selectedDDBs.join(",")+'&species='+$scope.specie)).success(function(data){
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
				text: 'Expression Profile',
				x: -20 //center
			},
			subtitle: {
				text: currentExperiment ? (currentExperiment.species+' / '+currentExperiment.strain+' / '+currentExperiment.growth) : "",
				x: -20
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
						text: 'Export'					
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
						str += '<br><span style="color:'+point.series.color+'; font-size:80%;">'+ point.series.name +': '+ point.y +'</span>';
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
							$scope.selectedGene = $scope.selectedDDBs[this.index];
							refreshOneGene($scope.selectedGene);
						}
					}
				}
			},
			// get data
			series: dataForSeries
	
		});
	};
	
	$scope.reload();
}
