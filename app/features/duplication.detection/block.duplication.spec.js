var clean = require('../utils/lib/clean');
var havingInFolder = require('../utils/lib/having.in.folder');
var duplications = require('./lib/pion');
var inFolder = require('../utils/lib/directory.file.provider');

describe('Pion', function() {

	var folder = 'test-data/';
	var onefile = 'one-file';
	
	beforeEach(function() {	
		clean.folder(folder);	
	});
	
	it('can detect a duplicated block in one file', function() {
		var content = 'first item\nsecond item\nfirst item\nsecond item';
		havingInFolder(folder).theFileWithName(onefile).withContent(content);
		
		expect(duplications.inFiles(inFolder(folder))).toEqual([{
			lines: ['first item', 'second item'],
			occurences: [
				{ file: folder+onefile, lineIndex: 0 },
				{ file: folder+onefile, lineIndex: 2 }
			]
		}]);
	});
	
});