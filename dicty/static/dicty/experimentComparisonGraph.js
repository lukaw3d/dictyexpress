function ComparisonGraph($scope, $http) {
	var selectedToCompare = "DDB_G0279387";
	var comparison = null;

	$http.get('api/comparison?ddb='+selectedToCompare).success(function(data) {
		comparison = data;
		refresh();
	});
	
	function refresh(){
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
				text: 'Experiment Comparison for gene '+selectedToCompare,
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
			tooltip: {
				shared: true,
				crosshairs: true,
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
					pointInterval: 4 
				}
			},
			// get data
			series: dataForSeries
		});
	}
	
	refresh();
}