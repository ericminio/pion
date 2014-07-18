var fs = require('fs');
var array = require('./array.utils');

module.exports = {
	
	folder: function(folder) {
		if (!fs.existsSync(folder)) fs.mkdirSync(folder);
		var files = fs.readdirSync(folder);
		array.forEach(files, function(file) {
			fs.unlinkSync(folder + '/' + file);
		});		
	},
};