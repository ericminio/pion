var array = require('../../utils/lib/array.utils');
var occurence = require('./occurence');
var line = require('./line');
var linesDuplications = require('./pion.lines');
var theContent = require('./block.detector');

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
			
			if (candidateOccurence.lineIndex == duplicatedLines[1].occurences[candidateOccurenceIndex].lineIndex - 1) { 
				occurences.push(candidateOccurence); 
				
				var lineAlreadyPresent = false;
				for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
					if (lines[lineIndex] == duplicatedLines[1].lines[0]) {
						lineAlreadyPresent = true;
					}
				}
				if (! lineAlreadyPresent) {
					lines.push(duplicatedLines[1].lines[0]);
				}
			}
		}		

		if (duplicatedLines.length > 2) {
			
			for (var candidateOccurenceIndex = 0; candidateOccurenceIndex < candidate.occurences.length; candidateOccurenceIndex++) {
				var candidateOccurence = candidate.occurences[candidateOccurenceIndex];
			
				if (candidateOccurence.lineIndex == duplicatedLines[1].occurences[candidateOccurenceIndex].lineIndex - 1 &&
					candidateOccurence.lineIndex == duplicatedLines[2].occurences[candidateOccurenceIndex].lineIndex - 2) { 
					
					occurenceAlreadyPresent = false;
					for (var occurenceIndex = 0; occurenceIndex < occurences.length; occurenceIndex++) {
						if (occurences[occurenceIndex] == candidateOccurence) {
							occurenceAlreadyPresent = true;
						}
					}
					if (! occurenceAlreadyPresent) {
						occurences.push(candidateOccurence); 
					}
									
					var lineAlreadyPresent = false;
					for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
						if (lines[lineIndex] == duplicatedLines[2].lines[0]) {
							lineAlreadyPresent = true;
						}
					}
					if (! lineAlreadyPresent) {
						lines.push(duplicatedLines[2].lines[0]);
					}
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


