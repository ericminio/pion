var array = require('../../utils/lib/array.utils');
var occurence = require('./occurence');
var line = require('./line');
var linesDuplications = require('./pion.lines');

var selectLines = require('./select.lines.in.file');
var order = require('./order');
var keepsOnlyLinesIn = require('./keeps.only.lines.in');
var keepsOnlyAdjacentLines = require('./keeps.only.adjacent.lines');
var containingLines = require('./containing.lines.matcher');

var blockDuplications = {
	
	ignoring: function(patterns) {
		this.patterns = patterns;
		return this;
	},
	
	inFiles: function(fileProvider, callback) {
		if (this.logger != null) {
			linesDuplications.logger = this.logger;
		}
		linesDuplications.ignoring(this.patterns).inFiles(fileProvider, function(duplicatedLines) {
			if (duplicatedLines.length < 2) { callback([]); return; }
			var duplicatedBlocks = [];					
			for(var i = 0; i < duplicatedLines.length; i++) {
			
				var candidate = duplicatedLines[i];	
				var blocks = [];	
				array.forEach(candidate.occurences, function(candidateOccurence) {
			
					var currentFile = candidateOccurence.file;
					var linesInCurrentFile = selectLines(duplicatedLines).inFile(currentFile);
					order(linesInCurrentFile).byLineIndex();
					linesInCurrentFile = keepsOnlyLinesIn(linesInCurrentFile).withLineIndexGreaterOrEqualTo(candidateOccurence.lineIndex);
					linesInCurrentFile = keepsOnlyAdjacentLines(linesInCurrentFile);
									
					if (linesInCurrentFile.length > 1) {
				
						var mergedLines = [];
						for (var index=0; index < linesInCurrentFile.length; index++) {
							mergedLines.push(linesInCurrentFile[index].line);
						}

						var block = { lines: mergedLines, occurences: candidateOccurence };		
				
						blocks.push(block);		
					}
				});
		
				if (blocks.length > 1) {
			
					var occurences = [];
					var min = 1e6;
					array.forEach(blocks, function(block) {
						if (block.lines.length < min) {
							min = block.lines.length;
						}
						occurences = occurences.concat(block.occurences);
					});
			
					var lines = [];
					for (var index=0 ; index < min; index ++) {
						lines.push(blocks[0].lines[index]);
					}
			
					if (! array.hasOneItemIn(duplicatedBlocks, containingLines(lines)) ) {
						duplicatedBlocks.push({
							lines: lines,
							occurences: occurences
						});
					}					
				}
			}
			callback(duplicatedBlocks);
		});	
	}
};


module.exports = blockDuplications;
module.exports.linesDuplications = linesDuplications;