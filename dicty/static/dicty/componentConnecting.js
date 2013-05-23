function ComponentConnecting($scope, $http, $rootScope) {
	if(window.addEventListener) {
		window.addEventListener("hashchange", hashChange, false);
	} else if (window.attachEvent) {
		window.attachEvent("onhashchange", hashChange); 
	}
	hashChange();
	
	$rootScope.$watch("selectedSpecies", out);
	$rootScope.$watch("selectedDDBs", out);
	$rootScope.$watch("selectedOneGene", out);
	$rootScope.$watch("selectedType", out);
	function out(){
		if(false){
			console.log($rootScope.selectedDDBs);
			console.log($rootScope.selectedOneGene);
			console.log($rootScope.selectedSpecies);
			console.log($rootScope.selectedType);
		}
		hashVars["genes"]=$rootScope.selectedDDBs;
		hashVars["oneGene"]=$rootScope.selectedOneGene;
		hashVars["species"]=$rootScope.selectedSpecies;
		hashVars["typeVs"]=$rootScope.selectedType;
		hashRefresh();
	}
	function hashToMap(){
		hashVars = {};
		var hash = document.URL.split('#')[1];
		if(hash != undefined){
			hash = hash.split('&');
			for(var i=0; i < hash.length; i++){
				var arr = hash[i].split('=');
				hashVars[arr[0]] = decodeURIComponent(arr[1]);
			}
		}
	}

	function hashChange(){
		hashToMap();
		innerHashChange();
	}
	function innerHashChange(){
		if(false){
			console.log("from hash");
			console.log(hashVars);
		}
		if(hashVars["species"]){
			var species = hashVars["species"].replace(/\+/g, " ")
			if(species) $rootScope.selectedSpecies = species;
		}
		var oneGene = hashVars["oneGene"];
		if(oneGene) $rootScope.selectedOneGene = oneGene;
		if(hashVars["genes"]){
			var genes = hashVars["genes"].replace(/,/g, " ");
			if(genes){
				$('#geneTextInput').val(genes+" ");
				setTimeout(function(){$('#geneTextInput').val(genes+" ");}, 100);
				$rootScope.selectedDDBs = genes.split(" ").filter(function(e){return e;}); //clear emptys
			}
		}
		var typeVs = hashVars["typeVs"];
		if(typeVs) $rootScope.selectedType = typeVs;
		try{
			$rootScope.$digest();
		}catch(err){}
	}
	timedAdd = null;
	hashVars = {};
	function hashRefresh(){
		if(timedAdd) clearTimeout(timedAdd); //limit history, max 1 entry per half second
		timedAdd = setTimeout(hashSubAdd, 500);
	}
	function hashSubAdd(){
		var str = [];
		for(var p in hashVars) str.push(p+'='+hashVars[p]);
		 window.location.hash = str.join("&");
		 timedAdd = null;
	}


}