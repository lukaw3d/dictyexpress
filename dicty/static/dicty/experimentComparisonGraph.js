function ComparisonGraph($scope, $http, $rootScope) {
	$scope.root = $rootScope;
	if(!$rootScope.selectedOneGene) $rootScope.selectedOneGene = "DDB_G0279387";
	var comparison = null;
	
	$rootScope.$watch("selectedOneGene", function() {
		$scope.reload();
    }, true);
	
	$scope.reload = function(){
		comparison = null;
		$scope.refresh();
		$http.get('api/comparison?ddb='+$rootScope.selectedOneGene).success(function(data) {
			comparison = data;
			$scope.refresh();
		});
	};
	$scope.refresh = function(){
		var dataForSeries=[{name: " ",data: []}]
		var names = [];
		if(comparison){
			dataForSeries=[];
			for(ee in comparison){
				names.push(ee);
				dataForSeries.push({
					name: ee,
					data: comparison[ee].data
				});
			}
			$scope.names = names;
		}
		
		$('#containerComparisonGraph').highcharts({
			//getIme = "D. discoideum";
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
						str += '<br><span style="color:'+point.series.color+'">'+ point.series.name +': '+ point.y.toFixed(3) +'</span>';
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
							$rootScope.selectedSpecies = this.name;
							$rootScope.$digest();
						}
					}
				}
			},
			// get data
			series: dataForSeries
		});
	};
}