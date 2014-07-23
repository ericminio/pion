module.exports = function(filename) {
	return {
		withContent: function(content) {
			return {
				files: function() { return [filename]; },
				contentOf: function(filename) { return content; }
			};
		}
	};
};