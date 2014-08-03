var array = require('../../utils/lib/array.utils');

module.exports = function(duplications) {
	return {
		inFile: function(file) {
			var selected = [];
			array.forEach(duplications, function(duplication) {
				array.forEach(duplication.occurences, function(occurence) {
					if (occurence.file === file) {
						selected.push({ line: duplication.line, lineIndex: occurence.lineIndex });
					}
				});
			});
			return selected;
		}
	};
};