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
	//load
	setTimeout(innerHashChange, 100);
}
function innerHashChange(){
	var species = hashVars["species"];
	if(species) refreshSpecies(species.replace(/\+/g, " "), true);
	var oneGene = hashVars["oneGene"];
	if(oneGene) refreshOneGene(oneGene, true);
	var genes = hashVars["genes"];
	if(genes){
		var gn = genes.replace(/\+/g, " ");
		$('#geneTextInput').val(gn);
		refreshGenes(gn, true);
	}
}
timedAdd = null;
hashVars = {};
function hashAdd(key,val){
	hashVars[key]=val;
	if(timedAdd) clearTimeout(timedAdd); //limit history, max 1 entry per half second
	timedAdd = setTimeout(hashSubAdd, 500);
}
function hashSubAdd(){
	var str = [];
	for(var p in hashVars) str.push(p+'='+hashVars[p]);
	 window.location.hash = str.join("&");
	 timedAdd = null;
}

$(function() {
	if(window.addEventListener) {
		window.addEventListener("hashchange", hashChange, false);
	} else if (window.attachEvent) {
		window.attachEvent("onhashchange", hashChange); 
	}
	hashChange();
});

function refreshOneGene(oneGene, dontHash){
	if(!dontHash) hashAdd("oneGene",oneGene);
	angular.element('[ng-controller=ComparisonGraph]').scope().selectedToCompare = oneGene;
	angular.element('[ng-controller=ComparisonGraph]').scope().reload();
}
function refreshSpecies(species, dontHash){
	if(!dontHash) hashAdd("species",species);
	angular.element('[ng-controller=DictyTable]').scope().selectedSpecies = species;
	angular.element('[ng-controller=DictyTable]').scope().reload();
	angular.element('[ng-controller=ProfileGraph]').scope().specie = species;
	angular.element('[ng-controller=ProfileGraph]').scope().reload();
}
function refreshGenes(genes, dontHash){
	if(!dontHash) hashAdd("genes",genes);
	if(genes){
		genes = genes.split(" ").filter(function(e){return e;}); //clear emptys
		angular.element('[ng-controller=ProfileGraph]').scope().selectedDDBs = genes;
		angular.element('[ng-controller=ProfileGraph]').scope().reload();
		angular.element('[ng-controller=WingGraph]').scope().selectedDDBs = genes;
		angular.element('[ng-controller=WingGraph]').scope().reload();
	}
}
function globalRefresh(){
	var oneGene = angular.element('[ng-controller=ProfileGraph]').scope().selectedGene;
	var species = angular.element('[ng-controller=DictyTable]').scope().selectedSpecies;
	var genes = angular.element('[ng-controller=GeneSelector]').scope().selectedGenes;
	refreshSpecies(species);
	refreshGenes(genes);
	refreshOneGene(oneGene);
}