var fs = require('fs');
var isString = require('../../utils/lib/string.utils');

module.exports = function(content) {
	
	return {
		hasOnlyEmptyLinesBetweenIndexes: function(start, end) {
			if (end - start < 2) { return false; }
			
			var lines = content.split('\n');
			var onlyEmptyLines = true;
			for (var index = start+1; index < end; index++) {
				var line = lines[index];
				if (!isString.empty(line) || !isString.blanck(line)) {
					onlyEmptyLines = false;
					break;
				}
			}
			return onlyEmptyLines;
		}
	};
};