var clean = require('../utils/lib/clean');
var havingInFolder = require('../utils/lib/having.in.folder');
var duplications = require('./lib/pion');
var inFolder = require('../utils/lib/directory.file.provider');

describe('Pion', function() {

	var folder = 'test-data/';
	
	beforeEach(function() {	
		clean.folder(folder);		
	});
	
	it('can detect one line duplicated two times in one file', function() {
		var filename = 'one-file';
		var content = 'first line\nfirst duplication\nfirst duplication';
		havingInFolder(folder).theFileWithName(filename).withContent(content);
		
		expect(duplications.inFiles(inFolder(folder))).toEqual([{
			line: 'first duplication',
			occurences: [
				{ file: folder+filename, lineIndex: 1 },
				{ file: folder+filename, lineIndex: 2 }
			]
		}]);
	});

	it('can detect one line duplicated three times in one file', function() {
		var filename = 'one-file';
		var content = 'first line\nfirst duplication\nfirst duplication\nfirst duplication';
		havingInFolder(folder).theFileWithName(filename).withContent(content);
		
		expect(duplications.inFiles(inFolder(folder))).toEqual([{
			line: 'first duplication',
			occurences: [
				{ file: folder+filename, lineIndex: 1 },
				{ file: folder+filename, lineIndex: 2 },
				{ file: folder+filename, lineIndex: 3 }
			]
		}]);
	});
});