var array = require('../../utils/lib/array.utils');

var withLine = function(line) {
	return function(duplication) { 
		return array.hasOneItemIn(duplication.lines, function(item) { 
			return item.trim() == line.trim(); 
		}); 
	};
};

module.exports = function(line) {
	
	return {
		in: function(duplications) {
			return array.firstItemIn(duplications, withLine(line));
		}
	};
};

