var fs = require('fs');
var array = require('../../utils/lib/array.utils');

var containsLine = function(line, duplications) {
	return array.first(duplications, function(duplication) {
		return duplication.line == line;
	});
};

var containsIndex = function(index, duplication) {
	return array.first(duplication.occurences, function(occurence) {
		return occurence.lineIndex == index;		
	});
};

var duplications = function(leftFile, rightFile, fileProvider) {
	var duplications = [];
	var leftLines = fileProvider.contentOf(leftFile).split('\n');
	var rightLines = fileProvider.contentOf(rightFile).split('\n');		

	array.forEach(leftLines, function(leftLine, leftIndex) {
		array.forEach(rightLines, function(rightLine, rightIndex) {
			if (leftLine == rightLine && leftIndex !== rightIndex) {
				var duplication = containsLine(leftLine, duplications);
				if (! duplication) {
					duplications.push({
						line: leftLine,
						occurences: [
							{ file:leftFile, lineIndex: leftIndex },
							{ file:rightFile, lineIndex: rightIndex}
						]
					});
				} else {
					if (!containsIndex(rightIndex, duplication)) {
						duplication.occurences.push({ file:rightFile, lineIndex: rightIndex});
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


