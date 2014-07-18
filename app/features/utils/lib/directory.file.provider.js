var fs = require('fs');

module.exports = function(folder) {
	
	return {
		files: function() {
			return fs.readdirSync(folder);
		},
		contentOf: function(filename) {
			return fs.readFileSync(folder + '/' + filename).toString();
		},
	}
};