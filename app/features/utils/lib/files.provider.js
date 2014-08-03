module.exports = function(filenames) {
	return {
		withContents: function(contents) {
			return {
				
				files: function(callback) { callback(filenames); },
				
				contentOf: function(filename) {
					for (var i=0; i<filenames.length; i++) {
						if (filenames[i] == filename) {
							return contents[i];
						}
					}
				}
			};
		}
	};
};