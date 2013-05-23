function DictyTable($scope, $http, $rootScope) {
	if(!$rootScope.experiment) $rootScope.experiment = [{}];
	if(!$rootScope.selectedSpecies) $rootScope.selectedSpecies = null;
	$http.get('api/experiment').success(function(data) {
		$rootScope.experiment = data;
		if(! $rootScope.selectedSpecies)
			$rootScope.selectedSpecies=$rootScope.experiment[0].species;
		setTimeout($scope.reload,100);
	});
	
	$scope.sortBy = 'strain';
	$scope.reverseSort = false;
	
	$rootScope.$watch("selectedSpecies", function() {
		$scope.reload();
    });
	
	$scope.sortHeaders = ["species","strain","growth"];
	
	$scope.setSortBy = function(hdr, event){
		$scope.sortBy=hdr;
		$scope.reverseSort=!$scope.reverseSort;
		$('th[ng-class="sortHeader"]').removeAttr("sort");
		event.currentTarget.setAttribute("sort",$scope.reverseSort?"up":"down");
	};
	$scope.getSortBy = function(){
		return $scope.sortBy;
	};
	$scope.getReverseSort = function(){
		return $scope.reverseSort;
	};
	$scope.reload = function(){
		$('.expRow').removeAttr("selectedRow");
		$('.specie'+$scope.escapeString($rootScope.selectedSpecies)).attr("selectedRow", "true");
	};
	$scope.selectRow = function(experimentRow, event){
		$rootScope.selectedSpecies = experimentRow.species;
	};
	$scope.escapeString = function(str){
		if(str) return str.replace(/([ #;?%&,.+*~\':"!^$[\]()=>|\/@])/g,'X');
		else return str;
	};
}


function GeneSelector($scope, $http, $rootScope) {
	$scope.allGenes = {"":""};
	if($rootScope.selectedDDBs) $('#geneTextInput').val($rootScope.selectedDDBs.join(" ")+" ");
	$http.get('api/allGenes').success(function(data) {
		$scope.allGenes = data;
	});
	
	$scope.sortHeaders = ["name","ddb","jgi_id"];
	
	$scope.selectGene = function(gene, event){
		var str=$('#geneTextInput').val();
		str = str.replace(new RegExp(gene.name+" ","g"), ""); //remove if same exists and add it to end
		str = str.substring(0, str.lastIndexOf(" "));
		var inputString = $.trim(str + " " + gene.name) + " ";
		$('#geneTextInput').val(inputString);
		$rootScope.selectedDDBs = inputString.split(" ").filter(function(e){return e;}); //clear emptys
	};
	
	$scope.allGenesFiltered = function(geneinput){
		var ret=[];
		var cnt = 0;
		for(i in $scope.allGenes){
			var name = $scope.allGenes[i]["name"];
			var b = true;
			if(geneinput){
				var lastStr=geneinput.substring(geneinput.lastIndexOf(" ")+1);
				b = name.lastIndexOf(lastStr, 0) == 0; //startsWith()
			}
			if(b){
				ret.push($scope.allGenes[i]); 
				cnt++;
			}
			if(cnt>20) break;
		}
		return ret;
	};
}
