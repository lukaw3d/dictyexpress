function ComparisonGraph($scope, $http) {
	$scope.selectedToCompare = "DDB_G0279387";
	var comparison = null;

	$scope.reload = function(){
		comparison = null;
		$scope.refresh();
		$http.get('api/comparison?ddb='+$scope.selectedToCompare).success(function(data) {
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
		}
		if(names.length > 5){ //limit too large subtitle
			names = names.splice(0,5);
			names.push("...");
		}

		$('#containerComparisonGraph').highcharts({
			//getIme = "D. discoideum";
			credits: {enabled:false},
			chart: {type: 'line'},
			title: {
				text: 'Experiment Comparison for gene '+$scope.selectedToCompare,
				x: -20 //center
			},
			subtitle: {
				text: names.join(" / "),
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
					},

					customButton:
					{
					
						symbol: 'circle',
						text: 'Extra button',
						onclick: function() {
							alert('Extra'); 
						}
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
						str += '<br><span style="color:'+point.series.color+'">'+ point.series.name +': '+ point.y +'</span>';
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
							refreshSpecies(this.name);
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