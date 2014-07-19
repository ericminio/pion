var fs = require('fs');
var array = require('../../utils/lib/array.utils');

var contain = function(line, duplications) {
	var found = false;
	array.forEach(duplications, function(duplication) {
		if (duplication.line == line) {
			found = true;
			return;
		}
	});
	return found;
};

var duplications = function(leftFile, rightFile, fileProvider) {
	var duplications = [];
	var leftLines = fileProvider.contentOf(leftFile).split('\n');
	var rightLines = fileProvider.contentOf(rightFile).split('\n');		
	array.forEach(leftLines, function(leftLine, leftIndex) {
		array.forEach(rightLines, function(rightLine, rightIndex) {
			if (leftLine == rightLine && leftIndex !== rightIndex && ! contain(leftLine, duplications) ) {
				duplications.push({
					line: leftLine,
					occurences: [
						{ file:leftFile, lineIndex: leftIndex },
						{ file:rightFile, lineIndex: rightIndex}
					]
				});
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


