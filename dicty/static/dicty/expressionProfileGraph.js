function ProfileGraph($scope, $http){
	var specie = 'D. discoideum';
	var profile = null;
	var currentExperiment = null;
	var selectedDDBs = ["DDB_G0273069","DDB_G0279387","DDB_G0284861","DDB_G0285597","DDB_G0289025"];

	$http.get('api/experiment').success(function(data){
		for(var i in data){
			if(i["species"]==specie) currentExperiment = data[i];
		}
		refresh();
	});
	$http.get('api/profile?'+encodeURI('ddbs='+selectedDDBs.join(",")+'&species='+specie)).success(function(data){
		profile = data;
		refresh();
	});
	function refresh(){
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
			tooltip: {
				shared: true,
				crosshairs: true,
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
					pointInterval: 4 
				}
			},
			// get data
			series: dataForSeries
	
		});
	}
	
	refresh();
}
