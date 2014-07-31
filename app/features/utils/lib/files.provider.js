module.exports = function(filenames) {
	return {
		withContents: function(contents) {
			return {
				files: function() { return filenames; },
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
			for (var i = 0; i < contentsInLine[0].length ; i++) {
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