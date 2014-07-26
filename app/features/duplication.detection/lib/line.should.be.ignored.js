module.exports = function(line, patterns) {
	if (patterns == undefined) { return false; }
	if (!Array.isArray(patterns)) { return false; }
	
	var ignore = false;
	for (var i=0 ;i<patterns.length; i++) {
		var pattern = patterns[i];
		if (pattern.test !== undefined && pattern.test(line.trim()) || line.trim() == pattern) {
			ignore = true;
			break;
		}
	}
	return ignore;
};