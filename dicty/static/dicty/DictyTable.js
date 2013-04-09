function DictyTable($scope) {
	$scope.experiment = [
	{
		"species": "D. discoideum",
		"strain": "AX4",
		"growth": "KA"
	},
	{
		"species": "D. purpureum",
		"strain": "dp1AX1",
		"growth": "KA"
	}
	];
	$scope.sortBy = 'strain';
	$scope.reverseSort = false;
	
	$scope.setSortBy = function(hdr, event){
		$scope.sortBy=hdr;
		$scope.reverseSort=!$scope.reverseSort;
		$('th[ng-class="sortHeader"]').removeAttr("sort");
		event.currentTarget.setAttribute("sort",$scope.reverseSort?"up":"down");
	}
	$scope.getSortBy = function(){
		return $scope.sortBy;
	}
	$scope.getReverseSort = function(){
		return $scope.reverseSort;
	}
	$scope.selectRow = function(experimentRow, event){
		$scope.selectedSpecies=experimentRow.species;
		$('.expRow').removeAttr("selected");
		event.currentTarget.setAttribute("selected","true"); //need to make this better
	}
	
	$scope.selectedSpecies=$scope.experiment[0].species;

}


function GeneSelector($scope) {
	$scope.allGenes = {
		"rab32C": {
			"name": "rab32C",
			"id": "DDB_G0275675",
			"jgi_id": 91127
		},
		"DDB_G0275849": {
			"name": "DDB_G0275849",
			"id": "DDB_G0275849",
			"jgi_id": 91130
		},
		"mobA": {
			"name": "mobA",
			"id": "DDB_G0278907",
			"jgi_id": 91135
		},
		"fray1": {
			"name": "fray1",
			"id": "DDB_G0278863",
			"jgi_id": 91138
		},
		"DDB_G0279247": {
			"name": "DDB_G0279247",
			"id": "DDB_G0279247",
			"jgi_id": 91142
		},
		"mrrA": {
			"name": "mrrA",
			"id": "DDB_G0271908",
			"jgi_id": 91918
		},
		"padA": {
			"name": "padA",
			"id": "DDB_G0286385",
			"jgi_id": 91927
		},
		"DDB_G0287001": {
			"name": "DDB_G0287001",
			"id": "DDB_G0287001",
			"jgi_id": 91930
		},
		"DDB_G0287073": {
			"name": "DDB_G0287073",
			"id": "DDB_G0287073",
			"jgi_id": 91932
		},
		"DDB_G0276545": {
			"name": "DDB_G0276545",
			"id": "DDB_G0276545",
			"jgi_id": 91936
		},
		"rab8A": {
			"name": "rab8A",
			"id": "DDB_G0280043",
			"jgi_id": 91938
		},
		"osbH": {
			"name": "osbH",
			"id": "DDB_G0283709",
			"jgi_id": 91950
		},
		"ndkC-1": {
			"name": "ndkC-1",
			"id": "DDB_G0273069",
			"jgi_id": 97095
		},
		"rpl21": {
			"name": "rpl21",
			"id": "DDB_G0279387",
			"jgi_id": 93065
		},
		"eif5a": {
			"name": "eif5a",
			"id": "DDB_G0284861",
			"jgi_id": 91781
		},
		"rps28": {
			"name": "rps28",
			"id": "DDB_G0285597",
			"jgi_id": 47614
		},
		"rps7": {
			"name": "rps7",
			"id": "DDB_G0289025",
			"jgi_id": 92493
		}
	}
	
	$scope.selectGene = function(gene, event){
		var str=$('#geneTextInput').val();
		str = str.replace(new RegExp(gene.name+" ","g"), ""); //remove if same exists and add it to end
		str = str.substring(0, str.lastIndexOf(" "));
		
		$('#geneTextInput').val($.trim(str + " " + gene.name) + " ");
	}
	
	$scope.allGenesFiltered = function(geneinput){
		if(geneinput == undefined) return $scope.allGenes;
		var ret=[];
		for(i in $scope.allGenes){
			var name = $scope.allGenes[i]["name"];
			var lastStr=geneinput.substring(geneinput.lastIndexOf(" ")+1);
			
			var b = name.lastIndexOf(lastStr, 0) === 0 //startsWith()
			if(b) ret.push($scope.allGenes[i]); 
		}
		return ret;
	}
	
}



