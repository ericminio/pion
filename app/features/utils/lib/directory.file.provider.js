var fs = require('fs');
var array = require('./array.utils');

var filesInFolder = function(folder) {
	
	return {
		files: function() {
			var filenames = [];

			var files = fs.readdirSync(folder);
			array.forEach(files, function(file) {
				var stats = fs.statSync(folder + '/' + file);
				
				if (stats.isFile()) {
					filenames.push(folder + file);
				}
				if (stats.isDirectory()) {
					filenames = filenames.concat(filesInFolder(folder + file + '/').files());
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