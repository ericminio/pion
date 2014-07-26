module.exports = function(line, pattern) {
	return 	pattern !== undefined &&
			line.trim() == pattern;
};