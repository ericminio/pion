var fs = require('fs');
var array = require('./array.utils');

var filesInFolder = function(folder) {
	
	return {
		files: function() {
			var filenamesInFolder = fs.readdirSync(folder);
			var filenames = [];
			array.forEach(filenamesInFolder, function(filename) {
				var stats = fs.statSync(folder + '/' + filename);
				
				if (stats.isFile()) {
					filenames.push(folder + filename);
				}
				if (stats.isDirectory()) {
					filenames = filenames.concat(filesInFolder(folder + filename + '/').files());
				}
			});
			
			return filenames;
		},
		contentOf: function(filename) {
			return fs.readFileSync(filename).toString();
		},
	}
};

module.exports = filesInFolder;