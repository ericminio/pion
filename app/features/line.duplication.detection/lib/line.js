var array = require('../../utils/lib/array.utils');

var withLine = function(line) {
	return function(duplication) { 
		return line.trim() == duplication.line.trim(); 
	};
};

module.exports = function(line) {
	
	return {
		in: function(duplications) {
			return array.firstItemIn(duplications, withLine(line));
		}
	};
};

