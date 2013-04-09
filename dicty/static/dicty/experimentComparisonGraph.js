$(function () {
	// some data first
	


comparison = {

		"D. discoideum": {
			"data": [ 55552.413897, 14083.098324, 3052.53189, 2937.61897, 1731.729698, 1948.400179, 1931.351379 ],
			"species": "D. discoideum",
			"strain": "AX4",
			"growth": "KA"
		},
		"D. purpureum": {
			"data": [ 50981.130901, 12122.766544, 4382.060099, 1448.216945, 465.340046, 689.418326, 625.21427 ],
			"species": "D. purpureum",
			"strain": "dp1AX1",
			"growth": "KA"
		}
};
		var dataForSeries=[];
		var names = [];
		for(ee in comparison){
			names.push(ee);
			dataForSeries.push(
			{
				name: ee,
				data: comparison[ee].data
			}
			);
		}
		if(names.length > 5){ //limit too large subtitle
			names = names.splice(0,5);
			names.push("...");
		}

        $('#container').highcharts({
        	//getIme = "D. discoideum";
			credits: {enabled:false},
            chart: {type: 'line'},
            title: {
                text: 'Experiment Comparison for gene :',
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
    });