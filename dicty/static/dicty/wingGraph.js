function WingGraph($scope, $http) {

	wingyData = {
		imgUrl: "static/dicty/dd_prespore_04.png",
		minx: -15.3893569197,
		maxx: 15.3893569197,
		miny: -0.0,
		maxy: 4.93917671429,
		points: [
			{
				name: "DDB_G0279387",
				data: [[-1.99589541383,1.78263068253]]
			},
			{
				name: "DDB_G0284093",
				data: [[-3.30019772648,2.72630271447]]
			},
			{
				name: "DDB_G0291870",
				data: [[-3.86799803058,1.17130533007]]
			},
			{
				name: "DDB_G0279189",
				data: [[-2.72636617839,1.75288172178]]
			},
			{
				name: "DDB_G0290315",
				data: [[-3.03919831578,1.37780017423]]
			},
			{
				name: "DDB_G0278539",
				data: [[-3.94127688362,1.06840898738]]
			},
			{
				name: "DDB_G0285971",
				data: [[-1.80087212678,1.46466914627]]
			},
			{
				name: "DDB_G0291862",
				data: [[-5.32946657131,1.36108345054]]
			},
			{
				name: "DDB_G0277635",
				data: [[-0.704936457006,0.296012839029]]
			},
			{
				name: "DDB_G0280823",
				data: [[-4.25587968573,0.94494565367]]
			},
			{
				name: "DDB_G0291526",
				data: [[-2.00569734393,1.79210245318]]
			},
			{
				name: "DDB_G0275881",
				data: [[-2.99328269345,2.87600967002]]
			},
			{
				name: "DDB_G0271148",
				data: [[-3.85625531615,1.31782931232]]
			},
			{
				name: "DDB_G0285881",
				data: [[-2.42169649842,1.33985958011]]
			},
			{
				name: "DDB_G0286389",
				data: [[-2.98924205192,2.54501577352]]
			},
			{
				name: "DDB_G0285597",
				data: [[-2.67507293872,1.11574476628]]
			},
		]
	};

	for(var i=0;i<wingyData.points.length;i++){
		wingyData.points[i].color="#22f";
		wingyData.points[i].marker={symbol:"circle"};
	}
	
	$('#containerWingGraph').highcharts({
		credits: {enabled:false},			
		chart: {
			type: 'scatter',
			plotBackgroundImage: wingyData.imgUrl
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
}