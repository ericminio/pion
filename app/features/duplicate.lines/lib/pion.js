var fs = require('fs');
var array = require('../../utils/lib/array.utils');

module.exports = {
	
	inFiles: function(fileProvider) {

		var filenames = fileProvider.files();
		var filename = filenames[0];
		var content = fileProvider.contentOf(filename);
	
		var lineNumber = 1;
		var duplicatedLine;
		var lines = content.split('\n');
		var firstLine = lines[0];
	
		array.forEach(lines, function(line, index) {
			if (line == firstLine && index !== 0 ) {
				duplicatedLine = index + 1;
			}
		});
	
		return [{
			line: firstLine,
			left:  { file: filename, line: lineNumber },
			right: { file: filename, line: duplicatedLine }
		}];
	}
};


