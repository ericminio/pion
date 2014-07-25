var theFile = require('./lib/block.detector');
var havingInFolder = require('../utils/lib/having.in.folder');

describe('Block detector:', function() {

	it('can detect that a file has only one empty line between two indexes', function() {
		var content = 'one\n' +
					  'two\n' +
					  '\n' +
					  'four';
		havingInFolder('test-data/').theFileWithName('block').withContent(content);
		
		expect(theFile('test-data/block').hasOnlyEmptyLinesBetweenIndexes(2, 4)).toEqual(true);
	})
});