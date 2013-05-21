function WingGraph($scope, $http) {
	$scope.selectedType="dd_pre_pre";
	$scope.selectedDDBs = ["DDB_G0273069","DDB_G0279387","DDB_G0284861","DDB_G0285597","DDB_G0289025"];
	var dataUrl;
	var imgUrl;
	var wingyData = {};
	$scope.reload = function(){
		wingyData = {};
		dataUrl = 'http://dictyexpress.biolab.si/script/get_volcano_new.py?gene%5Fgid%5Flist='+$scope.selectedDDBs.join(",")+'&org='+$scope.selectedType+'&pass1=rnaseq&user1=rnaseq';
		imgUrl = 'http://dictyexpress.biolab.si/script//volcano/'+$scope.selectedType+'.png';
		$http.get(dataUrl).success(function(data) {
			alert("probably no crossDomain access " + data);
			var lines = data.split(/\r?\n/);
			var firsts = lines.splice(0,1).split("\t");
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
			tooltip: {
				pointFormat: '{point.x}, {point.y}'
			},
			// get data
			series: wingyData.points,
			
		});
	};
	$scope.reload();
}