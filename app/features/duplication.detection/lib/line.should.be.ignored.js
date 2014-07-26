module.exports = function(line, patterns) {
	if (patterns == undefined) { return false; }
	if (!Array.isArray(patterns)) { return false; }
	
	var ignore = false;
	for (var i=0 ;i<patterns.length; i++) {
		if (line.trim() == patterns[i]) {
			ignore = true;
		}
	}
	return ignore;
};