function refreshOneGene(oneGene){
	angular.element('[ng-controller=ComparisonGraph]').scope().selectedToCompare = oneGene;
	angular.element('[ng-controller=ComparisonGraph]').scope().reload();
}
function refreshSpecies(species){
	angular.element('[ng-controller=DictyTable]').scope().selectedSpecies = species;
	angular.element('[ng-controller=DictyTable]').scope().reload();
	angular.element('[ng-controller=ProfileGraph]').scope().specie = species;
	angular.element('[ng-controller=ProfileGraph]').scope().reload();
}
function refreshGenes(genes){
	if(genes){
		genes = genes.split(" ").filter(function(e){return e;});
		angular.element('[ng-controller=ProfileGraph]').scope().selectedDDBs = genes;
		angular.element('[ng-controller=ProfileGraph]').scope().reload();
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