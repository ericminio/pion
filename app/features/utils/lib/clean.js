var fs = require('fs');
var array = require('./array.utils');

var clean = {
	
	folder: function(folder) {
		if (!fs.existsSync(folder)) fs.mkdirSync(folder);
		var files = fs.readdirSync(folder);
		array.forEach(files, function(file) {
			
			var stats = fs.statSync(folder + '/' + file);
			
			if (stats.isFile()) {
				fs.unlinkSync(folder + '/' + file);
			}			
			if (stats.isDirectory()) {
				clean.folder(folder + '/' + file);
				fs.rmdirSync(folder + '/' + file);
			}
		});		
	},
};

module.exports = clean;