module.exports = function(rules) {
	var joined = [];
	for (var i=0; i<rules.length; i++) {
		joined = joined.concat(rules[i]);
	}
	return joined;
};