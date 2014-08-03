module.exports = function(done) {
	return function(duplications) {
		expect(duplications).toEqual([]);
		done();
	};
};