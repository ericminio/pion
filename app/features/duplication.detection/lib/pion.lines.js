var array = require('../../utils/lib/array.utils');
var occurence = require('./occurence');
var line = require('./line');
var isString = require('../../utils/lib/string.utils');
var lineShouldBeIgnored = require('./line.should.be.ignored');

var candidateFound = function (leftFile, leftLine, leftIndex, rightFile, rightLine, rightIndex) {
	return !isString.empty(leftLine) && !isString.blanck(leftLine) &&
		   !isString.empty(rightLine) && !isString.blanck(rightLine) &&
	 	leftLine == rightLine && 
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
						lines: [leftLine],
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
	
	logger: {
		start: function(filecount) {},
		progress: function(leftFile, rightFile, leftIndex, rightIndex, duplications) {},
		end: function() {},
	},
	
	ignoring: function(patterns) {
		this.patterns = patterns;
		return this;
	},
	
	inFiles: function(fileProvider) {
		var filenames = fileProvider.files();

		this.logger.start(filenames.length);
		
		var filecount = filenames.length;
		var duplications = [];
		for (var leftIndex = 0; leftIndex < filecount; leftIndex++) {
			var leftFile = filenames[leftIndex];
			
			for (var rightIndex = 0; rightIndex < filecount; rightIndex++) {				
				var rightFile = filenames[rightIndex];
				duplicationsInFiles(leftFile, rightFile, fileProvider, duplications, this.patterns);

				this.logger.progress(leftFile, rightFile, leftIndex, rightIndex, duplications);
			}
		}
		
		this.logger.end();
		
		return duplications;
	}
};


