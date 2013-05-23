function WingGraph($scope, $http, $rootScope) {
	$scope.root = $rootScope;
	if(!$rootScope.selectedType) $rootScope.selectedType="dd_pre_pre";
	$scope.possibleTypes = null;
	$http.get('api/allowedWingy').success(function(data) {
		$scope.possibleTypes = data;
	});
	$rootScope.$watch("selectedDDBs", function() {
		$scope.reload();
    }, true);
	var dataUrl;
	var imgUrl;
	var wingyData = {};
	$scope.reload = function(){
		wingyData = {};
		dataUrl = 'api/wingy?'+encodeURI('ddbs='+$rootScope.selectedDDBs.join(",")+'&type='+$rootScope.selectedType);
		imgUrl = 'http://dictyexpress.biolab.si/script//volcano/'+$rootScope.selectedType+'.png';
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
				text: null,
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
				valueDecimals: 2,
				formatter: function() {
					return '<span style="color:'+this.series.color+'">'+this.series.name+'</span>: <br>x: '+this.x.toFixed(3)+'<br>y: '+this.y.toFixed(3);
				}
			},
			// get data
			series: wingyData.points,
			
		});
	};
	
	$scope.cuteString = function(str){
		var strspl = str.split("_");
		strspl[0] = strspl[0].toUpperCase();
		if(strspl[1]=="pre"){
			strspl[1]="prespore";
			strspl[2]="prestalk";
		}
		if(!isNaN(parseInt(strspl[1]))) strspl[1] = parseInt(strspl[1])+"h";
		if(!isNaN(parseInt(strspl[2]))) strspl[2] = parseInt(strspl[2])+"h";
		return strspl[0]+" "+strspl[1]+"/"+strspl[2];
	}
}