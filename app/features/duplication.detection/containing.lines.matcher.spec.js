var array = require('../utils/lib/array.utils');
var containingLines = require('./lib/containing.lines.matcher');

describe('Containing lines matcher', function() {
	
	var collection = [
		{ lines: [ 'a', 'b', 'c' ] },
		{ lines: [ 'd', 'e', 'f' ] },
	];

	it('detect an existing sub-array', function() {		
		expect(array.hasOneItemIn(collection, containingLines(['e', 'f']))).toEqual(true);
	});
	
	it('detect that a array is not a sub-array of one block', function() {
		expect(array.hasOneItemIn(collection, containingLines(['e', 'g']))).toEqual(false);
	});
});