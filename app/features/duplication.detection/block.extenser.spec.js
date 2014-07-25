var theContent = require('./lib/block.detector');
var havingInFolder = require('../utils/lib/having.in.folder');

describe('Block detector:', function() {

	it('can detect that a file has only one empty line between two indexes', function() {
		var content = 'one\n' +
					  'two\n' +
					  '\n' +
					  'four';
		
		expect(theContent(content).hasOnlyEmptyLinesBetweenIndexes(2, 4)).toEqual(true);
	})
});