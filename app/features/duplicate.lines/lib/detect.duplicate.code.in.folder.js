var fs = require('fs');
var array = require('../../utils/lib/array.utils');

module.exports = function(folder) {
	
	var files = fs.readdirSync(folder);
	var filename = files[0];
	var content = fs.readFileSync(folder + '/' + filename).toString();
	
	var lineNumber = 1;
	var duplicatedLine;
	var lines = content.split('\n');
	var firstLine = lines[0];
	
	array.forEach(lines, function(line, index) {
		if (line == firstLine && index !== 0 ) {
			duplicatedLine = index + 1;
		}
	});
	
	return {
		line: firstLine,
		left:  { file: filename, line: lineNumber },
		right: { file: filename, line: duplicatedLine }
	};
}