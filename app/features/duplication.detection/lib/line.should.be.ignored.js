module.exports = function(line, pattern) {
	return 	pattern !== undefined &&
			line.indexOf(pattern) != -1;
};