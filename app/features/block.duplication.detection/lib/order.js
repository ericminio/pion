module.exports = function(collection) {

	return {
		byLineIndex: function() {
			collection.sort(function(a, b) {
				if (a.lineIndex < b.lineIndex) { return -1; }
				if (b.lineIndex < a.lineIndex) { return +1; }
			});
		}
	};
};