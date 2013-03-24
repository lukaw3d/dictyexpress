
loadData("data.txt");

function loadData(urlString){
	var ajax = new XMLHttpRequest();
	ajax.open("GET",urlString,true);
	ajax.onreadystatechange=function(){
		if (ajax.readyState==4){
			parseData(ajax.responseText);
		}
	}
	ajax.send();
}

function parseData(string){
	var lines = string.split("\r\n");
	var titleLine = lines[0];
	var headersLine = lines[1];
	var headers = headersLine.split("\t");
	var dataLines=[];
	var mapIds = []; //+"L" for lines, +"T" for tags
	lines.splice(0,2);
	for(var i=0; i<lines.length; i++){
		var line = lines[i].split("\t");
		dataLines[i]=line;
		mapIds[line[0]+"L"]=i;
	}
	for(var i=0; i<headers.length; i++){
		mapIds[headers[i]+"T"]=i;
	}
	showGraph(titleLine,headers,dataLines,mapIds);
}

function getLineById0(lines,id0,mapIds){
	return lines[mapIds[id0+"L"]];
}

function getColumnByTag(line,tag,mapIds){
	return line[mapIds[tag+"T"]];
}

function showGraph(titleLine,headers,dataLines,mapIds){
	var drawingIds=["12","13","14","15"];
	var c=document.getElementById("canvas1");
	try {ctx = c.getContext("2d");}catch(e){}
	var xzoom = 20;
	var yzoom = -300;
	var xoff = 5;
	var yoff = 300;
	var maxX = 36;
	var fontSize = -0.06;
	if (ctx){
		ctx.font=(fontSize*yzoom)+'px Sans-Serif';
		ctx.beginPath();
		ctx.strokeStyle = ctx.fillStyle = '#aaa';
		
		ctx.moveTo(0*xzoom+xoff, 0*yzoom+yoff);
		ctx.lineTo(maxX*xzoom+xoff, 0*yzoom+yoff);
		
		ctx.moveTo(0*xzoom+xoff, 0.7*yzoom+yoff);
		ctx.lineTo(0*xzoom+xoff, -0.7*yzoom+yoff);
		
		ctx.stroke();
		for(var j=0;j<=maxX;j+=2){
			ctx.moveTo(j*xzoom+xoff, -fontSize/2*yzoom+yoff);
			ctx.lineTo(j*xzoom+xoff, fontSize/2*yzoom+yoff);
			ctx.stroke();
			ctx.textAlign = "center";
			ctx.fillText(j+"", j*xzoom+xoff, 1.5*fontSize*yzoom+yoff);
		}
		
		
		for(var i=0;i<drawingIds.length;i++){
			var line = getLineById0(dataLines,drawingIds[i],mapIds);
			var prev = 0;
			ctx.beginPath();
			ctx.moveTo(0*xzoom+xoff, getColumnByTag(line,0,mapIds)*yzoom+yoff); //starting point, for loop also lines to starting point
			ctx.fillStyle = ctx.strokeStyle = 'rgb('+Math.floor(Math.random()*150)+','+Math.floor(Math.random()*150)+','+Math.floor(Math.random()*150)+')';
			for(var j=0;j<=maxX;j+=2){
				var got=getColumnByTag(line,j,mapIds);
				if(!got || got=='?'){
					got = prev;
					ctx.fillText("?", j*xzoom+xoff, got*yzoom+yoff);
				}
				ctx.lineTo(j*xzoom+xoff, got*yzoom+yoff);
				prev = got;
			}
			ctx.stroke();
		}
	}
}


