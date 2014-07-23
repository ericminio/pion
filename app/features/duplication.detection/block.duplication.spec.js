var clean = require('../utils/lib/clean');
var havingInFolder = require('../utils/lib/having.in.folder');
var blockDuplications = require('./lib/pion.blocks');
var inFolder = require('../utils/lib/directory.file.provider');

describe('Pion', function() {

	var folder = 'test-data/';
	var onefile = 'one-file';
	
	beforeEach(function() {	
		clean.folder(folder);	
	});
	
	it('can detect a duplicated block of two lines in one file', function() {
        var content = 'first item\nsecond item\n' +
                      'first item\nsecond item';
		havingInFolder(folder).theFileWithName(onefile).withContent(content);
		
		expect(blockDuplications.inFiles(inFolder(folder))).toEqual([{
			lines: ['first item', 'second item'],
			occurences: [
				{ file: folder+onefile, lineIndex: 0 },
				{ file: folder+onefile, lineIndex: 2 }
			]
		}]);
	});
	
	it('supports a block almost duplicated three times', function() {
        var content = 'first item\nsecond item\n' +
                      'first item\nsecond item\n' +
                      'first item';
		havingInFolder(folder).theFileWithName(onefile).withContent(content);
		
		expect(blockDuplications.inFiles(inFolder(folder))).toEqual([{
			lines: ['first item', 'second item'],
			occurences: [
				{ file: folder+onefile, lineIndex: 0 },
				{ file: folder+onefile, lineIndex: 2 }
			]
		}]);
		
        var content = 'first item\nsecond item\n' +
                      'first item\nsecond item\n' +
                      'second item';
		havingInFolder(folder).theFileWithName(onefile).withContent(content);
		
		expect(blockDuplications.inFiles(inFolder(folder))).toEqual([{
			lines: ['first item', 'second item'],
			occurences: [
				{ file: folder+onefile, lineIndex: 0 },
				{ file: folder+onefile, lineIndex: 2 }
			]
		}]);
	});
	
});