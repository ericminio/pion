var array = require('../../utils/lib/array.utils');
var occurence = require('./occurence');
var line = require('./line');
var linesDuplications = require('./pion.lines');
var theContent = require('./block.detector');

var addInCollectionIfNotPresent = function(collection, item) {
	itemAlreadyPresent = false;
	for (var index = 0; index < collection.length; index++) {
		if (collection[index] == item) {
			itemAlreadyPresent = true;
		}
	}
	if (! itemAlreadyPresent) {
		collection.push(item); 
	}
};

module.exports = {
	
	ignoring: function(patterns) {
		this.patterns = patterns || [];
		return this;
	},
	
	inFiles: function(fileProvider) {
		if (this.logger != null) {
			linesDuplications.logger = this.logger;
		}
		var duplicatedLines = linesDuplications.ignoring(this.patterns).inFiles(fileProvider);		
		if (duplicatedLines.length < 2) { return []; }
		
		var duplicatedBlocks = [];				
		
		var candidate = duplicatedLines[0];
		
		var lines = candidate.lines;
		var occurences = [];
		
		for (var candidateOccurenceIndex = 0; candidateOccurenceIndex < candidate.occurences.length; candidateOccurenceIndex++) {
			var candidateOccurence = candidate.occurences[candidateOccurenceIndex];
			
			var matching = candidateOccurence.lineIndex == duplicatedLines[1].occurences[candidateOccurenceIndex].lineIndex - 1;
			
			if (matching) { 
				
				addInCollectionIfNotPresent(occurences, candidateOccurence);
				addInCollectionIfNotPresent(lines, duplicatedLines[1].lines[0]);
			}
			
			if (duplicatedLines.length > 2) {

				matching = (
					candidateOccurence.lineIndex == duplicatedLines[1].occurences[candidateOccurenceIndex].lineIndex - 1 &&
					candidateOccurence.lineIndex == duplicatedLines[2].occurences[candidateOccurenceIndex].lineIndex - 2
				);
  
				if (matching) { 
					addInCollectionIfNotPresent(occurences, candidateOccurence);
					addInCollectionIfNotPresent(lines, duplicatedLines[2].lines[0]);				
				}
			}
		}		

		if (occurences.length > 1) {
			duplicatedBlocks.push({ 
				lines : lines, 
				occurences : occurences
			});
		}
		
		
		return duplicatedBlocks;
	}
};


