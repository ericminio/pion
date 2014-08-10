var fs = require('fs');
var array = require('./array.utils');

var filesInFolder = function(folder) {
	
	return {
        including: function(inclusions) {
            this.inclusions = inclusions;
            return this;
        },
        excluding: function(exclusions) {
            this.exclusions = exclusions;
            return this;
        },
        
        weShouldIncludeThis: function(filename) {
            if (this.inclusions === undefined) { return true; }
            
            var include = false;
            array.forEach(this.inclusions, function(inclusion) {
                include = include | inclusion.test(filename);
            })
            return include;
        },
        
        weShouldExcludedThis: function(filename) {
            if (this.exclusions === undefined) { return false; }

            var exclude = false;
            array.forEach(this.exclusions, function(exclusion) {
                exclude = exclude | exclusion.test(filename);
            })
            return exclude;
        },
        
		files: function(callback) {
            var self = this;
			var filenames = [];

			var files = fs.readdirSync(folder);
			array.forEach(files, function(file) {
				var stats = fs.statSync(folder + '/' + file);
				
				if (stats.isFile() && self.weShouldIncludeThis(file) && !self.weShouldExcludedThis(file)) {
					filenames.push(folder + file);
				}
				if (stats.isDirectory() && file !== '.git') {
					filesInFolder(folder + file + '/').including(self.inclusions).excluding(self.exclusions).files(function(array) {
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