module.exports = function(collection) {
	
	return {
		withLineIndexGreaterOrEqualTo: function(index) {
			var selection = [];
			for (var i = 0; i < collection.length; i++) {
				if (collection[i].lineIndex >= index) {
					selection.push(collection[i]);
				}
			}
			return selection;
		}
	};
}