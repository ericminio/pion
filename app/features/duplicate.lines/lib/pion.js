var array = require('../../utils/lib/array.utils');
var occurence = require('./occurence');
var line = require('./line');

var candidateFound = function (leftFile, leftLine, leftIndex, rightFile, rightLine, rightIndex) {
	return leftLine == rightLine && leftIndex !== rightIndex;
};

var duplications = function(leftFile, rightFile, fileProvider) {
	var duplications = [];
	var leftLines = fileProvider.contentOf(leftFile).split('\n');
	var rightLines = fileProvider.contentOf(rightFile).split('\n');		

	array.forEach(leftLines, function(leftLine, leftIndex) {
		array.forEach(rightLines, function(rightLine, rightIndex) {

			if (candidateFound(leftFile, leftLine, leftIndex, rightFile, rightLine, rightIndex)) {
				
				var existingDuplication = line(leftLine).in(duplications);
				
				if (! existingDuplication) {
					duplications.push({
						line: leftLine,
						occurences: [
							{ file:leftFile, lineIndex: leftIndex },
							{ file:rightFile, lineIndex: rightIndex}
						]
					});
				} 
				
				if (existingDuplication) {
					
					var existingOccurence = occurence(rightIndex).in(existingDuplication);
					
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
	
	inFiles: function(fileProvider) {
		var filenames = fileProvider.files();
		
		return duplications(filenames[0], filenames[0], fileProvider);
	}
};


