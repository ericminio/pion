module.exports = function(collection) {

	var filtered = [collection[0]];
	
	var index = 1;
	while (index < collection.length && collection[index].lineIndex === (filtered[index-1].lineIndex+1)) {
		filtered.push(collection[index]);
		index ++;
	}
	
	return filtered;
};