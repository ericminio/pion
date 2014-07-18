var array = require('../utils/lib/array.utils');
var clean = require('../utils/lib/clean');
var detectDuplicateCodeInFolder = require('./lib/detect.duplicate.code.in.folder');
var havingInFolder = require('../utils/lib/having.in.folder');

describe('Duplication detection', function() {

	var folder = 'test-data';
	
	beforeEach(function() {	
		clean.folder(folder);		
	});
	
	it('works with one line duplicated in the same file', function() {
		havingInFolder(folder).theFileWithName('one-file').withContent('hello world\nhello world');
		var duplication = detectDuplicateCodeInFolder(folder);
		
		expect(duplication).toEqual({
			line: 'hello world',
			left:  { file: 'one-file', line: 1 },
			right: { file: 'one-file', line: 2 },
		});
	});
});