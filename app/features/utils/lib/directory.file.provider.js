var fs = require('fs');
var array = require('./array.utils');

var filesInFolder = function(folder) {
	
	return {
		files: function(callback) {
			var filenames = [];

			var files = fs.readdirSync(folder);
			array.forEach(files, function(file) {
				var stats = fs.statSync(folder + '/' + file);
				
				if (stats.isFile()) {
					filenames.push(folder + file);
				}
				if (stats.isDirectory()) {
					filesInFolder(folder + file + '/').files(function(array) {
						filenames = filenames.concat(array);
					});
				}
			});
			
			callback(filenames);
		},
		contentOf: function(filename) {
			return fs.readFileSync(filename).toString();
		},
	};
};

module.exports = filesInFolder;