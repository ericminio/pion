module.exports = {
	
	empty: function(thisString) {
		return thisString.length == 0;
	},
	
	blanck: function(thisString) {
		return this.empty(thisString.trim());
	}
};