var array = require('../../utils/lib/array.utils');

var withIndexInFile = function(filename, index) {
	return function(occurence) { 
		return occurence.file == filename && occurence.lineIndex == index; 
	};
};

module.exports = function(filename, index) {

	return {
		in: function(duplication) {
			return array.firstItemIn(duplication.occurences, withIndexInFile(filename, index));
		}
	};
};

