var array = require('../../utils/lib/array.utils');

var withIndex = function(index) {
	return function(occurence) { return occurence.lineIndex == index; }
};

module.exports = function(index) {

	return {
		in: function(duplication) {
			return array.firstItemIn(duplication.occurences, withIndex(index));
		}
	};
};

