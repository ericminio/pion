var fs = require('fs');
var array = require('../../utils/lib/array.utils');

module.exports = {
	
	inFiles: function(fileProvider) {

		var filenames = fileProvider.files();
		
		var filename = filenames[0];
		var content = fileProvider.contentOf(filename);
		var lines = content.split('\n');
		
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

		var duplications = [];
		array.forEach(lines, function(left, leftIndex) {
			array.forEach(lines, function(right, rightIndex) {
				if (left == right && leftIndex !== rightIndex && ! contain(left, duplications) ) {
					duplications.push({
						line: left,
						occurences: [
							{ file:filename, lineIndex: leftIndex },
							{ file:filename, lineIndex: rightIndex}
						]
					});
				}
			});
		});
	
		return duplications;
	}
};


