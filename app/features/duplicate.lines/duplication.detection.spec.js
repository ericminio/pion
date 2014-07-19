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
	
	it('can detect one line duplicated two times in one file', function() {
		var content = 'first line\nfirst duplication\nfirst duplication';
		havingInFolder(folder).theFileWithName(onefile).withContent(content);
		
		expect(duplications.inFiles(inFolder(folder))).toEqual([{
			line: 'first duplication',
			occurences: [
				{ file: folder+onefile, lineIndex: 1 },
				{ file: folder+onefile, lineIndex: 2 }
			]
		}]);
	});

	it('can detect one line duplicated three times in one file', function() {
		var content = 'first line\nfirst duplication\nfirst duplication\nfirst duplication';
		havingInFolder(folder).theFileWithName(onefile).withContent(content);
		
		expect(duplications.inFiles(inFolder(folder))).toEqual([{
			line: 'first duplication',
			occurences: [
				{ file: folder+onefile, lineIndex: 1 },
				{ file: folder+onefile, lineIndex: 2 },
				{ file: folder+onefile, lineIndex: 3 }
			]
		}]);
	});
});