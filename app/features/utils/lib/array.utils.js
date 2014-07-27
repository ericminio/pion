module.exports = {
	forEach: function(collection, callback) {
		for(var i=0; i<collection.length; i++) {
			callback(collection[i], i);
		}
	},
	
	first: function(collection, callback) {
		var found;
		this.forEach(collection, function(item) {
			if (callback(item)) found = item;
		});
		return found;
	},
	
	hasOneItemIn: function(collection, callback) {
		return this.first(collection, callback) === undefined ? false : true;
	},
	
	firstItemIn: function(collection, matcher) {
		return this.first(collection, matcher);
	},
	
	remove: function(item, collection) {
        var index = collection.indexOf(item);
        if (index != -1) {
            collection = collection.slice(0, index).concat(collection.slice(index+1));
        }
		return collection;
	}
};