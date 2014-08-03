module.exports = function(filename) {
	return {
		withContent: function(content) {
			return {
				files: function(callback) { callback([filename]); },
				contentOf: function(filename) { return content; }
			};
		}
	};
};