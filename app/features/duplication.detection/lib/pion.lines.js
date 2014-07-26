var array = require('../../utils/lib/array.utils');
var occurence = require('./occurence');
var line = require('./line');
var isString = require('../../utils/lib/string.utils');
var lineShouldBeIgnored = require('./line.should.be.ignored');

var candidateFound = function (leftFile, leftLine, leftIndex, rightFile, rightLine, rightIndex, pattern) {
	return !isString.empty(leftLine) && !isString.blanck(leftLine) &&
		   !isString.empty(rightLine) && !isString.blanck(rightLine) &&
	 	leftLine == rightLine && 
		(leftIndex !== rightIndex || leftFile !== rightFile);
};

var duplicationsInFiles = function(leftFile, rightFile, fileProvider, duplications, pattern) {
	var leftLines = fileProvider.contentOf(leftFile).split('\n');
	var rightLines = fileProvider.contentOf(rightFile).split('\n');		

	array.forEach(leftLines, function(leftLine, leftIndex) {
		
		if (lineShouldBeIgnored(leftLine, pattern)) { return; }
		
		array.forEach(rightLines, function(rightLine, rightIndex) {
			
			if (lineShouldBeIgnored(rightLine, pattern)) { return; }

			if (candidateFound(leftFile, leftLine, leftIndex, rightFile, rightLine, rightIndex, pattern)) {
				
				var existingDuplication = line(leftLine).in(duplications);
				
				if (! existingDuplication) {
					duplications.push({
						lines: [leftLine],
						occurences: [
							{ file:leftFile, lineIndex: leftIndex },
							{ file:rightFile, lineIndex: rightIndex}
						]
					});
				} 
				
				if (existingDuplication) {
					
					var existingOccurence = occurence(rightFile, rightIndex).in(existingDuplication);
					
					if (! existingOccurence) {
						existingDuplication.occurences.push({ file:rightFile, lineIndex: rightIndex});
					}
				}
			}
		});
	});

	return duplications;
};

module.exports = {
	
	ignoring: function(pattern) {
		this.pattern = pattern;
		return this;
	},
	
	inFiles: function(fileProvider) {
		var self = this;
		var filenames = fileProvider.files();
		
		var duplications = [];
		array.forEach(filenames, function(leftFile) {
			array.forEach(filenames, function(rightFile) {
				duplicationsInFiles(leftFile, rightFile, fileProvider, duplications, self.pattern);
			});
		});
		
		return duplications;
	}
};


