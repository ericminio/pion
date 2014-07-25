var array = require('../../utils/lib/array.utils');
var occurence = require('./occurence');
var line = require('./line');
var linesDuplications = require('./pion.lines');
var theContent = require('./block.detector');

module.exports = {
	
	inFiles: function(fileProvider) {
		var duplicatedLines = linesDuplications.inFiles(fileProvider);
		var duplicatedBlocks = [];
		
		array.forEach(duplicatedLines, function(left) {
			array.forEach(duplicatedLines, function(right) {
				if (left != right) {
					
					var candidates = [];
					array.forEach(left.occurences, function(leftOccurence, leftIndex) {
						var rightOccurence = right.occurences[leftIndex];
						var condition = rightOccurence !== undefined &&
						                leftOccurence.file == rightOccurence.file &&
										(leftOccurence.lineIndex == rightOccurence.lineIndex-1 ||
										 theContent(fileProvider.contentOf(leftOccurence.file)).hasOnlyEmptyLinesBetweenIndexes(leftOccurence.lineIndex, rightOccurence.lineIndex)
										);
						
						if (condition) {
							candidates.push(leftOccurence);
						}
					});
					if (candidates.length > 1) {
						duplicatedBlocks.push({
							lines: left.lines.concat(right.lines),
							occurences: candidates
						})
					}
				}
			});
		});
		
		return duplicatedBlocks;
	}
};


