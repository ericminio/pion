var fs = require('fs');

module.exports = function(folder) {
	
	return {
		theFileWithName: function(filename) {
			this.filename = filename;
			return this;
		},
		withContent: function(content) {
			fs.writeFileSync(folder + '/' + this.filename, content);
		}
	};
};