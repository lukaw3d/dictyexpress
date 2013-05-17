$(function () {

		currentExperiment = {
			"species": "D. discoideum",
			"strain": "AX4",
			"growth": "KA"
		};
		profile = {
			// displayed genes
			"DDB_G0273069": [ 38517.390436, 10468.991257, 5120.999755, 4599.216053, 6008.108929, 9891.453052, 7006.916784 ],
			"DDB_G0279387": [ 55552.413897, 14083.098324, 3052.53189, 2937.61897, 1731.729698, 1948.400179, 1931.351379 ],
			"DDB_G0284861": [ 32727.034273, 19346.784749, 6438.15899, 9452.846883, 8899.117963, 8974.251067, 7498.366213 ],
			"DDB_G0285597": [ 43103.74384, 16338.426274, 3365.145447, 3168.372899, 1702.320396, 2161.586845, 2028.246308 ],
			"DDB_G0289025": [ 21680.492921, 7436.382207, 1663.542156, 1859.91882, 1147.012705, 1176.374009, 1183.427 ]
		};

		var dataForSeries=[];
		for(ee in profile){
			dataForSeries.push(
			{
				name: ee,
				data: profile[ee]
			}
			);
		}
		
		
		
        $('#container').highcharts({
			credits: {enabled:false},			
            chart: {type: 'line'},
            title: {
                text: 'Expression Profile:',
                x: -20 //center
            },
            subtitle: {
                text: currentExperiment.species+' / '+currentExperiment.strain+' / '+currentExperiment.growth,
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
    });