var isString = require('../../utils/lib/string.utils');

var thereAreOnlyEmptyLinesBetweenGivenIndexes = function(lines, beginIndex, endIndex) {
    
    for (var i = beginIndex+1; i < endIndex; i++) {
        if (!isString.empty(lines[i]) && !isString.blanck(lines[i])) {
            return false;
        }
    }
    
    return true;
}

module.exports = function(collection, fileContent) {
    
    var lines = fileContent === undefined ? [] : fileContent.split('\n');
    
	var filtered = [collection[0]];
	
	var index = 1;
	while (
            index < collection.length && 
            (
                collection[index].lineIndex === (filtered[index-1].lineIndex+1) ||
                
                fileContent !== undefined &&
                thereAreOnlyEmptyLinesBetweenGivenIndexes(lines, filtered[index-1].lineIndex, collection[index].lineIndex)
            )
          ) 
    {
		filtered.push(collection[index]);
		index ++;
	}
	
	return filtered;
};