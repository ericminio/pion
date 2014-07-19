var fs = require('fs');
var array = require('./array.utils');

module.exports = function(folder) {
	
	return {
		files: function() {
			var filenamesInFolder = fs.readdirSync(folder);
			var filenames = [];
			array.forEach(filenamesInFolder, function(filename) {
				filenames.push(folder + filename);
			});
			
			return filenames;
		},
		contentOf: function(filename) {
			return fs.readFileSync(filename).toString();
		},
	}
};