function WingGraph($scope, $http) {
	$scope.selectedType="dd_pre_pre";
	$scope.selectedDDBs = ["DDB_G0273069","DDB_G0279387","DDB_G0284861","DDB_G0285597","DDB_G0289025"];
	var dataUrl;
	var imgUrl;
	var wingyData = {};
	$scope.reload = function(){
		wingyData = {};
		dataUrl = 'api/wingy?'+encodeURI('ddbs='+$scope.selectedDDBs.join(",")+'&type='+$scope.selectedType);
		imgUrl = 'http://dictyexpress.biolab.si/script//volcano/'+$scope.selectedType+'.png';
		$http.get(dataUrl).success(function(data) {
			var lines = data.split(/\r?\n/).filter(function(e){return e;}); //clear emptys
			var firsts = lines.splice(0,1);
			firsts = firsts[0].split(" ");
			wingyData = {};
			wingyData.minx=parseFloat(firsts[0]);
			wingyData.maxx=parseFloat(firsts[1]);
			wingyData.miny=parseFloat(firsts[2]);
			wingyData.maxy=parseFloat(firsts[3]);
			wingyData.points = [];
			for(var i =0; i<lines.length; i++){
				var others = lines[i].split("\t");
				wingyData.points.push({
					name: others[0],
					data: [[parseFloat(others[1]), parseFloat(others[2])]]
				});
			}
			$scope.refresh();
		});
	};
	
	$scope.refresh = function(){
		for(var i=0;i<wingyData.points.length;i++){
			wingyData.points[i].color="#22f";
			wingyData.points[i].marker={symbol:"circle"};
		}
		
		$('#containerWingGraph').highcharts({
			credits: {enabled:false},			
			chart: {
				type: 'scatter',
				plotBackgroundImage: imgUrl
			},
			title: {
				text: 'Differential Expression Analysis',
			},
			xAxis: {
				title: {text: 'log2'},
				min: wingyData.minx,
				max: wingyData.maxx
			},
			legend: {
				enabled:false
			},
			yAxis: {
				title: {
					text: '-log10'
				},
				min:wingyData.miny,
				max:wingyData.maxy,
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
				pointFormat: '{point.x}, {point.y}'
			},
			// get data
			series: wingyData.points,
			
		});
	};
	$scope.reload();
}