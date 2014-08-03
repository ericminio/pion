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
		},
		
		withContentsInLine: function(contentsInLine) {
			
			var contents = [];
			for (var fileIndex = 0; fileIndex < contentsInLine[0].length ; fileIndex++) {
				contents.push('');
			}			
			for (var i = 0; i < contentsInLine.length ; i++) {
				for (var j = 0; j< contentsInLine[i].length; j++) {
					contents[j] = contents[j] + contentsInLine[i][j] + '\n';
				}
			}

			return this.withContents(contents);
		}
	};
};