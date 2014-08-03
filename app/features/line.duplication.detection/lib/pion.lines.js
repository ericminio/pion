var array = require('../../utils/lib/array.utils');
var occurence = require('./occurence');
var line = require('./line');
var isString = require('../../utils/lib/string.utils');
var lineShouldBeIgnored = require('./line.should.be.ignored');
var nopLogger = require('../../utils/lib/nop.logger');

var candidateFound = function (leftFile, leftLine, leftIndex, rightFile, rightLine, rightIndex) {
	return !isString.empty(leftLine) && !isString.blanck(leftLine) &&
		   !isString.empty(rightLine) && !isString.blanck(rightLine) &&
	 	leftLine.trim() == rightLine.trim() && 
		(leftIndex !== rightIndex || leftFile !== rightFile);
};

var duplicationsInFiles = function(leftFile, rightFile, fileProvider, duplications, patterns) {
	var leftLines = fileProvider.contentOf(leftFile).split('\n');
	var rightLines = fileProvider.contentOf(rightFile).split('\n');		

	array.forEach(leftLines, function(leftLine, leftIndex) {
		
		if (lineShouldBeIgnored(leftLine, patterns)) { return; }
		
		array.forEach(rightLines, function(rightLine, rightIndex) {
			
			if (lineShouldBeIgnored(rightLine, patterns)) { return; }

			if (candidateFound(leftFile, leftLine, leftIndex, rightFile, rightLine, rightIndex)) {
				
				var existingDuplication = line(leftLine).in(duplications);
				
				if (! existingDuplication) {
					duplications.push({
						line: leftLine,
						occurences: [
							{ file:leftFile, lineIndex: leftIndex },
							{ file:rightFile, lineIndex: rightIndex}
						]
					});
				} 
				
				if (existingDuplication) {
					
					var existingOccurence = occurence(rightFile, rightIndex).in(existingDuplication);
					
					if (! existingOccurence) {
						existingDuplication.occurences.push({ file:rightFile, lineIndex: rightIndex});
					}
				}
			}
		});
	});

	return duplications;
};

module.exports = {
	
	logger: nopLogger,
	
	ignoring: function(patterns) {
		this.patterns = patterns;
		return this;
	},
	
	inFiles: function(fileProvider, callback) {
		var self = this;
		
		fileProvider.files(function(filenames) {
			self.logger.start(filenames.length);
		
			var filecount = filenames.length;
			var duplications = [];
			for (var leftIndex = 0; leftIndex < filecount; leftIndex++) {
				var leftFile = filenames[leftIndex];
			
				for (var rightIndex = 0; rightIndex < filecount; rightIndex++) {				
					var rightFile = filenames[rightIndex];
					duplicationsInFiles(leftFile, rightFile, fileProvider, duplications, self.patterns);

					self.logger.progress(leftFile, rightFile, leftIndex, rightIndex, duplications);
				}
			}
		
			self.logger.end();
			callback(duplications);
		});
	}
};


