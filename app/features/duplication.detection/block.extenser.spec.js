var theContent = require('./lib/block.detector');
var havingInFolder = require('../utils/lib/having.in.folder');

describe('Block detector', function() {

	var one = 'one\n', two = 'two\n', three = 'three\n', four = 'four\n';
	
	it('can notice that two lines are only separated by one empty line', function() {
		var content = one + two + '\n' + four;
		
		expect(theContent(content).hasOnlyEmptyLinesBetweenIndexes(1, 3)).toEqual(true);
	});
	
	it('does not consider two following lines', function() {
		var content = one + two + three;
		
		expect(theContent(content).hasOnlyEmptyLinesBetweenIndexes(1, 2)).toEqual(false);
	});
	
	it('can notice that two lines are only separated empty lines', function() {
		var content = one + two + '\n\n\n' + four;
		
		expect(theContent(content).hasOnlyEmptyLinesBetweenIndexes(1, 5)).toEqual(true);
	});	
});