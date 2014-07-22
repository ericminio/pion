var clean = require('../utils/lib/clean');
var havingInFolder = require('../utils/lib/having.in.folder');
var duplications = require('./lib/pion.lines');
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
			lines: ['first duplication'],
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
			lines: ['first duplication'],
			occurences: [
				{ file: folder+onefile, lineIndex: 1 },
				{ file: folder+onefile, lineIndex: 2 },
				{ file: folder+onefile, lineIndex: 3 }
			]
		}]);
	});

	var secondfile = 'second-file';
	
	it('can detect one line duplicated two times in two files', function() {
		var content = 'first duplication';
		havingInFolder(folder).theFileWithName(onefile).withContent(content);
		havingInFolder(folder).theFileWithName(secondfile).withContent(content);
		
		expect(duplications.inFiles(inFolder(folder))).toEqual([{
			lines: ['first duplication'],
			occurences: [
				{ file: folder+onefile, lineIndex: 0 },
				{ file: folder+secondfile, lineIndex: 0 }
			]
		}]);
	});
	
	var thirdfile = 'third-file';

	it('can detect one line duplicated three times in three files', function() {
		var content = 'first duplication';
		havingInFolder(folder).theFileWithName(onefile).withContent(content);
		havingInFolder(folder).theFileWithName(secondfile).withContent(content);
		havingInFolder(folder).theFileWithName(thirdfile).withContent(content);
		
		expect(duplications.inFiles(inFolder(folder))).toEqual([{
			lines: ['first duplication'],
			occurences: [
				{ file: folder+onefile, lineIndex: 0 },
				{ file: folder+secondfile, lineIndex: 0 },
				{ file: folder+thirdfile, lineIndex: 0 }
			]
		}]);
	});
	
	it('can detect several duplications in several files', function() {
		havingInFolder(folder).theFileWithName(onefile).withContent('first item\nsecond item\nfirst item');
		havingInFolder(folder).theFileWithName(secondfile).withContent('second item\nthird item\nthird item');
		havingInFolder(folder).theFileWithName(thirdfile).withContent('third item\nsecond item\nthird item\nfourth item\nfourth item');

		expect(duplications.inFiles(inFolder(folder))).toEqual([
			{
				lines: ['first item'],
				occurences: [
					{ file: folder+onefile, lineIndex: 0 },
					{ file: folder+onefile, lineIndex: 2 }
				]
			},
			{
				lines: ['second item'],
				occurences: [
					{ file: folder+onefile, lineIndex: 1 },
					{ file: folder+secondfile, lineIndex: 0 },
					{ file: folder+thirdfile, lineIndex: 1 }
				]
			},
			{
				lines: ['third item'],
				occurences: [
					{ file: folder+secondfile, lineIndex: 1 },
					{ file: folder+secondfile, lineIndex: 2 },
					{ file: folder+thirdfile, lineIndex: 0 },
					{ file: folder+thirdfile, lineIndex: 2 }
				]
			},
			{
				lines: ['fourth item'],
				occurences: [
					{ file: folder+thirdfile, lineIndex: 3 },
					{ file: folder+thirdfile, lineIndex: 4 }
				]
			},
		]);
	});
});