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
	var typeVs = hashVars["typeVs"];
	if(typeVs) refreshTypeVs(typeVs, true);
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

function otherScope(ctrl){
	return angular.element('[ng-controller='+ctrl+']').scope();
}

function refreshOneGene(oneGene, dontHash){
	if(!dontHash) hashAdd("oneGene",oneGene);
	otherScope('ComparisonGraph').selectedToCompare = oneGene;
}
function refreshSpecies(species, dontHash){
	if(!dontHash) hashAdd("species",species);
	otherScope('DictyTable').selectedSpecies = species;
	otherScope('DictyTable').reload();
	otherScope('ProfileGraph').specie = species;
	otherScope('ProfileGraph').reload();
}
function refreshGenes(genes, dontHash){
	if(!dontHash) hashAdd("genes",genes);
	if(genes){
		genes = genes.split(" ").filter(function(e){return e;}); //clear emptys
		otherScope('ProfileGraph').selectedDDBs = genes;
		otherScope('ProfileGraph').reload();
		otherScope('WingGraph').selectedDDBs = genes;
		otherScope('WingGraph').reload();
		otherScope('ComparisonGraph').possibleSelections = genes;
		otherScope('ComparisonGraph').reload();
	}
}
function refreshTypeVs(typeVs, dontHash){
	if(!dontHash) hashAdd("typeVs",typeVs);
	otherScope('WingGraph').possibleTypes = typeVs;
}
function globalRefresh(){
	var oneGene = otherScope('ProfileGraph').selectedGene;
	var species = otherScope('DictyTable').selectedSpecies;
	var genes = otherScope('GeneSelector').selectedGenes;
	refreshSpecies(species);
	refreshGenes(genes);
	refreshOneGene(oneGene);
}