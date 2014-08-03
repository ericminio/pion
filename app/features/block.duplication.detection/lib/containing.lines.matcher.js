module.exports = function(lines) {			
	return function(item) {
		var result = true;
		var firstIndex = item.lines.indexOf(lines[0]);
		for(var i=0; i<lines.length; i++) {
			if (item.lines[firstIndex + i] !== lines[i]) {
				result = false;
			}
		}
		return result;
	};
};